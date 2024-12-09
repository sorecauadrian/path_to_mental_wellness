import { useState } from 'react';

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

export default FeedbackForm;