export type Tradesman = {
    _id: string;
    name: string;
    profile: string;
    idProof: string;
    userId: string;
    experience: number;
    category: string;
    location: {
        coordinates: [number, number];
        type: "Point";
    };
    configuration?: ConfigurationType;
    verificationStatus?: "pending" | "rejected" | "verified";
    isBlocked?: boolean;
};

export type ConfigurationType = {
    startingTime: string;
    endingTime: string;
    slotSize: number;
    bufferTime: number;
    workingDays: boolean[];
    services: {
        description: string;
        amount: string;
        slots: string;
    }[];
};

export type LocationType = {
    latitude: number;
    longitude: number;
};


export type PostType = {
    _id: string;
    text?: string;
    image?: string;
    date: Date;
    tradesmanId: string | { name: string; profile: string };
    likes?: string[];
};

export type ConversationType = {
    _id?: string;
    members: [string, string];
    lastMessage: string;
    unreadMessage: {
        user: string | null;
        count: number;
    };
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

export type BookingType = {
    _id: string;
    id?: string;
    userId: string | { _id: string; name: string; profile: string };
    tradesmanId:
        | string
        | {
              name: string;
              profile: string;
              _id: string;
          };
    bookingNumber: string;
    description: string;
    bookingDate: string;
    service: string;
    slots: string[];
    status: "booked" | "canceled" | "completed";
    address: {
        house: string;
        street: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
        location: {
            coordinates: [number, number];
            type: string;
        };
    };
    amount: number;
    paymentDetails: {
        status: "pending" | "success";
        date: string | null;
    };
    createdAt?: Date;
    updatedAt?: Date;
};

export type CommentType = {
    _id: string;
    postId: string;
    userId: {
        _id: string;
        name: string;
        profile: string;
    };
    comment: string;
    softDelete: boolean;
    replies: {
        userId: {
            _id: string;
            name: string;
            profile: string;
        };
        comment: string;
        createdAt: string;
    }[];
    createdAt: string;
};

export interface Invoice {
    _id?: string;
    id?: string;
    particulars: {
        description: "string";
        amount: number;
        quantity: number;
    }[];
    total: number;
    status: "pending" | "paid";
    bookingId: string | string;
    invoiceNumber: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ReviewType {
    _id: string;
    review: string;
    rating: number;
    tradesmanId: string | {
        _id:string
        name:string,
        profile:string
    };
    bookingId: string;
    userId:string| {
        _id:string
        name:string,
        profile:string
    } ;
    createdAt: Date;
    updatedAt?: Date;
}
