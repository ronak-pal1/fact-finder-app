import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import {
  Bell2Icon,
  BookEducationOutlineIcon,
  CommentsIcon,
  FaceAgentIcon,
} from "./svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const { navigation } = props;

  const {learner} = useSelector((state: RootState) => state.auth);

  const menuItems = [
    {
      name: "Book a Session",
      route: "session-booking",
      icon: <CommentsIcon />,
    },
    {
      name: "Switch to Agent",
      route: "learning-modules",
      icon: <FaceAgentIcon />,
    },
    { name: "Need Help?", route: "module-screen", icon: <Bell2Icon /> },
    { name: "Plans", route: "plans", icon: <BookEducationOutlineIcon /> },
    {
      name: "Profile",
      route: "profile",
      icon: <Ionicons name="person-outline" size={24} color="#6C7072" />,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 pt-10">
      {/* Header */}
      <View className="px-4 mb-6 flex-row items-center justify-between border-b border-gray-300 pb-4">
        <View className="flex-row items-center">
          <Image
            source={require("@/assets/images/user-image.png")}
            className="w-14 h-14 rounded-full mr-4"
          />
          <View className="gap-y-1">
            <CustomText className="text-lg" weight="bold">
              {learner?.name || "Ronak Paul"}
            </CustomText>
            <Text className="">Learner</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <EvilIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View className="px-2">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between px-4 py-4 mb-2"
            onPress={() => navigation.navigate(item.route)}
          >
            <View className="flex-row items-center gap-x-4">
              {item.icon}
              <Text className="text-gray-700 text-xl">{item.name}</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#4B5563" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
