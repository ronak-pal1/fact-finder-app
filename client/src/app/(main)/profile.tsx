import { AppDispatch, RootState } from "@/store";
import { logoutLearner } from "@/store/slices/authSlice";
import { router } from "expo-router";
import { View, Text, ToastAndroid, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await dispatch(logoutLearner());

      ToastAndroid.show("Logout successful", ToastAndroid.LONG);
      router.replace("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="w-full flex-1 h-full flex items-center justify-center">
      <TouchableOpacity 
        className="bg-red-500 px-10 py-3 rounded-xl" 
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text className="text-white text-xl font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
