import "../global.css";
import { Slot } from "expo-router";
import { useFonts } from "@expo-google-fonts/anonymous-pro/useFonts";
import { AnonymousPro_400Regular } from "@expo-google-fonts/anonymous-pro/400Regular";
import { AnonymousPro_700Bold } from "@expo-google-fonts/anonymous-pro/700Bold";
import { StatusBar as RNStatusBar, Platform } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Layout() {
  let [fontsLoaded] = useFonts({
    AnonymousPro_400Regular,
    AnonymousPro_700Bold,
  });

  useFocusEffect(
    React.useCallback(() => {
      RNStatusBar.setBarStyle("dark-content");
      RNStatusBar.setBackgroundColor("white");
      RNStatusBar.setTranslucent(true);
    }, [])
  );

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView className="flex-1">
      <Provider store={store}>
        <Slot />
      </Provider>
    </SafeAreaView>
  );
}
