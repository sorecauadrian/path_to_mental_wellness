import React, { useEffect } from 'react';
import { HappyMoment } from '../types/types';
import { useImageSearch } from '../hooks/useImageSearch';
import wildcats from '../assets/images/wildcats.jpeg';

interface Props {
  moment: HappyMoment;
  onClick: () => void;
}

const WouldYouRatherCard: React.FC<Props> = ({ moment, onClick }) => {
  const { imageUrl, fetchImage } = useImageSearch();

  useEffect(() => {
    fetchImage(moment.text);
  }, [moment.text, fetchImage]);

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-between p-8 bg-secondary-light bg-cover bg-center rounded-3xl shadow-lg 
                 hover:shadow-xl transition-all duration-300 w-full max-w-xl mx-auto 
                 border-4 border-transparent hover:border-primary-light group h-96" // Increase height of the card
      style={{ backgroundImage: `url(${imageUrl || wildcats})` }}
    >
      <button className="w-32 h-32 text-primary-light mb-8 group-hover:scale-110 transition-transform duration-300" /> {/* Bigger inner button */}
      <p className="text-center font-semibold group-hover:text-primary-light transition-colors duration-300 
                   bg-black/50 p-1 rounded-lg text-gray-200 overflow-hidden"
                   style={{ fontSize: 'clamp(0.875rem, 4vw, 1.5rem)' }} // Smaller font size
      >
        {moment.text}
      </p>
    </button>
  );
};

export default WouldYouRatherCard;
