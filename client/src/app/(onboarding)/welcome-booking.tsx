import { View, Image, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const WelcomeBooking = () => {
  const navigation = useNavigation<any>();
  return (
    <LinearGradient
      colors={["#fff", "#030C1A"]}
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1"
    >
      <View className="flex-1 relative">
        <Image
          source={require("@/assets/images/tutor-image.png")}
          className="w-full h-full"
          resizeMode="cover"
        />

        <Image
          source={require("@/assets/images/logo.png")}
          resizeMode="contain"
          className="w-[100px] h-[80px] absolute top-2 left-5"
        />

        <View className="absolute bottom-10 w-full px-10">
          <View className="w-full bg-white rounded-[30px] py-5 px-8 gap-y-6">
            <View className="gap-y-3">
              <CustomText className="text-4xl" weight="bold">
                Book one-on-one session now
              </CustomText>

              <CustomText className="text-lg">
                Get all the topics unlocked now and get help from the experts
              </CustomText>
            </View>

            <View className="gap-y-3">
              <TouchableOpacity
                onPress={() => {
                  router.navigate("/session-booking");
                }}
                className="w-full rounded-2xl bg-[#6B39F4] py-5 items-center justify-center"
              >
                <Text className="text-white text-xl font-semibold">
                  Book Now
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.push("/home");
                }}
                className="w-full rounded-2xl bg-[#DAD7D7] py-5 items-center justify-center border border-[#00000080]"
              >
                <Text className="text-black text-xl font-semibold">
                  Skip for Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeBooking;
