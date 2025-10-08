import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { BellIcon, MenuIcon } from "./svg-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, usePathname } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function MainCustomHeader() {
  const navigation = useNavigation();
  const pathname = usePathname();

  // Check if we're on the home screen
  const isHomeScreen = pathname === "/home";

  const handlePress = () => {
    if (isHomeScreen) {
      navigation.dispatch(DrawerActions.openDrawer());
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 22,
        paddingHorizontal: 16,
        backgroundColor: "#F4F4F4",
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        {isHomeScreen ? (
          <MenuIcon width="26" height="26" />
        ) : (
          <Entypo name="chevron-small-left" size={30} color="black" />
        )}
      </TouchableOpacity>

      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 15 }}
      >
        <BellIcon width="26" height="26" />

        <View style={{ position: "relative" }}>
          <Image
            source={require("@/assets/images/user-image.png")}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />

          <Image
            source={require("@/assets/icons/verified.png")}
            resizeMode="contain"
            style={{
              width: 15,
              height: 15,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
}
