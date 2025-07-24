import React,{ useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Users, Shield, ArrowRight, CheckCircle, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const moreWordPairs = [
    // { common: "Teacher", spy: "Coach" },
    // { common: "Doctor", spy: "Paramedic" },
    // { common: "Engineer", spy: "Architect" },
    // { common: "Judge", spy: "Juror" },
    // { common: "Pilot", spy: "Astronaut" },
    // { common: "Chef", spy: "Baker" },
    // { common: "Police", spy: "Detective" },
    // { common: "Firefighter", spy: "Lifeguard" },
    // { common: "Farmer", spy: "Gardener" },
    // { common: "Dentist", spy: "Orthodontist" },
    // { common: "Author", spy: "Editor" },
    // { common: "Singer", spy: "Dancer" },
    // { common: "Painter", spy: "Sculptor" },
    // { common: "Driver", spy: "Racer" },
    // { common: "Scientist", spy: "Inventor" },
    // { common: "Student", spy: "Intern" },
    // { common: "Professor", spy: "Lecturer" },
    // { common: "Barber", spy: "Stylist" },
    // { common: "Mechanic", spy: "Technician" },
    // { common: "Soldier", spy: "Mercenary" },
    // { common: "Librarian", spy: "Archivist" },
    // { common: "Reporter", spy: "Blogger" },
    // { common: "Photographer", spy: "Videographer" },
    // { common: "Magician", spy: "Illusionist" },
    // { common: "Director", spy: "Producer" },
    // { common: "Actor", spy: "Stuntman" },
    // { common: "Painter", spy: "Graffiti Artist" },
    // { common: "Tailor", spy: "Designer" },
    // { common: "Judge", spy: "Referee" },
    // { common: "Driver", spy: "Courier" },
    // { common: "Coach", spy: "Referee" },
    // { common: "Sailor", spy: "Fisherman" },
    // { common: "Baker", spy: "Pastry Chef" },
    // { common: "Poet", spy: "Lyricist" },
    // { common: "Singer", spy: "Rapper" },
    // { common: "Detective", spy: "Agent" },
    // { common: "Clerk", spy: "Receptionist" },
    // { common: "Plumber", spy: "Electrician" },
    // { common: "Nurse", spy: "Caregiver" },
    // { common: "Firefighter", spy: "Rescuer" },
    // { common: "Lawyer", spy: "Prosecutor" },
    // { common: "Judge", spy: "Lawyer" },
    // { common: "Athlete", spy: "Trainer" },
    // { common: "Coach", spy: "Manager" },
    // { common: "Actor", spy: "Comedian" },
    // { common: "Pilot", spy: "Flight Attendant" },
    // { common: "Scientist", spy: "Researcher" },
    // { common: "Professor", spy: "Tutor" },
    // { common: "Secretary", spy: "Assistant" },
    // { common: "Director", spy: "Cinematographer" },
    // { common: "Soldier", spy: "Commander" },
    // { common: "Author", spy: "Novelist" },
    // { common: "Engineer", spy: "Developer" },
    // { common: "Technician", spy: "Mechanic" },
    // { common: "Architect", spy: "Builder" },
    // { common: "Astronaut", spy: "Cosmonaut" },
    // { common: "Therapist", spy: "Counselor" },
    // { common: "Cashier", spy: "Bank Teller" },
    // { common: "Waiter", spy: "Host" },
    // { common: "Waitress", spy: "Server" },
    // { common: "Butcher", spy: "Chef" },
    // { common: "Veterinarian", spy: "Zoologist" },
    // { common: "Musician", spy: "Composer" },
    // { common: "Singer", spy: "Opera Singer" },
    // { common: "Janitor", spy: "Custodian" },
    // { common: "Programmer", spy: "Coder" },
    // { common: "Developer", spy: "Engineer" },
    // { common: "Broker", spy: "Trader" },
    // { common: "Banker", spy: "Accountant" },
    // { common: "Guard", spy: "Security" },
    // { common: "Driver", spy: "Pilot" },
    // { common: "Delivery", spy: "Courier" },
    // { common: "Captain", spy: "Sailor" },
    // { common: "Surgeon", spy: "Doctor" },
    // { common: "Nurse", spy: "Midwife" },
    // { common: "Researcher", spy: "Scholar" },
    // { common: "Mechanic", spy: "Engineer" },
    // { common: "Athlete", spy: "Bodybuilder" },
    // { common: "Trainer", spy: "Coach" },
    // { common: "Model", spy: "Influencer" },
    // { common: "Artist", spy: "Painter" },
    // { common: "Actor", spy: "Performer" },
    // { common: "Singer", spy: "Performer" },
    // { common: "Director", spy: "Editor" },
    // { common: "Teacher", spy: "Tutor" },
    // { common: "Student", spy: "Apprentice" },
    // { common: "Programmer", spy: "Hacker" },
    // { common: "Dancer", spy: "Choreographer" },
    // { common: "Technician", spy: "Operator" },
    // { common: "Editor", spy: "Proofreader" },
    // { common: "Designer", spy: "Artist" },
    // { common: "Driver", spy: "Taxi Driver" },
    // { common: "Developer", spy: "Tester" },
    // { common: "Referee", spy: "Umpire" },
    // { common: "Coach", spy: "Scout" },
    // { common: "Singer", spy: "Voice Actor" },
    // { common: "Chef", spy: "Sous Chef" },
    // { common: "Firefighter", spy: "Fire Marshal" },
    // { common: "Policeman", spy: "Sheriff" },
    // { common: "Judge", spy: "Magistrate" },
    // { common: "Lawyer", spy: "Advocate" },
    // { common: "Barber", spy: "Hairdresser" },
    // { common: "Mechanic", spy: "Repairman" },
    // { common: "Tailor", spy: "Cobbler" },
    // { common: "Plumber", spy: "Pipefitter" },
    // { common: "Chef", spy: "Cook" },
    // { common: "Scientist", spy: "Lab Assistant" },
    // { common: "Astronaut", spy: "Pilot" },
    // { common: "Editor", spy: "Screenwriter" },
    // { common: "Dancer", spy: "Ballerina" },
    // { common: "Librarian", spy: "Bookstore Clerk" },
    // { common: "Poet", spy: "Writer" },
    // { common: "Captain", spy: "Commander" },
    // { common: "Painter", spy: "Muralist" },
    // { common: "Sculptor", spy: "Carver" },
    // { common: "Model", spy: "Presenter" },
    // { common: "Photographer", spy: "Reporter" },
    // { common: "Soldier", spy: "Guard" },
    // { common: "Firefighter", spy: "Paramedic" },
    // { common: "Therapist", spy: "Psychologist" },
    // { common: "Counselor", spy: "Life Coach" },
    // { common: "Pilot", spy: "Captain" },
    // { common: "Fisherman", spy: "Boater" },
    // { common: "Veterinarian", spy: "Pet Groomer" },
    // { common: "Receptionist", spy: "Secretary" },
    // { common: "Cashier", spy: "Clerk" },
    // { common: "Trainer", spy: "Nutritionist" },
    // { common: "Architect", spy: "Interior Designer" },
    // { common: "Electrician", spy: "Technician" },
    // { common: "Manager", spy: "Supervisor" },
    // { common: "Assistant", spy: "Intern" },
    // { common: "CEO", spy: "Director" },
    // { common: "Cook", spy: "Waiter" },
    // { common: "Delivery", spy: "Mover" },
    // { common: "Detective", spy: "Undercover" },
    // { common: "Agent", spy: "Spy" },
    // { common: "Athlete", spy: "Referee" },
    // { common: "Janitor", spy: "Cleaner" },
    // { common: "Developer", spy: "Sysadmin" },
    // { common: "Programmer", spy: "Game Developer" },
    // { common: "Accountant", spy: "Auditor" },
    // { common: "Banker", spy: "Loan Officer" },
    // { common: "Therapist", spy: "Social Worker" },
    // { common: "Stylist", spy: "Makeup Artist" },
    // { common: "Sailor", spy: "Navy" },
    // { common: "Guard", spy: "Watchman" },
    // { common: "Courier", spy: "Postman" },
    // { common: "Technician", spy: "Installer" },
    // { common: "Cook", spy: "Butcher" },
    // { common: "Actor", spy: "Extra" },
    // { common: "Author", spy: "Journalist" },
    // { common: "Journalist", spy: "News Anchor" },
    // { common: "Security", spy: "Bouncer" },
    // { common: "Teacher", spy: "Counselor" },
    // { common: "Intern", spy: "Trainee" },
    // { common: "Scientist", spy: "Physicist" },
    // { common: "Doctor", spy: "Surgeon" },
    // { common: "Surgeon", spy: "Anesthetist" },
    // { common: "Dentist", spy: "Hygienist" },
    // { common: "Pharmacist", spy: "Chemist" },
    // { common: "Engineer", spy: "Scientist" },
    // { common: "Tester", spy: "QA Analyst" },
    // { common: "Comedian", spy: "Clown" },
    // { common: "Cleaner", spy: "Maid" },  
    
];[
  { "common": "Car", "spy": "Vehicle" },
  { "common": "House", "spy": "Safehouse" },
  { "common": "Phone", "spy": "Comm device" },
  { "common": "Book", "spy": "Dossier" },
  { "common": "Dog", "spy": "K9" },
  { "common": "Cat", "spy": "Feline agent" },
  { "common": "Money", "spy": "Funds" },
  { "common": "Food", "spy": "Rations" },
  { "common": "Water", "spy": "H₂O reserve" },
  { "common": "Pen", "spy": "Ink weapon" },
  { "common": "Desk", "spy": "Ops table" },
  { "common": "Chair", "spy": "Seating unit" },
  { "common": "Window", "spy": "Observation port" },
  { "common": "Door", "spy": "Access point" },
  { "common": "Light", "spy": "Illumination" },
  { "common": "Shadow", "spy": "Cover" },
  { "common": "Map", "spy": "Blueprint" },
  { "common": "Key", "spy": "Access key" },
  { "common": "Bag", "spy": "Gear pack" },
  { "common": "Shoe", "spy": "Tactical boot" },
  { "common": "Clothes", "spy": "Field suit" },
  { "common": "Hat", "spy": "Cover cap" },
  { "common": "Clock", "spy": "Timepiece" },
  { "common": "Watch", "spy": "Wrist timer" },
  { "common": "Glasses", "spy": "Optics" },
  { "common": "Keychain", "spy": "Key fob" },
  { "common": "Wallet", "spy": "ID pouch" },
  { "common": "Ticket", "spy": "Pass" },
  { "common": "Plane", "spy": "Aircraft" },
  { "common": "Train", "spy": "Rail conveyance" },
  { "common": "Bus", "spy": "Transport unit" },
  { "common": "Bike", "spy": "Cycle" },
  { "common": "Road", "spy": "Route" },
  { "common": "Bridge", "spy": "Crossing" },
  { "common": "River", "spy": "Waterway" },
  { "common": "Mountain", "spy": "High ground" },
  { "common": "Forest", "spy": "Woodland" },
  { "common": "Beach", "spy": "Coastal zone" },
  { "common": "City", "spy": "Urban area" },
  { "common": "Town", "spy": "Local hub" },
  { "common": "Village", "spy": "Outpost" },
  { "common": "Field", "spy": "Ground zone" },
  { "common": "Park", "spy": "Zone green" },
  { "common": "Hospital", "spy": "Medical center" },
  { "common": "School", "spy": "Training facility" },
  { "common": "Mall", "spy": "Shopping plaza" },
  { "common": "Market", "spy": "Trade hub" },
  { "common": "Restaurant", "spy": "Dining spot" },
  { "common": "Cafe", "spy": "Coffee joint" },
  { "common": "Bar", "spy": "Lounge" },
  { "common": "Pub", "spy": "Ale house" },
  { "common": "Cinema", "spy": "Viewing room" },
  { "common": "Stadium", "spy": "Event arena" },
  { "common": "Gym", "spy": "Training center" },
  { "common": "Pool", "spy": "Aqua unit" },
  { "common": "Beach", "spy": "Shore zone" },
  { "common": "Hotel", "spy": "Lodging" },
  { "common": "Hostel", "spy": "Sleeper base" },
  { "common": "Airport", "spy": "Air terminal" },
  { "common": "Station", "spy": "Transit hub" },
  { "common": "Garage", "spy": "Vehicle bay" },
  { "common": "Factory", "spy": "Industrial site" },
  { "common": "Office", "spy": "HQ" },
  { "common": "Warehouse", "spy": "Depot" },
  { "common": "Bank", "spy": "Financial vault" },
  { "common": "Library", "spy": "Intel archive" },
  { "common": "Message", "spy": "Comms" },
  { "common": "Email", "spy": "E-comms" },
  { "common": "Text", "spy": "SMS" },
  { "common": "Letter", "spy": "Dispatch" },
  { "common": "Photo", "spy": "Snap" },
  { "common": "Video", "spy": "Footage" },
  { "common": "Sound", "spy": "Audio intel" },
  { "common": "Camera", "spy": "Recorder" },
  { "common": "Mic", "spy": "Audio rig" },
  { "common": "Computer", "spy": "Terminal" },
  { "common": "Router", "spy": "Net node" },
  { "common": "Cable", "spy": "Wire link" },
  { "common": "Battery", "spy": "Power cell" },
  { "common": "Charger", "spy": "Power unit" },
  { "common": "Filter", "spy": "Screen" },
  { "common": "Helmet", "spy": "Protection gear" },
  { "common": "Vest", "spy": "Protective vest" },
  { "common": "Glove", "spy": "Hand gear" },
  { "common": "Scarf", "spy": "Neck wrap" },
  { "common": "Coat", "spy": "Outerwear" },
  { "common": "Bag", "spy": "Carry pack" },
  { "common": "Suit", "spy": "Disguise" },
  { "common": "Tie", "spy": "Formal strip" },
  { "common": "Shoes", "spy": "Gearfoot" },
  { "common": "Socks", "spy": "Foot padding" },
  { "common": "Glasses", "spy": "Vision aid" },
  { "common": "Watch", "spy": "Time device" },
  { "common": "Ring", "spy": "Band" },
  { "common": "Bracelet", "spy": "Wrist item" },
  { "common": "Necklace", "spy": "Pendant" },
  { "common": "Money", "spy": "Credits" },
  { "common": "Card", "spy": "Access card" },
  { "common": "Ticket", "spy": "Entry pass" },
  { "common": "Passport", "spy": "ID doc" },
  { "common": "Badge", "spy": "ID badge" },
  { "common": "Shadow", "spy": "Cover" },
  { "common": "Light", "spy": "Luminescence" },
  { "common": "Night", "spy": "Dark hours" },
  { "common": "Day", "spy": "Light cycle" },
  { "common": "Sun", "spy": "Primary star" },
  { "common": "Moon", "spy": "Satellite" },
  { "common": "Star", "spy": "Celestial body" },
  { "common": "Sky", "spy": "Airspace" },
  { "common": "Cloud", "spy": "Air mass" },
  { "common": "Rain", "spy": "Precipitation" },
  { "common": "Storm", "spy": "Weather event" },
  { "common": "Wind", "spy": "Air current" },
  { "common": "Snow", "spy": "Frozen precip" },
  { "common": "Fire", "spy": "Flame" },
  { "common": "Smoke", "spy": "Aerosol" },
  { "common": "Dust", "spy": "Particulate" },
  { "common": "Stone", "spy": "Rock" },
  { "common": "Sand", "spy": "Granules" },
  { "common": "Gold", "spy": "Precious metal" },
  { "common": "Silver", "spy": "White metal" },
  { "common": "Copper", "spy": "Red metal" },
  { "common": "Iron", "spy": "Metal alloy" },
  { "common": "Steel", "spy": "Alloy" },
  { "common": "Glass", "spy": "Transparent solid" },
  { "common": "Wood", "spy": "Timber" },
  { "common": "Paper", "spy": "Document sheet" },
  { "common": "Plastic", "spy": "Polymer" },
  { "common": "Rubber", "spy": "Elastomer" },
  { "common": "Oil", "spy": "Lubricant" },
  { "common": "Gas", "spy": "Fuel" },
  { "common": "Electricity", "spy": "Power grid" },
  { "common": "Magnet", "spy": "Magnetic force" },
  { "common": "Battery", "spy": "Energy cell" },
  { "common": "Wire", "spy": "Conductor" },
  { "common": "Signal", "spy": "Transmission" },
  { "common": "Code", "spy": "Cipher" },
  { "common": "Lock", "spy": "Security mech" },
  { "common": "Safe", "spy": "Vault" },
  { "common": "Tool", "spy": "Kit" },
  { "common": "Knife", "spy": "Blade" },
  { "common": "Spoon", "spy": "Utensil" },
  { "common": "Fork", "spy": "Tine tool" },
  { "common": "Plate", "spy": "Dish" },
  { "common": "Cup", "spy": "Vessel" },
  { "common": "Glass", "spy": "Cup" },
  { "common": "Bottle", "spy": "Container" },
  { "common": "Jar", "spy": "Canister" },
  { "common": "Box", "spy": "Crate" },
  { "common": "Chair", "spy": "Seat" },
  { "common": "Table", "spy": "Flat surface" },
  { "common": "Bed", "spy": "Sleeping unit" },
  { "common": "Pillow", "spy": "Headrest" },
  { "common": "Blanket", "spy": "Covering" },
  { "common": "Curtain", "spy": "Window cover" },
  { "common": "Floor", "spy": "Ground" },
  { "common": "Wall", "spy": "Barrier" },
  { "common": "Ceiling", "spy": "Overhead" },
  { "common": "Roof", "spy": "Top cover" },
  { "common": "Pipe", "spy": "Conduit" },
  { "common": "Cable", "spy": "Line" },
  { "common": "Fan", "spy": "Air mover" },
  { "common": "Heater", "spy": "Heat unit" },
  { "common": "AC", "spy": "Cooling unit" }
]



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
  const [remainingPairs, setRemainingPairs] = useState([...moreWordPairs]);
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

  const getNextPair = () => {
  if (remainingPairs.length === 0) {
    setRemainingPairs([...moreWordPairs]); // reset if exhausted
  }

  const index = Math.floor(Math.random() * remainingPairs.length);
  const pair = remainingPairs[index];
  setRemainingPairs(prev => prev.filter((_, i) => i !== index));
  return pair;
};

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
    if (total > 20) {
      toast({
        title: "Too Many Players",
        description: "Maximum allowed players is 20.",
        variant: "destructive"
      });
      return;
    }

    setPlayerNamesForm(Array.from({ length: total }, (_, i) => `Player ${i + 1}`));
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
const selectedPair = getNextPair();

    
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
  description: `${playerNamesForm.length} players, ${spyPlayers.size} ${spyPlayers.size === 1 ? 'spy' : 'spies'}. Pass to ${playerNamesForm[0]}.`,
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
                    max="20"
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

  if (gameState.gamePhase === "complete") {
    const handleNewWord = () => {
      // Randomly select new word pair
      const selectedPair = getNextPair();

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
        timeLeft: 300
      }));
    };
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
              </div>
              <Button
                onClick={handleNewWord}
                variant="default"
                size="lg"
                className="w-full mb-2"
              >
                New Word
              </Button>
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

  return null; // fallback if gamePhase !== "complete"
};

export default SpyGame;
