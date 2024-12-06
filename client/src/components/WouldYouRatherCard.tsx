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
      className="flex flex-col items-center p-24 bg-secondary-light rounded-xl shadow-lg 
                 hover:shadow-xl transition-all duration-300 w-full max-w-md mx-auto 
                 border-4 border-transparent hover:border-primary-light group"
    >
      <Sparkles className="w-8 h-8 text-primary-light mb-4 group-hover:scale-110 transition-transform duration-300" />
      <p className="text-lg text-gray-200 text-center font-medium group-hover:text-primary-light transition-colors duration-300">
        {moment.text}
      </p>
    </button>
  );
};

export default WouldYouRatherCard;