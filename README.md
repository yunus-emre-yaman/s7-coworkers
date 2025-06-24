# Coworkers

Çalıştığın ekipteki üyeleri kolayca kaydedip listeleyebileceğin basit bir React uygulaması geliştiriyorsun. Kullanıcı adı, e-posta ve not bilgisini girerek yeni bir ekip üyesi ekleyebiliyor. Bu bilgiler geliştirme esnasında kullanılan sahte bir API'ye (https://jsonplaceholder.typicode.com/posts) gönderiliyor. API'den başarılı cevap alındığında üye listeye ekleniyor ve form sıfırlanıyor.

Uygulamada form `NewMemberForm` componenti ile, liste ise `CoworkerList` componenti ile yönetilecek. Bu componentları sıfırdan yazacak ve uygulamanın geri kalanına entegre edeceksin.

## Amaç

- Mevcut takım arkadaşlarının listesini gösteren, bir form aracılığıyla yeni takım arkadaşları ekleyebildiğin ve `team.jpg` dosyasındaki gibi görünen bir uygulama yapmak.
- [reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page) kütüphanesini kullanman bekleniyor.
- Üstteki linkte kurulum aşamalarını bulacaksın. Projeyi çalıştırma komutlarından önce paketleri kurduğundan emin ol.
- Çalışma dosyaların: `src/App.jsx`, `src/components/NewMemberForm.jsx`, `src/components/CoworkerList.jsx`. **App.jsx dosyası var, diğerlerini belirtilen klasörde sen oluşturacaksın.**
- Unutma, takıldığın yerlerde terminaldeki test mesajlarında ipuçları bulabilirsin.

## Proje Yönergeleri ve Kontrol Listesi

### 0. ÖNEMLİ NOT

- Projeyi yaptıkça browserdan kontrol etmeyi unutma.

### 1. Paket Kurulumları (package.json)

- [ ] `bootstrap` paketi kurulmuş mu?
- [ ] `reactstrap` paketi kurulmuş mu?

### 2. Stil Dosyaları

- [ ] `bootstrap.css` dosyası reactstrap dokümantasyonundaki gibi `App.jsx` dosyasına eklenmiş mi?

### 3. App.jsx Kontrolleri

#### handleAddMember Fonksiyonu

- [ ] `handleAddMember` fonksiyonu tanımlanmış mı?
- [ ] `handleAddMember` fonksiyonu, `NewMemberForm.jsx` bileşeninden gelen yeni üyeyi `members` state'ine eklemeli.

### 4. NewMemberForm.jsx Bileşeni

- [ ] `NewMemberForm.jsx` dosyası oluşturulmuş mu?
- [ ] İçerisinde aşağıdaki reactstrap bileşenleri kullanılmış mı?
  - `Form`, `FormGroup`, `Label`, `Input`, `Button`
- [ ] Prop olarak aldığı fonksiyon (`addMember`) doğru şekilde çalışıyor mu?
- [ ] Form submit edildiğinde aşağıdakiler yapılmalı:
  - Form verisi `https://jsonplaceholder.typicode.com/posts` adresine `POST` isteği olarak gönderilmeli.
  - API'den gelen başarılı response sonrası:
    - Yeni kullanıcı, uygulamadaki `members` listesine (state) eklenmeli.
    - Form sıfırlanmalı ve inputlar temizlenmeli.
  - Formun başlangıç (initial) verileri:

    ```js
    const initialForm = {
      fullName: "",
      email: "",
      notes: "",
    };
    ```

- [ ] Form alanlarının label'ları:
  - Ad Soyad
  - Email
  - Notlar
- [ ] Submit butonunun metni "Kaydet" olarak görünmeli.

### 5. CoworkerList.jsx Bileşeni

- [ ] `CoworkerList.jsx` dosyası oluşturulmuş mu?
- [ ] `Coworker.js` bileşeni, `CoworkerList` içinde doğru şekilde kullanılmış mı?
  - `CoworkerList` gelen üyeleri map edip `Coworker` bileşenini render etmeli.

## 🚀 Projeye Başlama

### Adım 1: Projeyi Kendi Hesabınıza Kopyalayın

1. Bu sayfanın sağ üst köşesindeki **Fork** butonuna tıklayın
2. Kendi GitHub hesabınızda proje kopyası oluşacak

### Adım 2: Projeyi Bilgisayarınıza İndirin

Görseldeki adımları takip edin ya da terminali kullanabilirsiniz.

```bash
git clone [buraya-kendi-fork-linkinizi-yazın]
cd [proje-klasor-adi]
```

### Adım 3: Gerekli Kurulumları Yapın

Terminal açın ve sırasıyla şu komutları çalıştırın:

```bash
npm install
npm run c2w
```

> **💡 İpucu:** Bu komutlar gerekli paketleri yükler ve test sistemini başlatır.

### Adım 4: Projeyi Çalıştırın ve Browserda Görüntüleyin

Yeni bir terminal tabı açın ve şu komutu çalıştırın:

```bash
npm run dev
```

Bu komut projeyi çalıştıracak ve bir link verecek. Bu linki browserda açın ve yazdıklarınızın çıktısını gözlemleyin.

## 📝 Geliştirme Süreci

### 0. Öğrenci numaranızı `student_id.txt` dosyasına yazın 

### 1. Testleri Takip Edin

- Testlerin çalıştığı trminali açık tutun ve test çıktılarını izleyin
- Başarılı testler ✅, başarısız testler ❌ ile gösterilir

### 2. Adım Adım İlerleyin

- Her küçük ilerleme sonrası değişiklikleri kaydedin
- Testlerin durumunu kontrol edin
- Bir özelliği tamamen bitirdikten sonra commit yapın

### 3. Düzenli Commit Yapın

GitHub Desktop uygulamasını kullanarak ilerlemenizi sıklıkla GitHub'a gönderin.
Ya da terminali kullanabilirsiniz:

```bash
git add .
git commit -m "Anlamlı bir commit mesajı"
git push origin main
```

### Yardım İçin:

1. Terminal hatasını tam olarak okuyun
2. Dosya yollarının doğru olduğunu kontrol edin
3. Değişiklikleri kaydettiğinizden emin olun

## 📋 Çalışma Akışı Özeti

1. ✅ Projeyi fork edin ve clone edin
2. ✅ `npm install` ve `npm run c2w` çalıştırın
3. ✅ `npm run dev` ile projeyi çalıştırın ve size verdiği linki açarak yaptıklarınızı takip edin
4. ✅ Terminal'den test sonuçlarını takip edin
5. ✅ Düzenli olarak commit yapın
6. ✅ İlerleyişinizi GitHub'a push edin

**İyi çalışmalar! 🎨✨**
