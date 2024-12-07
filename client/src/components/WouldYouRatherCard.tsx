import React from 'react';
import { HappyMoment } from '../types/types';
import { Sparkles } from 'lucide-react';

interface Props {
  moment: HappyMoment;
  onClick: () => void;
}

const WouldYouRatherCard: React.FC<Props> = ({ moment, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-24 bg-secondary-light bg-cover bg-center rounded-3xl shadow-lg 
                 hover:shadow-xl transition-all duration-300 w-full max-w-xl mx-auto 
                 border-4 border-transparent hover:border-primary-light group"
      style={{ backgroundImage: "url(https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png)" }}
    >
      <Sparkles className="w-16 h-16 text-primary-light mb-8 group-hover:scale-110 transition-transform duration-300" />
      <p className="text-3xl text-gray-200 text-center font-semibold group-hover:text-primary-light transition-colors duration-300 bg-black/50 p-4 rounded-lg">
        {moment.text}
      </p>
    </button>
  );
};

export default WouldYouRatherCard;