import { useState, useEffect } from 'react';
import { useHappyMoments } from './hooks/useHappyMoments';
import WouldYouRatherCard from './components/WouldYouRatherCard';
import AddMomentForm from './components/AddMomentForm';
import MoodSurvey from './components/MoodSurvey';

const FeedbackForm = ({ onSubmit, onClose }: { onSubmit: (feedback: string) => void, onClose: () => void }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg max-w-lg w-full">
        <h2 className="text-xl text-white font-bold mb-4">Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
          placeholder="Your feedback..."
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-primary-light text-secondary-dark py-2 px-4 rounded-lg hover:bg-primary-dark"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { currentPair, getRandomPair, addHappyMoment, voteForMoment } = useHappyMoments();
  const [showAddForm, setShowAddForm] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [selectedMoments, setSelectedMoments] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const [responses, setResponses] = useState<number>(0); // Răspunsuri
  const [showMoodSurvey, setShowMoodSurvey] = useState<boolean>(false); // MoodSurvey
  const [surveyShown, setSurveyShown] = useState<boolean>(false); // Verificăm dacă survey a fost deja arătat

  // State pentru butonul de feedback
  const [showFeedbackButton, setShowFeedbackButton] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

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

  // Funcție de deschidere și închidere a formularului de feedback
  const handleFeedbackSubmit = (feedback: string) => {
    console.log("User feedback:", feedback);
    setShowFeedbackForm(false); // Închide formularul de feedback după submit
  };

  const handleFeedbackButtonClick = () => {
    setShowFeedbackButton(false); // Ascunde butonul de feedback după ce este apăsat
    setShowFeedbackForm(true); // Arată formularul de feedback
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
            View your answers
          </button>
        )}

        {showSummary && (
          <div className="bg-secondary-light text-primary-dark p-4 rounded-lg mt-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your answers:</h2>
            {selectedMoments.length === 0 ? (
              <p className="text-gray-500">You didn't selected any moments.</p>
            ) : (
              <ul className="list-disc pl-6 space-y-2">
                {selectedMoments.map((moment, index) => (
                  <li key={index}>{moment}</li>
                ))}
              </ul>
            )}
            <button
              className="mt-4 bg-primary-light text-secondary-dark py-2 px-4 rounded shadow-lg hover:bg-primary-dark"
              onClick={() => setShowSummary(false)}
            >
              Close
            </button>
          </div>
        )}

        {/* Afișează MoodSurvey doar după 12, 24, 36 răspunsuri etc. */}
        {showMoodSurvey && (
          <MoodSurvey onSubmit={handleMoodSubmit} onClose={() => setShowMoodSurvey(false)} />
        )}

        <div className="text-center mt-4">
          <p>Total responses: {responses}</p>
        </div>

        {/* Butonul de feedback */}
        {showFeedbackButton && (
          <button
            className="fixed top-4 right-4 bg-primary-light text-secondary-dark py-2 px-4 rounded-full shadow-lg hover:bg-primary-dark"
            onClick={handleFeedbackButtonClick}
          >
            Feedback
          </button>
        )}

        {/* Formularul de feedback */}
        {showFeedbackForm && (
          <FeedbackForm onSubmit={handleFeedbackSubmit} onClose={() => setShowFeedbackForm(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
