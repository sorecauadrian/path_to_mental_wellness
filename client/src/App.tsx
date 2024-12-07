import React, { useState, useEffect } from 'react';
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

  const [responses, setResponses] = useState<number>(0); // Răspunsuri
  const [showMoodSurvey, setShowMoodSurvey] = useState<boolean>(false); // MoodSurvey
  const [surveyShown, setSurveyShown] = useState<boolean>(false); // Verificăm dacă survey a fost deja arătat

  useEffect(() => {
    if (!currentPair) {
      getRandomPair();
    }
  }, [currentPair, getRandomPair]);

  const handleVote = (id: string) => {
    if (!currentPair) return;

    const selectedMoment = currentPair.option1.id === id ? currentPair.option1 : currentPair.option2;

    voteForMoment(id);
    setRoundsPlayed(prev => prev + 1);
    setSelectedMoments(prev => [...prev, selectedMoment.text]);

    // Incrementăm numărul de răspunsuri
    setResponses(prevResponses => {
      const newResponses = prevResponses + 1;

      // Dacă ajungem la un multiplu de 12 și survey nu a fost deja arătat
      if (newResponses % 12 === 0 && !surveyShown) {
        setShowMoodSurvey(true); // Arată MoodSurvey
        setSurveyShown(true); // Marchează că survey a fost arătat
      }
      return newResponses;
    });
  };

  const handleAddMoment = (text: string) => {
    addHappyMoment(text);
  };

  useEffect(() => {
    if (roundsPlayed > 0 && roundsPlayed % 5 === 0) {
      setShowAddForm(true);
    }
  }, [roundsPlayed]);

  const handleMoodSubmit = (mood: string) => {
    console.log("User's mood:", mood);
    setShowMoodSurvey(false);  // Închide MoodSurvey

    // Nu mai resetăm numărul de răspunsuri
    // Resetează doar flag-ul surveyShown
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
            onClick={() => setShowSummary(true)}
          >
            Vezi rezumatul alegerilor tale
          </button>
        )}

        {showSummary && (
          <div className="bg-secondary-light text-primary-dark p-4 rounded-lg mt-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Rezumatul momentelor tale alese:</h2>
            {selectedMoments.length === 0 ? (
              <p className="text-gray-500">Nu ai selectat încă momente.</p>
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
              Închide rezumatul
            </button>
          </div>
        )}

        {/* Afișează MoodSurvey doar după 12, 24, 36 răspunsuri etc. */}
        {showMoodSurvey && (
          <MoodSurvey onSubmit={handleMoodSubmit} onClose={() => setShowMoodSurvey(false)} />
        )}

        {/* Afișează numărul de răspunsuri */}
        <div className="text-center mt-4">
          <p>Total responses: {responses}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
