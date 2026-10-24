# GOLDNOVA United

Halısaha takımımızın uygulaması: maçlar, katılım, kadro, sonuçlar, oyuncu profilleri ve gol videoları. Telefona uygulama olarak eklenir, yeni maçta herkese bildirim ve e-posta gider.

Tamamen ücretsiz çalışır:
- **GitHub Pages:** uygulamanın kendisi (bu klasör)
- **Supabase (ücretsiz plan):** giriş, veritabanı, fotoğraf ve video depolama, bildirim gönderme
- **GitHub Actions:** maçtan 3 saat önce hatırlatma

Kurulum yaklaşık 20 dakika sürer. Adımları sırayla yap.

---

## 1. Supabase projesi aç

1. https://supabase.com adresine gir, GitHub hesabınla kayıt ol.
2. **New project** de. Ad: `goldnova`, bölge: **Central EU (Frankfurt)**, bir veritabanı şifresi belirle (bir yere not al).
3. Proje hazır olunca soldan **SQL Editor > New query** aç.
4. Bu klasördeki `supabase/schema.sql` dosyasının tamamını kopyala, yapıştır, **Run** de. "Success" yazmalı.
   - Davet kodu varsayılan olarak `GOLDNOVA2024`. Değiştirmek için dosyanın en altındaki `update` satırının başındaki `--` işaretini silip kodu yaz ve tekrar çalıştır.

## 2. Giriş ayarları

Supabase panelinde **Authentication** bölümüne gir:
1. **Sign In / Providers > Email:** "Confirm email" seçeneğini **kapat**. (Açık kalırsa Supabase'in ücretsiz mail sınırı yüzünden kayıt onay mailleri gelmeyebilir.)
2. **URL Configuration > Site URL:** GitHub Pages adresini yaz (4. adımda öğreneceksin, sonra dönüp yazabilirsin). Örnek: `https://kullaniciadin.github.io/goldnova/`

## 3. config.js dosyasını doldur

Supabase'de **Project Settings > API** sayfasından iki değeri al ve `config.js` içine yapıştır:
- `Project URL` → `supabaseUrl`
- `anon public` anahtarı → `supabaseAnonKey`

> Bu iki değer herkese açık olabilir, güvenlik Supabase kurallarıyla sağlanıyor. **`service_role` anahtarını asla bu dosyaya yazma.**

## 4. GitHub'a yükle ve yayınla

1. https://github.com/new adresinden yeni bir depo aç. Ad: `goldnova`, **Public** seç (ücretsiz Pages için gerekli), **Create repository** de.
2. Açılan sayfada **uploading an existing file** linkine tıkla.
3. Bu klasörün **içindeki her şeyi** (klasörün kendisini değil, içindekileri) sürükleyip bırak. `.github`, `icons` ve `supabase` klasörleri de gitmeli. **Commit changes** de.
   - `.github` klasörü yüklenmezse: depoda **Add file > Create new file** de, ad kısmına `.github/workflows/remind.yml` yaz ve bu klasördeki aynı dosyanın içeriğini yapıştır.
4. Depoda **Settings > Pages** aç. **Source: Deploy from a branch**, **Branch: main**, klasör **/ (root)** seç, **Save** de.
5. 1-2 dakika sonra adresin görünür: `https://kullaniciadin.github.io/goldnova/`. Bu adresi 2. adımdaki Site URL'ye yaz.

Uygulamayı aç, **Kayıt ol** de ve ilk hesabı sen oluştur. İlk kayıt olan yönetici olur.

## 5. Telefon bildirimleri

Diğer uygulamaların kullandığı standart **Web Push** sistemi kullanılıyor. Android'de normal uygulama bildirimi gibi, iPhone'da ana ekrana eklenen uygulamadan geliyor.

1. Bilgisayarında terminal aç ve çalıştır:
   ```
   npx web-push generate-vapid-keys
   ```
2. Çıkan **Public Key**'i `config.js` içindeki `vapidPublicKey` satırına yaz ve GitHub'da bu dosyayı güncelle (dosyayı aç > kalem simgesi > yapıştır > Commit).
3. **Private Key**'i bir yere not al, 6. adımda kullanacaksın.

## 6. Bildirim fonksiyonunu kur (Supabase Edge Function)

1. Supabase'de soldan **Edge Functions** aç, **Deploy a new function > Via Editor** de.
2. Fonksiyon adını tam olarak `notify` yaz.
3. Editördeki örnek kodu sil, bu klasördeki `supabase/functions/notify/index.ts` dosyasının tamamını yapıştır, **Deploy** de.
4. **Edge Functions > Secrets** bölümüne şu değerleri ekle:

| Ad | Değer |
|---|---|
| `VAPID_PUBLIC_KEY` | 5. adımdaki Public Key |
| `VAPID_PRIVATE_KEY` | 5. adımdaki Private Key |
| `VAPID_SUBJECT` | `mailto:seninmailin@gmail.com` |
| `APP_URL` | GitHub Pages adresin (sonunda `/` olmadan) |
| `CRON_SECRET` | Kendi uydurduğun uzun bir şifre (7. adımda da kullanılacak) |

> Supabase CLI kullanmayı biliyorsan alternatif: `npx supabase functions deploy notify` ve `npx supabase secrets set ...`

## 7. E-posta (ücretsiz)

İki seçenek var, birini seç:

**A) Brevo (önerilen, günde 300 e-posta ücretsiz)**
1. https://www.brevo.com adresinden ücretsiz hesap aç.
2. **Senders, Domains & Dedicated IPs > Senders** bölümünden Gmail adresini gönderici olarak ekle, gelen maildeki linkle onayla.
3. **SMTP & API > API Keys** bölümünden bir API anahtarı oluştur.
4. Supabase Edge Functions Secrets'a ekle: `BREVO_API_KEY` = anahtar, `MAIL_FROM_EMAIL` = onayladığın Gmail adresi.

**B) Gmail ile**
Gmail'de 2 adımlı doğrulamayı aç, Google Hesabı > Güvenlik > **Uygulama şifreleri**'nden 16 haneli şifre al. Secrets'a ekle: `SMTP_USER` = Gmail adresin, `SMTP_PASS` = 16 haneli şifre. (Brevo çalışmazsa bunu dene. Bazı durumlarda Supabase Gmail bağlantısına izin vermeyebilir.)

## 8. Maç hatırlatıcı (GitHub Actions)

GitHub'daki deponda **Settings > Secrets and variables > Actions > New repository secret** ile üç değer ekle:

| Ad | Değer |
|---|---|
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_ANON_KEY` | Supabase anon public anahtarı |
| `CRON_SECRET` | 6. adımda yazdığın şifrenin aynısı |

Sonra depoda **Actions** sekmesine gir, "Maç hatırlatıcı"yı seç ve iş akışlarını etkinleştir. Her 15 dakikada bir maçlara bakar, maçtan 3 saat önce bildirim gönderir.

> GitHub, 60 gün hiç değişiklik olmayan depolarda zamanlanmış görevleri durdurabilir. Durursa Actions sekmesinden tekrar etkinleştir.

---

## Telefona yükleme

- **Android (Chrome):** Siteyi aç, menüden **Uygulamayı yükle** ya da **Ana ekrana ekle**. Profil > Bildirimler'i aç.
- **iPhone (iOS 16.4+):** Safari'de siteyi aç, **Paylaş > Ana Ekrana Ekle**. Ana ekrandaki GOLDNOVA ikonundan aç, Profil > Bildirimler'i aç. iPhone'da bildirimler yalnızca ana ekrana eklenen uygulamada çalışır.

## Ücretsiz plan sınırları

- **Video dosyası en fazla 50 MB.** Uzun videoları telefonda kırpıp sadece gol anını yükleyin. Daha uzun videolar için YouTube'a "liste dışı" yükleyip linkini ekleyin, link de çalışır.
- **Toplam 1 GB depolama** ve **ayda 5 GB izlenme trafiği.** Doldukça eski videoları silebilirsiniz.
- **Supabase, 1 hafta hiç kullanılmayan ücretsiz projeleri duraklatır.** Hatırlatıcı her 15 dakikada çalıştığı için normalde duraklamaz. Duraklarsa Supabase panelinden "Restore" de.

## Sorun giderme

- **Kayıt olurken "Takım davet kodu hatalı":** Kodu doğru yazdığından emin ol. Kodu `supabase/schema.sql` en altındaki satırla değiştirebilirsin.
- **Bildirim gelmiyor:** Profil > Bildirimler > "Test bildirimi gönder" dene. Gelmezse Supabase'de Edge Functions > notify > **Logs** bölümüne bak. VAPID anahtarlarının hem `config.js`'te hem Secrets'ta aynı çift olduğundan emin ol.
- **Mail gelmiyor:** Spam klasörüne bak. Edge Functions loglarında "brevo hata" ya da "smtp hata" yazıyor mu kontrol et.
- **Değişiklik görünmüyor:** GitHub Pages'in güncellenmesi 1-2 dakika sürer. Telefonda uygulamayı kapatıp yeniden aç.
