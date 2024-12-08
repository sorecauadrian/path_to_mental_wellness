import React, { useState } from 'react';

interface FeedbackFormProps {
  setShowFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ setShowFeedbackForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [complaint, setComplaint] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback primit:', { firstName, lastName, complaint });
    alert('Feedback-ul a fost trimis. Mulțumim!');
    setShowFeedbackForm(false); // Ascunde formularul după trimiterea feedback-ului
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4 text-black">Feedback</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border rounded w-full text-black"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded w-full text-black"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Complaint or suggestion"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="p-2 border rounded w-full text-black"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Submit
          </button>
        </div>
      </form>

      <button
        onClick={() => setShowFeedbackForm(false)} // Ascunde formularul de feedback
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        X
      </button>
    </div>
  );
};

export default FeedbackForm;
