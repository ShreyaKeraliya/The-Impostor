import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Users, Shield, ArrowRight, CheckCircle, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const moreWordPairs = [
   { common: "Hospital", spy: "Clinic" },
  { common: "Library", spy: "Bookstore" },
  { common: "Airport", spy: "Train Station" },
  { common: "Restaurant", spy: "Cafe" },
  { common: "School", spy: "College" },
  { common: "Mall", spy: "Market" },
  { common: "Beach", spy: "Resort" },
  { common: "Cinema", spy: "Theatre" },
  { common: "Zoo", spy: "Safari" },
  { common: "Hotel", spy: "Motel" },

  // FOOD
  { common: "Pizza", spy: "Burger" },
  { common: "Tea", spy: "Coffee" },
  { common: "Sushi", spy: "Dumpling" },
  { common: "Ice Cream", spy: "Gelato" },
  { common: "Pasta", spy: "Noodles" },
  { common: "Cake", spy: "Brownie" },
  { common: "Biryani", spy: "Pulao" },
  { common: "Fries", spy: "Chips" },
  { common: "Milkshake", spy: "Smoothie" },
  { common: "Taco", spy: "Burrito" },

  // ANIMALS
  { common: "Dog", spy: "Wolf" },
  { common: "Cat", spy: "Tiger" },
  { common: "Elephant", spy: "Rhino" },
  { common: "Horse", spy: "Donkey" },
  { common: "Crocodile", spy: "Alligator" },
  { common: "Rabbit", spy: "Hare" },
  { common: "Lion", spy: "Tiger" },
  { common: "Monkey", spy: "Chimpanzee" },
  { common: "Cow", spy: "Buffalo" },
  { common: "Duck", spy: "Goose" },

  // SPORTS & GAMES
  { common: "Football", spy: "Rugby" },
  { common: "Tennis", spy: "Badminton" },
  { common: "Chess", spy: "Checkers" },
  { common: "Cricket", spy: "Baseball" },
  { common: "Basketball", spy: "Volleyball" },
  { common: "Hockey", spy: "Ice Hockey" },
  { common: "Golf", spy: "Mini Golf" },
  { common: "Wrestling", spy: "Boxing" },
  { common: "Carrom", spy: "Ludo" },
  { common: "Cycling", spy: "Skating" },

  // TRANSPORT
  { common: "Car", spy: "Taxi" },
  { common: "Bus", spy: "Van" },
  { common: "Bicycle", spy: "Scooter" },
  { common: "Plane", spy: "Helicopter" },
  { common: "Boat", spy: "Ship" },
  { common: "Train", spy: "Metro" },
  { common: "Truck", spy: "Lorry" },
  { common: "Rickshaw", spy: "Auto" },
  { common: "Subway", spy: "Tram" },
  { common: "Jet", spy: "Aircraft" },

  // OBJECTS
  { common: "Phone", spy: "Tablet" },
  { common: "Laptop", spy: "Desktop" },
  { common: "Pen", spy: "Pencil" },
  { common: "Chair", spy: "Stool" },
  { common: "Bottle", spy: "Glass" },
  { common: "TV", spy: "Projector" },
  { common: "Mirror", spy: "Window" },
  { common: "Bag", spy: "Backpack" },
  { common: "Key", spy: "Lock" },
  { common: "Clock", spy: "Watch" },

  // NATURE / OUTDOORS
  { common: "Mountain", spy: "Hill" },
  { common: "River", spy: "Lake" },
  { common: "Sun", spy: "Moon" },
  { common: "Rain", spy: "Storm" },
  { common: "Forest", spy: "Jungle" },
  { common: "Snow", spy: "Ice" },
  { common: "Sky", spy: "Cloud" },
  { common: "Tree", spy: "Bush" },
  { common: "Sand", spy: "Dust" },
  { common: "Wind", spy: "Breeze" },

  // JOBS & PEOPLE
  { common: "Doctor", spy: "Nurse" },
  { common: "Teacher", spy: "Professor" },
  { common: "Pilot", spy: "Driver" },
  { common: "Chef", spy: "Cook" },
  { common: "Police", spy: "Guard" },
  { common: "Engineer", spy: "Mechanic" },
  { common: "Singer", spy: "Dancer" },
  { common: "Artist", spy: "Painter" },
  { common: "Actor", spy: "Model" },
  { common: "Judge", spy: "Lawyer" },

  // FESTIVALS / EVENTS
  { common: "Birthday", spy: "Anniversary" },
  { common: "Wedding", spy: "Reception" },
  { common: "Christmas", spy: "New Year" },
  { common: "Diwali", spy: "Holi" },
  { common: "Concert", spy: "Festival" },
  { common: "Exam", spy: "Test" },
  { common: "Game Night", spy: "Movie Night" },
  { common: "Picnic", spy: "Trip" },
  { common: "Match", spy: "Tournament" },
  { common: "Meeting", spy: "Interview" }
  // PLACES
  { common: "Temple", spy: "Church" },
  { common: "Garden", spy: "Park" },
  { common: "Bridge", spy: "Tunnel" },
  { common: "Canteen", spy: "Mess" },
  { common: "Stadium", spy: "Arena" },
  { common: "Lounge", spy: "Living Room" },
  { common: "Garage", spy: "Workshop" },
  { common: "Farm", spy: "Field" },
  { common: "Cabin", spy: "Cottage" },
  { common: "Theatre", spy: "Opera" },

  // FOOD
  { common: "Bread", spy: "Toast" },
  { common: "Butter", spy: "Cheese" },
  { common: "Soup", spy: "Stew" },
  { common: "Rice", spy: "Quinoa" },
  { common: "Donut", spy: "Cupcake" },
  { common: "Ketchup", spy: "Sauce" },
  { common: "Salad", spy: "Sprouts" },
  { common: "Curry", spy: "Gravy" },
  { common: "Roti", spy: "Paratha" },
  { common: "Juice", spy: "Soda" },

  // ANIMALS
  { common: "Bear", spy: "Panda" },
  { common: "Fish", spy: "Shark" },
  { common: "Peacock", spy: "Swan" },
  { common: "Parrot", spy: "Pigeon" },
  { common: "Frog", spy: "Toad" },
  { common: "Owl", spy: "Eagle" },
  { common: "Dog", spy: "Fox" },
  { common: "Bat", spy: "Crow" },
  { common: "Camel", spy: "Horse" },
  { common: "Goat", spy: "Sheep" },

  // SPORTS / GAMES
  { common: "Snooker", spy: "Pool" },
  { common: "Running", spy: "Jogging" },
  { common: "Bowling", spy: "Cricket" },
  { common: "Skating", spy: "Skiing" },
  { common: "Kabaddi", spy: "Kho Kho" },
  { common: "Wrestling", spy: "Karate" },
  { common: "Archery", spy: "Shooting" },
  { common: "Badminton", spy: "Squash" },
  { common: "Swimming", spy: "Diving" },
  { common: "Table Tennis", spy: "Ping Pong" },

  // TRANSPORT
  { common: "Auto", spy: "TukTuk" },
  { common: "Cruise", spy: "Yacht" },
  { common: "Truck", spy: "Trailer" },
  { common: "Bicycle", spy: "E-Bike" },
  { common: "Rickshaw", spy: "Cart" },
  { common: "Helicopter", spy: "Drone" },
  { common: "Scooter", spy: "Moped" },
  { common: "Tram", spy: "Subway" },
  { common: "Skateboard", spy: "Rollerblade" },
  { common: "Jet", spy: "Fighter Plane" },

  // OBJECTS
  { common: "Notebook", spy: "Diary" },
  { common: "TV", spy: "Monitor" },
  { common: "Towel", spy: "Napkin" },
  { common: "Cushion", spy: "Pillow" },
  { common: "Spoon", spy: "Fork" },
  { common: "Shoe", spy: "Slipper" },
  { common: "Charger", spy: "Power Bank" },
  { common: "Battery", spy: "Cell" },
  { common: "Table", spy: "Desk" },
  { common: "Curtain", spy: "Blinds" },

  // NATURE / SEASONS
  { common: "Spring", spy: "Autumn" },
  { common: "Sunset", spy: "Sunrise" },
  { common: "Rainbow", spy: "Aurora" },
  { common: "Lightning", spy: "Thunder" },
  { common: "Fog", spy: "Mist" },
  { common: "River", spy: "Stream" },
  { common: "Rock", spy: "Stone" },
  { common: "Volcano", spy: "Mountain" },
  { common: "Flower", spy: "Rose" },
  { common: "Sand", spy: "Clay" },

  // JOBS / PEOPLE
  { common: "Singer", spy: "Composer" },
  { common: "Actor", spy: "Director" },
  { common: "Scientist", spy: "Inventor" },
  { common: "Author", spy: "Poet" },
  { common: "Engineer", spy: "Technician" },
  { common: "Manager", spy: "Leader" },
  { common: "Baker", spy: "Chef" },
  { common: "Farmer", spy: "Gardener" },
  { common: "Driver", spy: "Pilot" },
  { common: "Soldier", spy: "Commander" },

  // TECH / TOOLS
  { common: "Remote", spy: "Controller" },
  { common: "Mouse", spy: "Trackpad" },
  { common: "Camera", spy: "Webcam" },
  { common: "Speaker", spy: "Headphone" },
  { common: "Mic", spy: "Recorder" },
  { common: "Light", spy: "Lamp" },
  { common: "Calculator", spy: "Phone" },
  { common: "Router", spy: "Modem" },
  { common: "USB", spy: "Memory Card" },
  { common: "Drone", spy: "Helicam" }
];


interface GameState {
  totalPlayers: number;
  spyCount: number;
  selectedPair: { common: string; spy: string };
  currentPlayer: number;
  wordRevealed: boolean;
  gamePhase: 'setup' | 'names' | 'reveal' | 'complete';
  spyPlayers: Set<number>;
  playerNames: string[];
  timeLeft: number;
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
    spyPlayers: new Set(),
    playerNames: [],
    timeLeft: 300 // 5 minutes in seconds
  });

  const [setupForm, setSetupForm] = useState({
    totalPlayers: '',
    spyCount: ''
  });

  const [playerNamesForm, setPlayerNamesForm] = useState<string[]>([]);

  // Timer effect
  useEffect(() => {
    if (gameState.gamePhase === 'complete' && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.gamePhase, gameState.timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const proceedToNames = () => {
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

    setPlayerNamesForm(Array(total).fill(''));
    setGameState(prev => ({ 
      ...prev, 
      totalPlayers: total,
      spyCount: spies,
      gamePhase: 'names'
    }));
  };

  const startGame = () => {
    // Check if all names are filled
    const emptyNames = playerNamesForm.some(name => !name.trim());
    if (emptyNames) {
      toast({
        title: "Missing Names",
        description: "Please enter names for all players.",
        variant: "destructive"
      });
      return;
    }

    // Randomly select word pair
    const selectedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    
    // Randomly assign spy players
    const spyPlayers = new Set<number>();
    while (spyPlayers.size < gameState.spyCount) {
      const randomPlayer = Math.floor(Math.random() * gameState.totalPlayers) + 1;
      spyPlayers.add(randomPlayer);
    }

    setGameState(prev => ({
      ...prev,
      selectedPair,
      currentPlayer: 1,
      wordRevealed: false,
      gamePhase: 'reveal',
      spyPlayers,
      playerNames: playerNamesForm,
      timeLeft: 300
    }));

    toast({
      title: "Game Started!",
      description: `${gameState.totalPlayers} players, ${gameState.spyCount} ${gameState.spyCount === 1 ? 'spy' : 'spies'}. Pass to ${playerNamesForm[0]}.`,
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
      spyPlayers: new Set(),
      playerNames: [],
      timeLeft: 300
    });
    setSetupForm({ totalPlayers: '', spyCount: '' });
    setPlayerNamesForm([]);
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
                onClick={proceedToNames} 
                className="w-full"
                variant="gold"
                size="lg"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState.gamePhase === 'names') {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="bg-card border-spy-gold/20 shadow-elegant">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-spy rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-spy-gold" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Player Names
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter names for all players
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {playerNamesForm.map((name, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`player-${index}`} className="text-foreground">
                      Player {index + 1}
                    </Label>
                    <Input
                      id={`player-${index}`}
                      placeholder={`Enter name for Player ${index + 1}`}
                      value={name}
                      onChange={(e) => {
                        const newNames = [...playerNamesForm];
                        newNames[index] = e.target.value;
                        setPlayerNamesForm(newNames);
                      }}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setGameState(prev => ({ ...prev, gamePhase: 'setup' }))}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={startGame} 
                  variant="gold"
                  className="flex-1"
                >
                  Start Game
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
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
                {gameState.playerNames[gameState.currentPlayer - 1]}
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
                  <div className="mx-auto w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center">
  <Eye className="w-10 h-10 text-primary-foreground" />
</div>

                  
                  <div className="p-6 rounded-lg border-2 bg-spy-gold/10 border-spy-gold/50">
  <p className="text-4xl font-bold text-foreground text-center">
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
                        Next Player ({gameState.playerNames[gameState.currentPlayer] || gameState.currentPlayer + 1})
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
                {gameState.timeLeft > 0 ? (
                  <Clock className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                )}
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                {gameState.timeLeft > 0 ? "Discussion Time!" : "Time's Up!"}
              </CardTitle>
              {gameState.timeLeft > 0 && (
                <div className="text-2xl font-mono text-spy-gold">
                  {formatTime(gameState.timeLeft)}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-4">
                <p className="text-lg text-foreground">
                  All players have seen their words.
                </p>
                <div className="p-4 bg-spy-gold/10 border border-spy-gold/30 rounded-lg">
                  <p className="text-spy-gold font-semibold">
                    {gameState.timeLeft > 0 
                      ? "Discuss and vote out the spy!" 
                      : "Time to reveal the results!"}
                  </p>
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
