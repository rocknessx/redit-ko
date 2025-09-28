import { Devvit } from '@devvit/public-api';

// Günlük puan yenileme trigger'ı
Devvit.addTrigger({
  event: 'Scheduled',
  onEvent: async (event, context) => {
    // Her gün 00:00'da çalışacak
    const cron = '0 0 * * *';
    
    // Tüm kullanıcıların günlük puanlarını yenile
    await context.redis.set('daily_reset', Date.now().toString());
    
    console.log('Günlük puanlar yenilendi');
  }
});

// Community üyelik kontrolü
Devvit.addTrigger({
  event: 'Comment',
  onEvent: async (event, context) => {
    const { author, subreddit } = event;
    
    // r/knightonline1 subreddit'inde yorum yapıldığında
    if (subreddit === 'knightonline1') {
      const memberKey = `member_${author}`;
      const isMember = await context.redis.get(memberKey);
      
      if (!isMember) {
        // Yeni üye, 2 trina hakkı ver
        await context.redis.set(memberKey, 'true');
        await context.redis.set(`trina_${author}`, '2');
        
        console.log(`${author} r/knightonline1'e katıldı, 2 trina hakkı verildi`);
      }
    }
  }
});

// Admin onaylı paylaşım kontrolü
Devvit.addTrigger({
  event: 'Post',
  onEvent: async (event, context) => {
    const { author, subreddit, id } = event;
    
    // r/knightonline1'de paylaşım yapıldığında
    if (subreddit === 'knightonline1') {
      // Admin onayı için post ID'sini kaydet
      await context.redis.set(`pending_post_${id}`, author);
      
      console.log(`Paylaşım bekliyor admin onayı: ${id} by ${author}`);
    }
  }
});
