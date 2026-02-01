import {
    signOut as firebaseSignOut,
    User as FirebaseUser,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { firestoreService } from './firestore';

let verificationId: string | null = null;

export const authService = {
    async sendOTP(phoneNumber: string): Promise<boolean> {
        try {
            console.log('OTP would be sent to:', phoneNumber);
            verificationId = 'mock-verification-id';
            return true;
        } catch (error) {
            console.error('Error sending OTP:', error);
            return false;
        }
    },

    async verifyOTP(otp: string, userId?: string): Promise<boolean> {
        try {
            console.log('Verifying OTP:', otp);
            if (otp.length === 6 && userId) {
                const existingUser = await firestoreService.getUser(userId);
                if (!existingUser) {
                    await firestoreService.createUser(userId, {
                        phoneNumber: '+91XXXXXXXXXX',
                        displayName: 'User',
                    });
                }
                return true;
            }
            return otp === '123456';
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return false;
        }
    },

    async signOut(): Promise<void> {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    },

    getCurrentUser(): FirebaseUser | null {
        return auth.currentUser;
    },

    onAuthStateChange(callback: (user: FirebaseUser | null) => void): () => void {
        return onAuthStateChanged(auth, callback);
    },
};

export default authService;
