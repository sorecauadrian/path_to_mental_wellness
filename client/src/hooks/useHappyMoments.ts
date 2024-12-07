import { useState, useCallback } from 'react';
import { HappyMoment, WouldYouRatherPair } from '../types/types';
import initialHappyMoments from '../data/initialHappyMoments.json';

export const useHappyMoments = () => {
  const [happyMoments, setHappyMoments] = useState<HappyMoment[]>(initialHappyMoments);
  const [currentPair, setCurrentPair] = useState<WouldYouRatherPair | null>(null);

  const getRandomPair = useCallback(() => {
    const availableMoments = [...happyMoments];
    const index1 = Math.floor(Math.random() * availableMoments.length);
    const option1 = availableMoments.splice(index1, 1)[0];
    const index2 = Math.floor(Math.random() * availableMoments.length);
    const option2 = availableMoments[index2];

    setCurrentPair({ option1, option2 });
  }, [happyMoments]);

  const addHappyMoment = useCallback((text: string) => {
    const newMoment: HappyMoment = {
      id: Date.now().toString(),
      text,
      votes: 0,
    };
    setHappyMoments(prev => [...prev, newMoment]);
  }, []);

  const voteForMoment = useCallback((id: string) => {
    setHappyMoments(prev =>
      prev.map(moment =>
        moment.id === id ? { ...moment, votes: moment.votes + 1 } : moment
      )
    );
    getRandomPair();
  }, [getRandomPair]);

  return {
    happyMoments,
    currentPair,
    getRandomPair,
    addHappyMoment,
    voteForMoment,
  };
};