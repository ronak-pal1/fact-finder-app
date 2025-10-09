import CustomText from "@/components/ui/CustomText";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

const SessionBooking = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-[#F4F4F4] px-6">
      <View className="gap-y-3 mt-4">
        <CustomText className="text-4xl" weight="bold">
          Assistance with Senior Expert
        </CustomText>

        <CustomText className="text-xl">
          Get exeprts guidance on how to excel your work.
        </CustomText>
      </View>

      <View className=" my-8 h-[350px]">
        <View className="w-full overflow-hidden relative ">
          <View className="absolute top-0 left-0 z-20">
            <Svg width="171" height="135" viewBox="0 0 171 93" fill="none">
              <Ellipse
                cx="59.6406"
                cy="17.0815"
                rx="119.212"
                ry="82.1489"
                transform="rotate(-30.8093 59.6406 17.0815)"
                fill="#00AE8F"
              />
            </Svg>
          </View>

          <View className="w-full rounded-2xl bg-[#7B9B75] flex-row items-center gap-x-4 px-2 py-3">
            <View className="z-30">
              <Image
                source={require("@/assets/images/book-a-mentor-img.png")}
                className="w-[100px] h-[100px]"
                resizeMode="contain"
              />
            </View>

            <View className="gap-y-3 z-30">
              <CustomText className="text-2xl text-white" weight="bold">
                Get Mentorship{" "}
                <CustomText className="text-lg text-white">
                  (3session left){" "}
                </CustomText>
              </CustomText>
              <CustomText className="text-lg text-white">
                Book a single session for 30mins
              </CustomText>

              <View className="overflow-hidden">
                <View className="rounded-lg bg-white self-start px-4 items-center py-1">
                  <CustomText className="text-xl text-black">
                    Book session
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("pick-date")} className="bg-[#F36454] w-full items-center py-4 rounded-2xl">
        <Text className="text-xl text-white font-light">Book Session</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SessionBooking;
