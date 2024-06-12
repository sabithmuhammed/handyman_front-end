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
};

export type PostType = {
    _id: string;
    text?: string;
    image?: string;
    date: Date;
    likes?: object[];
    comments?: object[];
};

export type ConversationType = {
    _id?: string;
    members: [string, string];
    lastMessage: string;
    tradesmanId: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type ReceiverType = { receiverId: string; image: string; name: string };

export type MessageType = {
    _id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    message: {
        type: "audio" | "image" | "text";
        content: string;
    };
    status: "sent" | "recieved" | "seen";
    createdAt?: Date;
    updatedAt: Date;
};
