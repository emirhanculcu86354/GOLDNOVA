-- =====================================================================
-- GOLDNOVA United — Supabase veritabanı kurulumu
-- Supabase panelinde: SQL Editor > New query > bu dosyanın tamamını yapıştır > Run
-- Tekrar çalıştırmak güvenlidir (var olanları bozmaz).
-- =====================================================================

-- Takım davet kodu (kayıt olmak için gerekli). Değiştirmek için en alttaki UPDATE satırını düzenle.
create table if not exists public.settings (
  id int primary key default 1 check (id = 1),
  team_code text not null default 'GOLDNOVA2024'
);
insert into public.settings (id) values (1) on conflict do nothing;

-- Oyuncu profilleri (her hesap bir oyuncu)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default 'Oyuncu',
  nick text not null default '',
  num text not null default '',
  pos text not null default 'OS' check (pos in ('KL', 'DEF', 'OS', 'FV')),
  foot text not null default 'Sağ',
  photo text not null default '',
  stats jsonb not null default '{"hiz":65,"sut":65,"pas":65,"dri":65,"def":65,"fiz":65}',
  role text not null default 'member' check (role in ('admin', 'member')),
  notify_email boolean not null default true,
  notify_push boolean not null default true,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time text not null default '21:00',
  saha text not null default 'Halısaha',
  adres text not null default '',
  opp text not null default '',
  format int not null default 7,
  ucret numeric not null default 0,
  note text not null default '',
  kayit boolean not null default false,
  lineup jsonb,
  result jsonb,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  notified_new boolean not null default false,
  notified_result boolean not null default false,
  reminded boolean not null default false
);

create table if not exists public.rsvps (
  match_id uuid not null references public.matches (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null check (status in ('gel', 'belki', 'yok')),
  paid boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (match_id, user_id)
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  url text not null,
  path text,
  caption text not null default '',
  tag text not null default 'gol',
  scorer uuid references public.profiles (id) on delete set null,
  notified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.likes (
  video_id uuid not null references public.videos (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  primary key (video_id, user_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  video_id uuid not null references public.videos (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  text text not null check (char_length(text) between 1 and 400),
  created_at timestamptz not null default now()
);

create table if not exists public.push_subs (
  endpoint text primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  sub jsonb not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Yardımcı fonksiyonlar ve tetikleyiciler
-- ---------------------------------------------------------------------
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Kayıt: davet kodunu kontrol et, profili oluştur. İlk kayıt olan yönetici olur.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare code text; is_first boolean;
begin
  select team_code into code from public.settings where id = 1;
  if upper(trim(coalesce(new.raw_user_meta_data ->> 'code', ''))) <> upper(trim(code)) then
    raise exception 'TEAM_CODE_INVALID';
  end if;
  select not exists (select 1 from public.profiles) into is_first;
  insert into public.profiles (id, name, email, role)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'name'), ''), 'Oyuncu'), new.email,
          case when is_first then 'admin' else 'member' end);
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- Üyeler kendi rolünü ve özellik puanlarını değiştiremez
create or replace function public.protect_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    new.role := old.role;
    new.stats := old.stats;
  end if;
  if old.role = 'admin' and new.role <> 'admin'
     and (select count(*) from public.profiles where role = 'admin') <= 1 then
    new.role := 'admin'; -- son yönetici düşürülemez
  end if;
  new.email := old.email;
  return new;
end $$;
drop trigger if exists protect_profile on public.profiles;
create trigger protect_profile before update on public.profiles
for each row execute function public.protect_profile();

-- Ödeme bilgisini sadece yönetici değiştirebilir
create or replace function public.protect_rsvp() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status <> 'gel' then new.paid := false;
  elsif not public.is_admin() then
    new.paid := case when tg_op = 'UPDATE' then old.paid else false end;
  end if;
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists protect_rsvp on public.rsvps;
create trigger protect_rsvp before insert or update on public.rsvps
for each row execute function public.protect_rsvp();

-- ---------------------------------------------------------------------
-- Güvenlik kuralları (Row Level Security)
-- ---------------------------------------------------------------------
alter table public.settings enable row level security;   -- hiçbir istemci okuyamaz
alter table public.profiles enable row level security;
alter table public.matches enable row level security;
alter table public.rsvps enable row level security;
alter table public.videos enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.push_subs enable row level security;

drop policy if exists p_sel on public.profiles;
create policy p_sel on public.profiles for select to authenticated using (true);
drop policy if exists p_upd on public.profiles;
create policy p_upd on public.profiles for update to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists p_del on public.profiles;
create policy p_del on public.profiles for delete to authenticated using (public.is_admin() and id <> auth.uid());

drop policy if exists m_sel on public.matches;
create policy m_sel on public.matches for select to authenticated using (true);
drop policy if exists m_ins on public.matches;
create policy m_ins on public.matches for insert to authenticated with check (public.is_admin());
drop policy if exists m_upd on public.matches;
create policy m_upd on public.matches for update to authenticated using (public.is_admin());
drop policy if exists m_del on public.matches;
create policy m_del on public.matches for delete to authenticated using (public.is_admin());

drop policy if exists r_sel on public.rsvps;
create policy r_sel on public.rsvps for select to authenticated using (true);
drop policy if exists r_ins on public.rsvps;
create policy r_ins on public.rsvps for insert to authenticated with check (user_id = auth.uid() or public.is_admin());
drop policy if exists r_upd on public.rsvps;
create policy r_upd on public.rsvps for update to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists r_del on public.rsvps;
create policy r_del on public.rsvps for delete to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists v_sel on public.videos;
create policy v_sel on public.videos for select to authenticated using (true);
drop policy if exists v_ins on public.videos;
create policy v_ins on public.videos for insert to authenticated with check (user_id = auth.uid());
drop policy if exists v_upd on public.videos;
create policy v_upd on public.videos for update to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists v_del on public.videos;
create policy v_del on public.videos for delete to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists l_sel on public.likes;
create policy l_sel on public.likes for select to authenticated using (true);
drop policy if exists l_ins on public.likes;
create policy l_ins on public.likes for insert to authenticated with check (user_id = auth.uid());
drop policy if exists l_del on public.likes;
create policy l_del on public.likes for delete to authenticated using (user_id = auth.uid());

drop policy if exists c_sel on public.comments;
create policy c_sel on public.comments for select to authenticated using (true);
drop policy if exists c_ins on public.comments;
create policy c_ins on public.comments for insert to authenticated with check (user_id = auth.uid());
drop policy if exists c_del on public.comments;
create policy c_del on public.comments for delete to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists s_all on public.push_subs;
create policy s_all on public.push_subs for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- Dosya depolama: fotoğraflar (5 MB) ve videolar (50 MB, ücretsiz plan sınırı)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
       ('videos', 'videos', true, 52428800, array['video/mp4', 'video/quicktime', 'video/webm', 'video/3gpp', 'video/x-m4v'])
on conflict (id) do nothing;

drop policy if exists gn_up on storage.objects;
create policy gn_up on storage.objects for insert to authenticated
with check (bucket_id in ('photos', 'videos') and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists gn_del on storage.objects;
create policy gn_del on storage.objects for delete to authenticated
using (bucket_id in ('photos', 'videos') and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- ---------------------------------------------------------------------
-- Davet kodunu değiştirmek için (isteğe bağlı): tırnak içini düzenleyip çalıştır
-- update public.settings set team_code = 'GOLDNOVA2024' where id = 1;
-- ---------------------------------------------------------------------
