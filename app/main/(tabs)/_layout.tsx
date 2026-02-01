import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: { color: string }) => <FontAwesome5 name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => <FontAwesome5 name="user" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="event-calendar"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }: { color: string }) => <FontAwesome5 name="calendar" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }: { color: string }) => <FontAwesome5 name="book" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="room-booking"
        options={{
          title: 'Booking',
          tabBarIcon: ({ color }: { color: string }) => <FontAwesome5 name="bed" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
