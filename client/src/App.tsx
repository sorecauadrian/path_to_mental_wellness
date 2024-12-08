import { useState, useEffect } from 'react';
import { useHappyMoments } from './hooks/useHappyMoments';
import WouldYouRatherCard from './components/WouldYouRatherCard';
import AddMomentForm from './components/AddMomentForm';
import MoodSurvey from './components/MoodSurvey';

function App() {
  const { currentPair, getRandomPair, addHappyMoment, voteForMoment } = useHappyMoments();
  const [showAddForm, setShowAddForm] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [selectedMoments, setSelectedMoments] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const [responses, setResponses] = useState<number>(0);
  const [showMoodSurvey, setShowMoodSurvey] = useState<boolean>(false);
  const [surveyShown, setSurveyShown] = useState<boolean>(false);

  useEffect(() => {
    if (!currentPair) {
      getRandomPair();
    }
  }, [currentPair, getRandomPair]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/generate-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedMoments }),
      });
  
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
  
      const data = await response.json();
      alert(`Generated Profile: ${data.profile}`);
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('An error occurred while generating your profile. Please try again later.');
    }
  };
  

  const handleVote = (id: string) => {
    if (!currentPair) return;

    const selectedMoment = currentPair.option1.id === id ? currentPair.option1 : currentPair.option2;

    voteForMoment(id);
    setRoundsPlayed(prev => prev + 1);
    setSelectedMoments(prev => [...prev, selectedMoment.text]);

    setResponses(prevResponses => {
      const newResponses = prevResponses + 1;

      if (newResponses % 12 === 0 && !surveyShown) {
        setShowMoodSurvey(true);
        setSurveyShown(true);
      }
      return newResponses;
    });
  };

  const handleAddMoment = (text: string) => {
    addHappyMoment(text);
  };

  useEffect(() => {
    if (roundsPlayed > 0 && roundsPlayed % 20 === 0) {
      setShowAddForm(true);
    }
  }, [roundsPlayed]);

  const handleMoodSubmit = (mood: string) => {
    console.log("User's mood:", mood);
    setShowMoodSurvey(false); 

    setSurveyShown(false);
  };

  if (!currentPair) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light to-secondary-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-light mb-2 flex items-center justify-center gap-2">
            <img src="cat.jpeg" className="w-8 h-8 text-primary-light" alt="Cat icon" />
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

        {roundsPlayed > 0 && roundsPlayed % 5 === 0 && !showAddForm && (
          <button
            className="mt-8 bg-primary-light text-secondary-dark py-2 px-4 rounded shadow-lg hover:bg-primary-dark"
            onClick={() => {
              setShowSummary(true);
              fetchProfile();
            }}
          >
            Generate my profile
          </button>
        )}

        {showMoodSurvey && (
          <MoodSurvey onSubmit={handleMoodSubmit} onClose={() => setShowMoodSurvey(false)} />
        )}

        <div className="text-center mt-4">
          <p>Total responses: {responses}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
