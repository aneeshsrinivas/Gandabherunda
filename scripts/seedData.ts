import {
    doc,
    setDoc,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const seedData = async () => {
    console.log('Starting to seed data...');

    const events = [
        {
            id: 'event1',
            title: 'Magh Shudha Dwadashi Aradhane',
            description: 'Annual celebration of Sri Vadiraja Swamiji Aradhane at Sode',
            date: Timestamp.fromDate(new Date('2026-02-15')),
            location: 'Sode Vadiraja Matha',
            category: 'Aradhane',
            isActive: true,
        },
        {
            id: 'event2',
            title: 'Paryaya 2026 Celebrations',
            description: 'Biennial Paryaya celebration at Udupi',
            date: Timestamp.fromDate(new Date('2026-01-18')),
            location: 'Udupi Sri Krishna Matha',
            category: 'Paryaya',
            isActive: true,
        },
        {
            id: 'event3',
            title: 'Youth Spiritual Camp',
            description: 'Annual youth camp for spiritual learning and development',
            date: Timestamp.fromDate(new Date('2026-05-10')),
            location: 'Sode Vadiraja Matha',
            category: 'Camp',
            isActive: true,
        },
    ];

    const artefacts = [
        {
            id: 'art1',
            name: 'Sri Krishna Idol',
            category: 'Idols',
            description: 'Ancient brass idol of Lord Krishna used in daily worship',
            history: 'This idol has been worshipped for over 400 years at the Matha',
            significance: 'The deity is believed to bestow blessings on all devotees',
            year: '16th Century',
        },
        {
            id: 'art2',
            name: 'Vadiraja Stotra Manuscript',
            category: 'Manuscripts',
            description: 'Original handwritten manuscript of Sri Vadiraja compositions',
            history: 'Written by the disciples of Sri Vadiraja Tirtha himself',
            significance: 'Contains rare and unpublished verses',
            year: '1575 AD',
        },
        {
            id: 'art3',
            name: 'Silver Puja Thali',
            category: 'Puja Items',
            description: 'Ornate silver thali used in temple rituals',
            history: 'Donated by a devotee during the 18th century',
            significance: 'Used during special festivals and occasions',
            year: '18th Century',
        },
        {
            id: 'art4',
            name: 'Hayagriva Idol',
            category: 'Idols',
            description: 'Sacred Hayagriva deity idol worshipped by Sri Vadiraja',
            history: 'Sri Vadiraja received this idol as divine grace',
            significance: 'Believed to enhance wisdom and learning',
            year: '15th Century',
        },
    ];

    const quizCategories = [
        { id: 'cat1', title: 'Matha History', icon: 'landmark', questionCount: 25, color: '#FF9933' },
        { id: 'cat2', title: 'Guru Parampara', icon: 'users', questionCount: 20, color: '#138808' },
        { id: 'cat3', title: 'Scriptures', icon: 'book', questionCount: 30, color: '#D4AF37' },
        { id: 'cat4', title: 'Festivals', icon: 'star', questionCount: 15, color: '#17A2B8' },
        { id: 'cat5', title: 'Sri Vadiraja', icon: 'crown', questionCount: 20, color: '#FFC107' },
    ];

    const quizQuestions = [
        {
            id: 'q1',
            categoryId: 'cat1',
            question: 'When was Sode Vadiraja Matha established?',
            options: ['14th Century', '15th Century', '16th Century', '17th Century'],
            correctAnswer: 2,
            difficulty: 'easy',
            points: 10,
        },
        {
            id: 'q2',
            categoryId: 'cat1',
            question: 'Where is Sode Vadiraja Matha located?',
            options: ['Udupi', 'Sode', 'Mangalore', 'Dharwad'],
            correctAnswer: 1,
            difficulty: 'easy',
            points: 10,
        },
        {
            id: 'q3',
            categoryId: 'cat5',
            question: 'What year did Sri Vadiraja Tirtha enter Brindavana?',
            options: ['1590', '1595', '1600', '1605'],
            correctAnswer: 2,
            difficulty: 'medium',
            points: 15,
        },
        {
            id: 'q4',
            categoryId: 'cat5',
            question: 'Which deity did Sri Vadiraja Tirtha worship especially?',
            options: ['Vishnu', 'Hayagriva', 'Krishna', 'Rama'],
            correctAnswer: 1,
            difficulty: 'easy',
            points: 10,
        },
        {
            id: 'q5',
            categoryId: 'cat3',
            question: 'Who composed the Rukminisha Vijaya?',
            options: ['Madhwacharya', 'Vadiraja Tirtha', 'Raghavendra Swamy', 'Vyasaraja'],
            correctAnswer: 1,
            difficulty: 'medium',
            points: 15,
        },
    ];

    const learnContent = [
        {
            id: 'learn1',
            title: 'Vadiraja Stuti',
            type: 'stotra',
            description: 'Sacred hymn praising Sri Vadiraja Tirtha',
            duration: '8 mins',
            order: 1,
        },
        {
            id: 'learn2',
            title: 'Introduction to Madhwa Philosophy',
            type: 'pravachana',
            description: 'Understanding the basics of Dvaita philosophy',
            duration: '45 mins',
            order: 2,
        },
        {
            id: 'learn3',
            title: 'Bhagavad Gita Chapter 1',
            type: 'scripture',
            description: 'Arjuna Vishada Yoga - The Yoga of Despair',
            duration: '25 mins',
            order: 3,
        },
        {
            id: 'learn4',
            title: 'Life of Sri Vadiraja',
            type: 'video',
            description: 'Documentary on the life and teachings',
            duration: '30 mins',
            order: 4,
        },
    ];

    try {
        for (const event of events) {
            await setDoc(doc(db, 'events', event.id), event);
        }
        console.log('Events seeded');

        for (const artefact of artefacts) {
            await setDoc(doc(db, 'artefacts', artefact.id), artefact);
        }
        console.log('Artefacts seeded');

        for (const cat of quizCategories) {
            await setDoc(doc(db, 'quizCategories', cat.id), cat);
        }
        console.log('Quiz categories seeded');

        for (const q of quizQuestions) {
            await setDoc(doc(db, 'quizQuestions', q.id), q);
        }
        console.log('Quiz questions seeded');

        for (const content of learnContent) {
            await setDoc(doc(db, 'learnContent', content.id), content);
        }
        console.log('Learn content seeded');

        console.log('All data seeded successfully!');
        return true;
    } catch (error) {
        console.error('Error seeding data:', error);
        return false;
    }
};

export default seedData;
