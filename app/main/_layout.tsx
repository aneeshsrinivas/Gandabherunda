import { FontAwesome5 } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';

export default function DrawerLayout() {
    return (
        // @ts-ignore
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: COLORS.primary,
                    headerTitleStyle: {
                        fontWeight: '600',
                        fontSize: 18,
                    },
                    drawerActiveTintColor: COLORS.primary,
                    drawerInactiveTintColor: COLORS.black,
                    drawerLabelStyle: {
                        marginLeft: 5,
                        fontSize: 16,
                        fontWeight: '500',
                    },
                }}
            >
                <Drawer.Screen
                    name="(tabs)"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Sode Matha',
                        headerShown: false,
                        drawerIcon: ({ color }: { color: string }) => <FontAwesome5 name="home" size={20} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="artefacts"
                    options={{
                        drawerLabel: 'Artefacts',
                        title: 'Sacred Artefacts',
                        drawerIcon: ({ color }: { color: string }) => <FontAwesome5 name="landmark" size={20} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="quiz"
                    options={{
                        drawerLabel: 'Quiz',
                        title: 'Dharma Quiz',
                        drawerIcon: ({ color }: { color: string }) => <FontAwesome5 name="question-circle" size={20} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="learn"
                    options={{
                        drawerLabel: 'Learn',
                        title: 'Learning Center',
                        drawerIcon: ({ color }: { color: string }) => <FontAwesome5 name="video" size={20} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="leaderboard"
                    options={{
                        drawerLabel: 'Leaderboard',
                        title: 'Leaderboard',
                        drawerIcon: ({ color }: { color: string }) => <FontAwesome5 name="trophy" size={20} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="darshan"
                    options={{
                        drawerLabel: 'Darshan',
                        title: 'Darshan',
                        drawerIcon: ({ color }: { color: string }) => <FontAwesome5 name="eye" size={20} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="connect"
                    options={{
                        drawerLabel: 'Connect',
                        title: 'Connect',
                        drawerIcon: ({ color }: { color: string }) => <FontAwesome5 name="users" size={20} color={color} />,
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
