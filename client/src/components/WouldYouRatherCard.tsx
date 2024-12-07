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
      className="flex flex-col items-center p-24 bg-secondary-light bg-cover bg-center rounded-3xl shadow-lg 
                 hover:shadow-xl transition-all duration-300 w-full max-w-xl mx-auto 
                 border-4 border-transparent hover:border-primary-light group"
      style={{backgroundImage: `url(${imageUrl || wildcats})`}}
    >
      
      <button className="w-16 h-16 text-primary-light mb-8 group-hover:scale-110 transition-transform duration-300" />
      <p className="text-3xl text-gray-200 text-center font-semibold group-hover:text-primary-light transition-colors duration-300 bg-black/50 p-4 rounded-lg">
        {moment.text}
      </p>
    </button>
  );
};

export default WouldYouRatherCard;