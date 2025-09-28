import { Devvit } from '@devvit/public-api';

// Admin onayı action'ı
Devvit.addAction({
  name: 'approve_daily_post',
  description: 'Günlük paylaşımı onayla ve puan ver',
  userInput: {
    postId: {
      type: 'string',
      name: 'Post ID',
      description: 'Onaylanacak post ID'
    }
  },
  handler: async (event, context) => {
    const { postId } = event.userInput;
    
    // Post sahibini bul
    const author = await context.redis.get(`pending_post_${postId}`);
    
    if (author) {
      // 10 puan ver
      const currentPoints = await context.redis.get(`daily_points_${author}`) || '1000';
      const newPoints = parseInt(currentPoints) + 10;
      
      await context.redis.set(`daily_points_${author}`, newPoints.toString());
      await context.redis.del(`pending_post_${postId}`);
      
      console.log(`${author} günlük paylaşım onaylandı, +10 puan verildi`);
      
      return {
        success: true,
        message: `${author} kullanıcısına +10 puan verildi`
      };
    }
    
    return {
      success: false,
      message: 'Post bulunamadı'
    };
  }
});

// Top list güncelleme action'ı
Devvit.addAction({
  name: 'update_top_list',
  description: 'Top listeyi güncelle',
  userInput: {
    username: {
      type: 'string',
      name: 'Kullanıcı Adı',
      description: 'Top listeye eklenecek kullanıcı'
    },
    points: {
      type: 'number',
      name: 'Puan',
      description: 'Kullanıcının puanı'
    }
  },
  handler: async (event, context) => {
    const { username, points } = event.userInput;
    
    // Top list verisini al
    const topListData = await context.redis.get('top_list') || '[]';
    const topList = JSON.parse(topListData);
    
    // Yeni kayıt ekle
    topList.push({
      username,
      points,
      timestamp: Date.now()
    });
    
    // En yüksek 10 kişiyi tut
    topList.sort((a: any, b: any) => b.points - a.points);
    const top10 = topList.slice(0, 10);
    
    // Redis'e kaydet
    await context.redis.set('top_list', JSON.stringify(top10));
    
    console.log(`Top list güncellendi: ${username} - ${points} puan`);
    
    return {
      success: true,
      message: `Top list güncellendi: ${username}`
    };
  }
});

// Trina hakkı verme action'ı
Devvit.addAction({
  name: 'give_trina',
  description: 'Kullanıcıya trina hakkı ver',
  userInput: {
    username: {
      type: 'string',
      name: 'Kullanıcı Adı',
      description: 'Trina verilecek kullanıcı'
    },
    trinaCount: {
      type: 'number',
      name: 'Trina Sayısı',
      description: 'Verilecek trina sayısı'
    }
  },
  handler: async (event, context) => {
    const { username, trinaCount } = event.userInput;
    
    // Mevcut trina sayısını al
    const currentTrina = await context.redis.get(`trina_${username}`) || '0';
    const newTrina = parseInt(currentTrina) + trinaCount;
    
    // Yeni trina sayısını kaydet
    await context.redis.set(`trina_${username}`, newTrina.toString());
    
    console.log(`${username} kullanıcısına ${trinaCount} trina verildi`);
    
    return {
      success: true,
      message: `${username} kullanıcısına ${trinaCount} trina verildi`
    };
  }
});
