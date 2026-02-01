import { Stack } from 'expo-router';

export default function DarshanLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Darshan' }} />
    </Stack>
  );
}
