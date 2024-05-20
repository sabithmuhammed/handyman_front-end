export type Tradesman = {
    name: string;
    profile: string;
    idProof?: string;
    wage: {
        amount: number;
        type: string;
    };
    skills: string[];
    experience: number;
    location: [number, number];
    rating: number;
    _id: string;
};
