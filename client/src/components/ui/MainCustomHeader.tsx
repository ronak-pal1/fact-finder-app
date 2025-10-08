import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { BellIcon, MenuIcon } from "./svg-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function MainCustomHeader() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity onPress={openDrawer}>
        <MenuIcon width="26" height="26" />
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
