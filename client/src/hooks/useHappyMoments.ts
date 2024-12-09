import { useState, useCallback, useEffect } from 'react';
import Papa from 'papaparse';
import { HappyMoment, WouldYouRatherPair } from '../types/types';

export const useHappyMoments = () => {
  const [happyMoments, setHappyMoments] = useState<HappyMoment[]>([]);
  const [currentPair, setCurrentPair] = useState<WouldYouRatherPair | null>(null);
  
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch('./data/happyMoments.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch the CSV file');
        }
        const csvText = await response.text();

        Papa.parse<HappyMoment>(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          complete: (results) => {

            const typedData: HappyMoment[] = results.data.map((row: any) => ({
              id: row.hmid,
              text: row.cleaned_hm,
              category: row.predicted_category,
            }));

            if (typedData.length > 0) {
              setHappyMoments(typedData);
            } else {
              console.error('No data parsed from CSV');
            }
          },
          error: () => {
            console.error('CSV Parsing Error:');
          }
        });
      } catch (error) {
        console.error('Error loading CSV:', error);
      }
    };

    loadCSV();
  }, []);

  const getRandomPair = useCallback(() => {
    if (happyMoments.length < 2) {
      console.warn('Not enough happy moments to create a pair');
      return;
    }

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
      category: 'personal',
    };
    setHappyMoments(prev => [...prev, newMoment]);
  }, []);

  const voteForMoment = useCallback((id: string) => {
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