import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  GraduationCapIcon,
  HomeIcon,
  ProfileIcon,
  ResourcesIcon,
} from "./svg-icons";

export default function CustomBottomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="overflow-hidden mb-1">
      <View className="flex-row justify-around py-7 bg-white">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.title || route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="items-center"
            >
              {route.name === "HomeTab" && (
                <HomeIcon color={isFocused ? "#3D8FEF" : "#D1D1D1"} />
              )}
              {route.name === "CoursesTab" && (
                <GraduationCapIcon color={isFocused ? "#3D8FEF" : "#D1D1D1"} />
              )}
              {route.name === "ResourcesTab" && (
                <ResourcesIcon color={isFocused ? "#3D8FEF" : "#D1D1D1"} />
              )}
              {route.name === "ProfileTab" && (
                <ProfileIcon color={isFocused ? "#3D8FEF" : "#D1D1D1"} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
