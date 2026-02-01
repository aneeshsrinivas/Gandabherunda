# Sode Sri Vadiraja Matha Mobile App

A comprehensive mobile application for Sode Sri Vadiraja Matha built with React Native and Expo.

## Project Status

**Current Version:** 1.0.0  
**Framework:** Expo SDK 54  
**Status:** Development Complete, Ready for Testing

### Implemented Features

- Phone number authentication with OTP verification
- Drawer navigation with home, artefacts, quiz, learning center, leaderboard, darshan, and connect screens
- Event calendar with Panchanga information
- Devotee registration and profile management
- Room booking system
- History and Guru Parampara showcase
- Firebase Firestore integration for content management
- Responsive UI with spiritual theme (saffron and green)

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo Go app on your mobile device (for testing)
- Git (for version control)

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aneeshsrinivas/Gandabherunda.git
cd Gandabherunda-main
```

### 2. Install Dependencies

```bash
npm install
```

**Important:** This project uses package overrides to force specific versions of `react-native-worklets` and `react-native-worklets-core` to version 0.5.0 for compatibility with Expo SDK 54. These overrides are already configured in `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following Firebase configuration:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Note:** Contact the project maintainer for Firebase credentials or set up your own Firebase project.

### 4. Firebase Setup (Optional)

If setting up your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project named "Sode Matha App"
3. Add a Web app to the project
4. Copy the configuration values to your `.env` file
5. Enable the following services:
   - Authentication (Phone provider)
   - Firestore Database
   - Analytics (optional)

### 5. Run the Development Server

```bash
npm start
```

Alternatively, use:

```bash
npx expo start --go --clear
```

The `--clear` flag clears the Metro bundler cache, and `--go` automatically opens Expo Go on your device if available.

### 6. Test on Mobile Device

**Using Expo Go (Recommended):**

1. Download Expo Go from Google Play Store (Android) or App Store (iOS)
2. Open Expo Go app on your device
3. Scan the QR code displayed in your terminal
4. The app will load on your device

**Using Web Preview:**

```bash
npm run web
```

Or press `w` in the terminal after running `npm start`.

## Project Structure

```
Gandabherunda-main/
├── app/
│   ├── main/
│   │   ├── (tabs)/           # Tab navigator screens
│   │   │   ├── home.tsx
│   │   │   ├── profile.tsx
│   │   │   ├── event-calendar.tsx
│   │   │   ├── history.tsx
│   │   │   └── room-booking.tsx
│   │   ├── artefacts.tsx     # Drawer screens
│   │   ├── quiz.tsx
│   │   ├── learn.tsx
│   │   ├── leaderboard.tsx
│   │   ├── darshan.tsx
│   │   ├── connect.tsx
│   │   └── _layout.tsx       # Drawer layout configuration
│   ├── login.tsx              # Authentication screen
│   └── _layout.tsx            # Root layout
├── components/
│   ├── Card.tsx               # Reusable card component
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Checkbox.tsx
├── config/
│   ├── firebase.ts            # Firebase configuration
│   └── api.ts                 # API endpoints
├── constants/
│   └── theme.ts               # Color scheme and styling
├── services/
│   ├── firestore.ts           # Firestore CRUD operations
│   └── auth.ts                # Authentication service
├── scripts/
│   └── seedData.ts            # Database seeding script
├── .env                       # Environment variables (do not commit)
├── package.json
└── README.md
```

## Technology Stack

- **Framework:** React Native with Expo SDK 54
- **Language:** TypeScript
- **Navigation:** Expo Router with Drawer and Tab navigators
- **Backend:** Firebase Authentication and Firestore
- **UI Components:** Custom components with FontAwesome5 icons
- **Date Handling:** @react-native-community/datetimepicker
- **Gestures:** react-native-gesture-handler
- **State Management:** React hooks (useState, useEffect)

## Key Dependencies

```json
{
  "expo": "~54.0.33",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-router": "~6.0.23",
  "firebase": "^12.8.0",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-reanimated": "4.1.1",
  "@react-navigation/drawer": "^7.5.0"
}
```

## Known Configuration Notes

### React Native Reanimated Compatibility

This project uses specific version overrides for animation libraries to ensure compatibility with Expo SDK 54:

- `react-native-worklets`: 0.5.0
- `react-native-worklets-core`: 0.5.0

These overrides are configured in `package.json` and should not be modified unless testing with a different Expo SDK version.

### Babel Configuration

The project includes the `react-native-reanimated/plugin` in `babel.config.js` to support animations and gestures.

## Troubleshooting

### Metro Bundler Cache Issues

If you encounter unexpected errors, clear the cache:

```bash
npx expo start --clear
```

### Node Process Issues

If the development server fails to start, terminate existing Node processes:

**Windows:**
```bash
taskkill /F /IM node.exe
```

**macOS/Linux:**
```bash
killall node
```

### Expo Go Version Mismatch

Ensure your Expo Go app is updated to the latest version from the app store to support Expo SDK 54.

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## Database Seeding

To populate the Firestore database with sample data:

1. Ensure Firebase is configured correctly
2. Run the seed script:

```bash
npx ts-node scripts/seedData.ts
```

This will create sample artefacts, events, quiz questions, and learning content.

## Building for Production

### Android APK Build

```bash
npm install -g eas-cli
eas build --platform android
```

### iOS Build (macOS only)

```bash
eas build --platform ios
```

## Contact

For questions or support, please contact the project maintainer.

## License

This project is developed for Sode Sri Vadiraja Matha. All rights reserved.
