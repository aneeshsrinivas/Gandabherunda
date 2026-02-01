import {
    collection,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    Query,
    setDoc,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface User {
    id: string;
    phoneNumber: string;
    displayName: string;
    email?: string;
    photoURL?: string;
    points: number;
    quizzesTaken: number;
    streak: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: Timestamp;
    location: string;
    imageUrl?: string;
    category: string;
    isActive: boolean;
}

export interface RoomBooking {
    id: string;
    userId: string;
    userName: string;
    phoneNumber: string;
    roomType: string;
    checkIn: Timestamp;
    checkOut: Timestamp;
    guests: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Timestamp;
}

export interface Artefact {
    id: string;
    name: string;
    category: string;
    description: string;
    history: string;
    significance: string;
    year: string;
    imageUrl?: string;
    audioUrl?: string;
}

export interface QuizCategory {
    id: string;
    title: string;
    icon: string;
    questionCount: number;
    color: string;
}

export interface QuizQuestion {
    id: string;
    categoryId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
}

export interface QuizResult {
    id: string;
    userId: string;
    categoryId: string;
    score: number;
    totalQuestions: number;
    completedAt: Timestamp;
}

export interface LearnContent {
    id: string;
    title: string;
    type: 'pravachana' | 'scripture' | 'stotra' | 'video';
    description: string;
    duration: string;
    contentUrl?: string;
    thumbnailUrl?: string;
    order: number;
}

export interface Donation {
    id: string;
    userId: string;
    amount: number;
    purpose: string;
    transactionId: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Timestamp;
}

const COLLECTIONS = {
    USERS: 'users',
    EVENTS: 'events',
    ROOM_BOOKINGS: 'roomBookings',
    ARTEFACTS: 'artefacts',
    QUIZ_CATEGORIES: 'quizCategories',
    QUIZ_QUESTIONS: 'quizQuestions',
    QUIZ_RESULTS: 'quizResults',
    LEARN_CONTENT: 'learnContent',
    DONATIONS: 'donations',
};

export const firestoreService = {
    async getUser(userId: string): Promise<User | null> {
        const docRef = doc(db, COLLECTIONS.USERS, userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as User) : null;
    },

    async createUser(userId: string, userData: Partial<User>): Promise<void> {
        const docRef = doc(db, COLLECTIONS.USERS, userId);
        await setDoc(docRef, {
            ...userData,
            points: 0,
            quizzesTaken: 0,
            streak: 0,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });
    },

    async updateUser(userId: string, userData: Partial<User>): Promise<void> {
        const docRef = doc(db, COLLECTIONS.USERS, userId);
        await updateDoc(docRef, { ...userData, updatedAt: Timestamp.now() });
    },

    async getEvents(): Promise<Event[]> {
        const q = query(
            collection(db, COLLECTIONS.EVENTS),
            where('isActive', '==', true),
            orderBy('date', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
    },

    async createRoomBooking(booking: Omit<RoomBooking, 'id' | 'createdAt'>): Promise<string> {
        const docRef = doc(collection(db, COLLECTIONS.ROOM_BOOKINGS));
        await setDoc(docRef, { ...booking, createdAt: Timestamp.now() });
        return docRef.id;
    },

    async getUserBookings(userId: string): Promise<RoomBooking[]> {
        const q = query(
            collection(db, COLLECTIONS.ROOM_BOOKINGS),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as RoomBooking));
    },

    async getArtefacts(): Promise<Artefact[]> {
        const snapshot = await getDocs(collection(db, COLLECTIONS.ARTEFACTS));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artefact));
    },

    async getArtefact(artefactId: string): Promise<Artefact | null> {
        const docRef = doc(db, COLLECTIONS.ARTEFACTS, artefactId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Artefact) : null;
    },

    async getQuizCategories(): Promise<QuizCategory[]> {
        const snapshot = await getDocs(collection(db, COLLECTIONS.QUIZ_CATEGORIES));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as QuizCategory));
    },

    async getQuizQuestions(categoryId: string, difficulty: string): Promise<QuizQuestion[]> {
        const q = query(
            collection(db, COLLECTIONS.QUIZ_QUESTIONS),
            where('categoryId', '==', categoryId),
            where('difficulty', '==', difficulty),
            limit(10)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as QuizQuestion));
    },

    async saveQuizResult(result: Omit<QuizResult, 'id' | 'completedAt'>): Promise<void> {
        const docRef = doc(collection(db, COLLECTIONS.QUIZ_RESULTS));
        await setDoc(docRef, { ...result, completedAt: Timestamp.now() });
    },

    async getLeaderboard(limitCount: number = 10): Promise<User[]> {
        const q = query(
            collection(db, COLLECTIONS.USERS),
            orderBy('points', 'desc'),
            limit(limitCount)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
    },

    async getLearnContent(type?: string): Promise<LearnContent[]> {
        let q: Query<DocumentData>;
        if (type) {
            q = query(
                collection(db, COLLECTIONS.LEARN_CONTENT),
                where('type', '==', type),
                orderBy('order', 'asc')
            );
        } else {
            q = query(collection(db, COLLECTIONS.LEARN_CONTENT), orderBy('order', 'asc'));
        }
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as object) } as LearnContent));
    },

    async createDonation(donation: Omit<Donation, 'id' | 'createdAt'>): Promise<string> {
        const docRef = doc(collection(db, COLLECTIONS.DONATIONS));
        await setDoc(docRef, { ...donation, createdAt: Timestamp.now() });
        return docRef.id;
    },
};

export default firestoreService;
