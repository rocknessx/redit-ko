import { Devvit } from '@devvit/public-api';

// Oyun verilerini saklamak için state
interface GameState {
  dailyPoints: number;
  usedPoints: number;
  trinaCount: number;
  topPlayers: Array<{
    username: string;
    points: number;
    timestamp: number;
  }>;
  communityMembers: Set<string>;
  dailyPosts: Map<string, boolean>;
}

// Varsayılan oyun durumu
const defaultGameState: GameState = {
  dailyPoints: 1000,
  usedPoints: 0,
  trinaCount: 0,
  topPlayers: [],
  communityMembers: new Set(),
  dailyPosts: new Map()
};

// Ana oyun komponenti
const KnightOnlineGame = Devvit.createComponent({
  name: 'KnightOnlineGame',
  render: (context) => {
    const { useState, useForm } = context;
    const [gameState, setGameState] = useState<GameState>(defaultGameState);
    const [showTopList, setShowTopList] = useState(false);

    // Artı basma fonksiyonu
    const handlePlusClick = () => {
      if (gameState.usedPoints < gameState.dailyPoints) {
        const newUsedPoints = gameState.usedPoints + 1;
        const newTrinaCount = gameState.trinaCount + 1;
        
        setGameState({
          ...gameState,
          usedPoints: newUsedPoints,
          trinaCount: newTrinaCount
        });
      }
    };

    // Trina kullanma fonksiyonu
    const handleTrinaUse = () => {
      if (gameState.trinaCount > 0) {
        setGameState({
          ...gameState,
          trinaCount: gameState.trinaCount - 1,
          dailyPoints: gameState.dailyPoints + 50 // Trina ile bonus puan
        });
      }
    };

    return (
      <vstack gap="medium" padding="medium" backgroundColor="#1a1a1a" cornerRadius="medium">
        {/* Başlık */}
        <text size="large" weight="bold" color="#FFD700">
          ⚔️ Knight Online Artı Basma Oyunu ⚔️
        </text>

        {/* Günlük Puan Bilgisi */}
        <vstack gap="small" backgroundColor="#2a2a2a" padding="medium" cornerRadius="small">
          <text size="medium" weight="bold" color="#FFFFFF">
            Günlük Puan: {gameState.dailyPoints - gameState.usedPoints} / {gameState.dailyPoints}
          </text>
          <text size="small" color="#CCCCCC">
            Her gün 00:00'da puanlar yenilenir
          </text>
        </vstack>

        {/* Artı Basma Butonu */}
        <button
          onPress={handlePlusClick}
          disabled={gameState.usedPoints >= gameState.dailyPoints}
          appearance="primary"
          size="large"
        >
          <text color="#FFFFFF" weight="bold">
            ⚡ ARTı BAS! ⚡
          </text>
        </button>

        {/* Trina Sistemi */}
        <vstack gap="small" backgroundColor="#2a2a2a" padding="medium" cornerRadius="small">
          <text size="medium" weight="bold" color="#FFD700">
            Trina Sayısı: {gameState.trinaCount}
          </text>
          <text size="small" color="#CCCCCC">
            r/knightonline1'e katılanlara 2 trina hakkı verilir
          </text>
          <button
            onPress={handleTrinaUse}
            disabled={gameState.trinaCount === 0}
            appearance="secondary"
            size="medium"
          >
            <text color="#FFD700">
              💎 Trina Kullan (+50 Puan)
            </text>
          </button>
        </vstack>

        {/* Top List Butonu */}
        <button
          onPress={() => setShowTopList(!showTopList)}
          appearance="secondary"
          size="medium"
        >
          <text color="#FFFFFF">
            🏆 Top List ({showTopList ? 'Gizle' : 'Göster'})
          </text>
        </button>

        {/* Top List */}
        {showTopList && (
          <vstack gap="small" backgroundColor="#2a2a2a" padding="medium" cornerRadius="small">
            <text size="medium" weight="bold" color="#FFD700">
              🏆 En Yüksek Artıya Basanlar
            </text>
            {gameState.topPlayers.length === 0 ? (
              <text size="small" color="#CCCCCC">
                Henüz kimse artıya basmamış
              </text>
            ) : (
              gameState.topPlayers
                .sort((a, b) => b.points - a.points)
                .slice(0, 10)
                .map((player, index) => (
                  <hstack gap="small" key={index}>
                    <text size="small" color="#FFD700">
                      {index + 1}.
                    </text>
                    <text size="small" color="#FFFFFF">
                      {player.username}
                    </text>
                    <text size="small" color="#00FF00">
                      {player.points} artı
                    </text>
                  </hstack>
                ))
            )}
          </vstack>
        )}

        {/* Community Bilgisi */}
        <vstack gap="small" backgroundColor="#2a2a2a" padding="medium" cornerRadius="small">
          <text size="medium" weight="bold" color="#00BFFF">
            📢 Community Ödülleri
          </text>
          <text size="small" color="#CCCCCC">
            • r/knightonline1'e katıl: +2 Trina
          </text>
          <text size="small" color="#CCCCCC">
            • Günlük paylaşım yap (admin onayı): +10 Puan
          </text>
        </vstack>
      </vstack>
    );
  }
});

// Uygulamayı export et
export default Devvit.createApp({
  name: 'Knight Online Plus Game',
  description: 'Knight Online temalı artı basma oyunu',
  components: [KnightOnlineGame]
});
