import React, { useState } from 'react';

interface Props {
  onSubmit: (mood: string) => void;
  onClose: () => void;
}

const MoodSurvey: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');

  const handleSelectMood = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      onSubmit(selectedMood);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-secondary-light rounded-xl p-6 w-full max-w-md border border-primary-light/20">
        <h2 className="text-2xl font-bold mb-4 text-primary-light">How Are You Feeling?</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <button
              type="button"
              className={`w-full py-2 rounded-md text-white ${selectedMood === 'very_good' ? 'bg-green-500' : 'bg-gray-600'} hover:bg-green-400`}
              onClick={() => handleSelectMood('very_good')}
            >
              Very Good
            </button>
            <button
              type="button"
              className={`w-full py-2 rounded-md text-white ${selectedMood === 'good' ? 'bg-green-400' : 'bg-gray-600'} hover:bg-green-300`}
              onClick={() => handleSelectMood('good')}
            >
              Good
            </button>
            <button
              type="button"
              className={`w-full py-2 rounded-md text-white ${selectedMood === 'neutral' ? 'bg-yellow-500' : 'bg-gray-600'} hover:bg-yellow-400`}
              onClick={() => handleSelectMood('neutral')}
            >
              Neutral
            </button>
            <button
              type="button"
              className={`w-full py-2 rounded-md text-white ${selectedMood === 'bad' ? 'bg-red-500' : 'bg-gray-600'} hover:bg-red-400`}
              onClick={() => handleSelectMood('bad')}
            >
              Bad
            </button>
            <button
              type="button"
              className={`w-full py-2 rounded-md text-white ${selectedMood === 'very_bad' ? 'bg-red-700' : 'bg-gray-600'} hover:bg-red-500`}
              onClick={() => handleSelectMood('very_bad')}
            >
              Very Bad
            </button>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MoodSurvey;
