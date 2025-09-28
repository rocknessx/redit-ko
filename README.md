# Knight Online Artı Basma Oyunu

Reddit Devvit platformu için geliştirilmiş Knight Online temalı artı basma oyunu.

## 🎮 Oyun Özellikleri

- **Günlük Puan Sistemi**: Her gün 1000 puan verilir
- **Artı Basma**: Her artıda puandan düşülür
- **Top List**: En yüksek artıya basanlar listesi
- **Trina Sistemi**: Şans artırma mekanizması
- **Community Ödülleri**: r/knightonline1'e katılanlara 2 trina hakkı
- **Günlük Paylaşım**: Admin onaylı paylaşımlar için +10 puan

## 🚀 Kurulum

1. Reddit Devvit CLI'yi yükleyin:
```bash
npm install -g @devvit/cli
```

2. Projeyi klonlayın ve bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme modunda çalıştırın:
```bash
npm run dev
```

4. Uygulamayı deploy edin:
```bash
npm run deploy
```

## 🎯 Kullanım

1. r/knightonline1 subreddit'ine uygulamayı ekleyin
2. Kullanıcılar günlük puanlarıyla artı basabilir
3. Community'ye katılanlar otomatik olarak 2 trina hakkı alır
4. Günlük paylaşım yapanlar admin onayıyla bonus puan alır

## ⚙️ Teknik Detaylar

- **Platform**: Reddit Devvit
- **Dil**: TypeScript
- **Veri Saklama**: Redis
- **Trigger'lar**: Scheduled, Comment, Post
- **Action'lar**: Admin onay sistemi

## 📁 Proje Yapısı

```
knight-online-plus-game/
├── package.json          # Proje bağımlılıkları
├── devvit.config.json    # Devvit konfigürasyonu
├── src/
│   ├── index.ts          # Ana uygulama komponenti
│   ├── triggers.ts       # Event trigger'ları
│   └── actions.ts        # Admin action'ları
└── README.md             # Bu dosya
```

## 🎮 Oyun Mekanikleri

### Günlük Puan Sistemi
- Her gün 00:00'da tüm kullanıcıların puanları 1000'e sıfırlanır
- Her artı basma 1 puan harcar
- Puanlar bittiğinde artı basılamaz

### Trina Sistemi
- Her artı basma 1 trina kazandırır
- Trina kullanarak +50 puan alınabilir
- r/knightonline1'e katılanlara 2 trina hakkı verilir

### Top List
- En yüksek artıya basan 10 kişi listelenir
- Gerçek zamanlı güncellenir
- Kullanıcı adı ve puan bilgisi gösterilir

### Community Ödülleri
- **r/knightonline1 Katılımı**: +2 Trina hakkı
- **Günlük Paylaşım**: Admin onayıyla +10 puan
- **Otomatik Takip**: Sistem otomatik olarak üyelik ve paylaşımları takip eder

## 🔧 Admin İşlemleri

### Günlük Paylaşım Onayı
```typescript
// Post ID ile paylaşımı onayla
approve_daily_post(postId: string)
```

### Top List Güncelleme
```typescript
// Kullanıcıyı top listeye ekle
update_top_list(username: string, points: number)
```

### Trina Verme
```typescript
// Kullanıcıya trina hakkı ver
give_trina(username: string, trinaCount: number)
```

## 📊 Veri Yapısı

### Redis Keys
- `daily_reset`: Günlük sıfırlama zamanı
- `member_{username}`: Community üyelik durumu
- `trina_{username}`: Kullanıcının trina sayısı
- `daily_points_{username}`: Kullanıcının günlük puanı
- `pending_post_{postId}`: Onay bekleyen paylaşımlar
- `top_list`: Top 10 oyuncu listesi

## 🎨 UI Özellikleri

- **Knight Online Teması**: Altın ve koyu renk paleti
- **Responsive Tasarım**: Tüm cihazlarda uyumlu
- **Gerçek Zamanlı Güncelleme**: Anlık puan ve trina takibi
- **Top List Görünümü**: Açılır/kapanır liste
- **Community Bilgileri**: Ödül sistemi açıklamaları

## 🚀 Deployment

1. Reddit Developer hesabınızla giriş yapın
2. `devvit deploy` komutunu çalıştırın
3. r/knightonline1 subreddit'ine uygulamayı ekleyin
4. Admin yetkilerini ayarlayın

## 💰 Reddit Developer Funds

Bu proje [Reddit Developer Funds](https://developers.reddit.com/) programına başvurabilir. Program kapsamında $500k'ya kadar ödül alabilirsiniz.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Reddit**: r/knightonline1
- **Developer**: KnightOnline Developer
- **Proje Linki**: [GitHub Repository]

---

⚔️ **Knight Online Artı Basma Oyunu** - Reddit Devvit ile güçlendirilmiş! ⚔️
