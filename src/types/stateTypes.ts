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
    isBlocked: boolean;
};

export type LocationType = {
    latitude: number;
    longitude: number;
};

export type ToolType = {
    _id: string;
    name: string;
    rent: number;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    location: {
        coordinates: [number, number];
        type: "Point";
    };
    userId: string;
    images: string[];
}

export type PostType = {
    _id:string,
    text?:string,
    image?:string,
    date:Date
    likes?:object[]
    comments?:object[]
}