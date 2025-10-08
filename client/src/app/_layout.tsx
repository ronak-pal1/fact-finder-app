import "../global.css";
import { Slot } from "expo-router";
import { useFonts } from "@expo-google-fonts/anonymous-pro/useFonts";
import { AnonymousPro_400Regular } from "@expo-google-fonts/anonymous-pro/400Regular";
import { AnonymousPro_700Bold } from "@expo-google-fonts/anonymous-pro/700Bold";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function Layout() {
  let [fontsLoaded] = useFonts({
    AnonymousPro_400Regular,
    AnonymousPro_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView className="flex-1">
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <Slot />
    </SafeAreaView>
  );
}
