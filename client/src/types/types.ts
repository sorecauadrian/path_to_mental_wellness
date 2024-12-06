export interface HappyMoment {
    id: string;
    text: string;
    votes: number;
  }
  
export interface WouldYouRatherPair {
    option1: HappyMoment;
    option2: HappyMoment;
  }