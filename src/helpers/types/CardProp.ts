export interface Section {
    name: string;
    completed: number;
    total: number;
  }
  
  export interface CardProps {
    image: string;
    title: string;
    answers: string;
    time: string;
    score: string;
    date: string;
    sections: Section[];
    buttonText: string;
    status: "confirmed" | "pending";
  }
  