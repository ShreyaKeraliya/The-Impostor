import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Users, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const wordPairs = [
  { common: "Hospital", spy: "Clinic" },
  { common: "Beach", spy: "Park" },
  { common: "Library", spy: "Bookstore" },
  { common: "Airport", spy: "Train Station" },
  { common: "Restaurant", spy: "Cafe" },
  { common: "School", spy: "College" },
  { common: "Jungle", spy: "Forest" },
  { common: "Museum", spy: "Gallery" },
  { common: "Cinema", spy: "Theatre" },
  { common: "Bank", spy: "Office" }
];

interface GameState {
  totalPlayers: number;
  spyCount: number;
  selectedPair: { common: string; spy: string };
  currentPlayer: number;
  wordRevealed: boolean;
  gamePhase: 'setup' | 'reveal' | 'complete';
  spyPlayers: Set<number>;
}

const SpyGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    totalPlayers: 0,
    spyCount: 0,
    selectedPair: { common: "", spy: "" },
    currentPlayer: 1,
    wordRevealed: false,
    gamePhase: 'setup',
    spyPlayers: new Set()
  });

  const [setupForm, setSetupForm] = useState({
    totalPlayers: '',
    spyCount: ''
  });

  const startGame = () => {
    const total = parseInt(setupForm.totalPlayers);
    const spies = parseInt(setupForm.spyCount);

    if (!total || !spies) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for both fields.",
        variant: "destructive"
      });
      return;
    }

    if (spies >= total) {
      toast({
        title: "Invalid Spy Count",
        description: "Number of spies must be less than total players.",
        variant: "destructive"
      });
      return;
    }

    if (total < 3 || spies < 1) {
      toast({
        title: "Invalid Game Setup",
        description: "Need at least 3 players and 1 spy to play.",
        variant: "destructive"
      });
      return;
    }

    // Randomly select word pair
    const selectedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    
    // Randomly assign spy players
    const spyPlayers = new Set<number>();
    while (spyPlayers.size < spies) {
      const randomPlayer = Math.floor(Math.random() * total) + 1;
      spyPlayers.add(randomPlayer);
    }

    setGameState({
      totalPlayers: total,
      spyCount: spies,
      selectedPair,
      currentPlayer: 1,
      wordRevealed: false,
      gamePhase: 'reveal',
      spyPlayers
    });

    toast({
      title: "Game Started!",
      description: `${total} players, ${spies} ${spies === 1 ? 'spy' : 'spies'}. Pass to Player 1.`,
      variant: "default"
    });
  };

  const revealWord = () => {
    setGameState(prev => ({ ...prev, wordRevealed: true }));
  };

  const nextPlayer = () => {
    if (gameState.currentPlayer < gameState.totalPlayers) {
      setGameState(prev => ({
        ...prev,
        currentPlayer: prev.currentPlayer + 1,
        wordRevealed: false
      }));
    } else {
      setGameState(prev => ({ ...prev, gamePhase: 'complete' }));
      toast({
        title: "All Players Ready!",
        description: "Time to start the discussion and find the spy!",
      });
    }
  };

  const resetGame = () => {
    setGameState({
      totalPlayers: 0,
      spyCount: 0,
      selectedPair: { common: "", spy: "" },
      currentPlayer: 1,
      wordRevealed: false,
      gamePhase: 'setup',
      spyPlayers: new Set()
    });
    setSetupForm({ totalPlayers: '', spyCount: '' });
  };

  const getCurrentWord = () => {
    return gameState.spyPlayers.has(gameState.currentPlayer) 
      ? gameState.selectedPair.spy 
      : gameState.selectedPair.common;
  };

  const isCurrentPlayerSpy = () => {
    return gameState.spyPlayers.has(gameState.currentPlayer);
  };

  if (gameState.gamePhase === 'setup') {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="bg-card border-spy-gold/20 shadow-elegant">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-spy rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-spy-gold" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                Spy Game
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                A game of deception and deduction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="totalPlayers" className="text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Total Players
                  </Label>
                  <Input
                    id="totalPlayers"
                    type="number"
                    min="3"
                    placeholder="Enter number of players"
                    value={setupForm.totalPlayers}
                    onChange={(e) => setSetupForm(prev => ({ ...prev, totalPlayers: e.target.value }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spyCount" className="text-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4 text-spy-red" />
                    Number of Spies
                  </Label>
                  <Input
                    id="spyCount"
                    type="number"
                    min="1"
                    placeholder="Enter number of spies"
                    value={setupForm.spyCount}
                    onChange={(e) => setSetupForm(prev => ({ ...prev, spyCount: e.target.value }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>
              
              <Button 
                onClick={startGame} 
                className="w-full"
                variant="gold"
                size="lg"
              >
                Start Game
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState.gamePhase === 'reveal') {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="bg-card border-spy-gold/20 shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Player {gameState.currentPlayer}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {gameState.wordRevealed ? "Your secret word:" : "Pass to the next player and tap to reveal"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!gameState.wordRevealed ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-spy rounded-full flex items-center justify-center animate-spy-pulse">
                    <EyeOff className="w-10 h-10 text-spy-gold" />
                  </div>
                  <Button 
                    onClick={revealWord}
                    variant="spy"
                    size="lg"
                    className="w-full"
                  >
                    Tap to Reveal Your Word
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4 animate-reveal">
                  <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
                    isCurrentPlayerSpy() ? 'bg-gradient-danger' : 'bg-gradient-gold'
                  }`}>
                    {isCurrentPlayerSpy() ? (
                      <Eye className="w-10 h-10 text-foreground" />
                    ) : (
                      <Users className="w-10 h-10 text-primary-foreground" />
                    )}
                  </div>
                  
                  <div className={`p-6 rounded-lg border-2 ${
                    isCurrentPlayerSpy() 
                      ? 'bg-spy-red/10 border-spy-red/50' 
                      : 'bg-spy-gold/10 border-spy-gold/50'
                  }`}>
                    <p className="text-sm text-muted-foreground mb-2">
                      {isCurrentPlayerSpy() ? "You are a SPY! Your word is:" : "You are INNOCENT! Your word is:"}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {getCurrentWord()}
                    </p>
                  </div>

                  <Button 
                    onClick={nextPlayer}
                    variant={gameState.currentPlayer === gameState.totalPlayers ? "gold" : "default"}
                    size="lg"
                    className="w-full"
                  >
                    {gameState.currentPlayer === gameState.totalPlayers ? (
                      <>
                        Start Discussion
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next Player ({gameState.currentPlayer + 1})
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState.gamePhase === 'complete') {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="bg-card border-spy-gold/20 shadow-elegant">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center animate-spy-pulse">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Game Ready!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-4">
                <p className="text-lg text-foreground">
                  All players have seen their words.
                </p>
                <div className="p-4 bg-spy-gold/10 border border-spy-gold/30 rounded-lg">
                  <p className="text-spy-gold font-semibold">
                    Start the discussion and vote out the spy!
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 bg-secret-green/10 border border-secret-green/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Innocent Word</p>
                    <p className="font-bold text-secret-green">{gameState.selectedPair.common}</p>
                  </div>
                  <div className="p-3 bg-spy-red/10 border border-spy-red/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Spy Word</p>
                    <p className="font-bold text-spy-red">{gameState.selectedPair.spy}</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={resetGame}
                variant="outline"
                size="lg"
                className="w-full"
              >
                New Game
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default SpyGame;