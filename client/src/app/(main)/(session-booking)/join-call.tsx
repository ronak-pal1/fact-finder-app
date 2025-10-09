import CustomText from "@/components/ui/CustomText";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

const JoinCall = () => {
  return (
    <View className="flex-1 bg-[#F4F4F4] px-6">
      <View className="w-[75%] mt-4">
        <CustomText className="text-4xl" weight="bold">
          Session with Lead Expert
        </CustomText>
      </View>

      <View className=" my-10 h-[350px]">
        <View className="w-full overflow-hidden relative ">
          <View className="absolute top-0 left-0 z-20">
            <Svg width="171" height="200" viewBox="0 0 171 93" fill="none">
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

          <View className="w-full rounded-2xl bg-[#7B9B75] gap-x-4 px-5 py-4">
            <View className="w-full flex-row items-center justify-between z-30">
              <View className="gap-y-3">
                <CustomText className="text-2xl text-white" weight="bold">
                  One-on-One Session
                </CustomText>
                <CustomText className="text-lg text-white">
                  (3 sessions left)
                </CustomText>
              </View>

              <View className="rounded-lg bg-white self-start px-4 items-center py-1">
                <CustomText className="text-xl text-black" weight="bold">
                  Upcoming
                </CustomText>
              </View>
            </View>

            <View className="mt-5">
              <View className="z-40 flex-row items-center gap-x-5">
                <Image
                  source={require("@/assets/images/book-a-mentor-img.png")}
                  className="w-[60px] h-[60px] rounded-full"
                  resizeMode="contain"
                />

                <CustomText className="text-2xl text-white">
                  Lead Senior
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-8 gap-y-4 ">
        <TouchableOpacity
          onPress={() => {}}
          className="bg-[#F36454] w-full items-center py-4 rounded-2xl"
        >
          <Text className="text-xl text-white font-light">Join Video Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          className="bg-[#EEEFEE] w-full items-center py-4 rounded-2xl"
        >
          <Text className="text-xl text-black font-light">Join Audio Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinCall;
