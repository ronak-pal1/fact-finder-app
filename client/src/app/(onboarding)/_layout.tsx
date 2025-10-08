import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding1" />
      <Stack.Screen name="onboarding2" />
    </Stack>
  );
}
