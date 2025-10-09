import CalendarPicker from "@/components/ui/CalendarPicker";
import CustomText from "@/components/ui/CustomText";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

const PickDate = () => {
  const navigation = useNavigation<any>();
  return (
    <View className="flex-1 bg-[#F4F4F4] px-6">
      <View className="mt-4">
        <CustomText className="text-4xl" weight="bold">
          Choose date & Time
        </CustomText>
      </View>

      <View className="my-10">
        <CalendarPicker />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("confirm-booking")}
        className="bg-[#F36454] w-full items-center py-4 rounded-2xl mt-8"
      >
        <Text className="text-xl text-white font-light">
          Confirm Date & Time
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickDate;
