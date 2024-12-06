import { useEffect, useState } from 'react';
import { useHappyMoments } from './hooks/useHappyMoments';
import WouldYouRatherCard from './components/WouldYouRatherCard';
import AddMomentForm from './components/AddMomentForm';
import { Sparkles } from 'lucide-react';

function App() {
  const { currentPair, getRandomPair, addHappyMoment, voteForMoment } = useHappyMoments();
  const [showAddForm, setShowAddForm] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  useEffect(() => {
    if (!currentPair) {
      getRandomPair();
    }
  }, [currentPair, getRandomPair]);

  const handleVote = (id: string) => {
    voteForMoment(id);
    setRoundsPlayed(prev => prev + 1);
  };

  const handleAddMoment = (text: string) => {
    addHappyMoment(text);
  };

  useEffect(() => {
    if (roundsPlayed > 0 && roundsPlayed % 5 === 0) {
      setShowAddForm(true);
    }
  }, [roundsPlayed]);

  if (!currentPair) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light to-secondary-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-light mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary-light" />
            Would You Rather?
          </h1>
          <p className="text-gray-300">Choose your preferred happy moment!</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <WouldYouRatherCard
            moment={currentPair.option1}
            onClick={() => handleVote(currentPair.option1.id)}
          />
          <WouldYouRatherCard
            moment={currentPair.option2}
            onClick={() => handleVote(currentPair.option2.id)}
          />
        </div>

        {showAddForm && (
          <AddMomentForm
            onSubmit={handleAddMoment}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;