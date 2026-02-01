import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF9933',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="darshan"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="eye" size={24} color={color} />,
          title: 'Darshan',
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="book-open" size={24} color={color} />,
          title: 'Learn',
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="hands-helping" size={24} color={color} />,
          title: 'Connect',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
