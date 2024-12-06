import React, { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
  onClose: () => void;
}

const AddMomentForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-secondary-light rounded-xl p-6 w-full max-w-md border border-primary-light/20">
        <h2 className="text-2xl font-bold mb-4 text-primary-light">Share Your Happy Moment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 h-32 resize-none bg-secondary-dark 
                     text-white border-primary-light/20 focus:border-primary-light 
                     focus:ring-1 focus:ring-primary-light outline-none"
            placeholder="Describe a moment that made you happy..."
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-light text-white rounded-lg 
                       hover:bg-primary-dark transition-colors"
            >
              Share Moment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMomentForm;