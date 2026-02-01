import { Stack } from 'expo-router';

export default function ConnectLayout() {
  return (
    <Stack>
      <Stack.Screen name="event-calendar" options={{ title: 'Event Calendar' }} />
      <Stack.Screen name="room-booking" options={{ title: 'Room Booking' }} />
    </Stack>
  );
}
