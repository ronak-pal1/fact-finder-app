import CustomText from "@/components/ui/CustomText";
import { LearningIcon, SupportAgentIcon } from "@/components/ui/svg-icons";
import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

const Onboarding2 = () => {
  return (
    <View className="flex-1 bg-white relative justify-center">
      <View className="absolute top-0 left-0 flex flex-row px-5 py-3">
        <Image
          source={require("@/assets/images/logo.png")}
          resizeMode="contain"
          className="w-[100px] h-[80px]"
        />
      </View>

      <View className="absolute bottom-0 right-0">
        <Image
          source={require("@/assets/images/agent.png")}
          resizeMode="contain"
          className="w-[230px] h-[230px]"
        />
      </View>

      <View className="absolute top-[90px] left-[100px]">
        <Image
          source={require("@/assets/images/plane-to-right.png")}
          resizeMode="contain"
          className="w-[140px] h-[70px]"
        />
      </View>

      <View className="absolute top-[160px] right-0">
        <Image
          source={require("@/assets/images/plane-to-left.png")}
          resizeMode="contain"
          className="w-[80px] h-[50px]"
        />
      </View>

      <View className="px-7">
        <View className="gap-y-3">
          <CustomText className="text-4xl text-[##316F5C]" weight="bold">
            “Empowering agents with knowledge, skills, and support.”
          </CustomText>
        </View>

        <CustomText className="text-2xl text-[#B20000] my-6" weight="bold">
          Facts Finder
        </CustomText>

        <View className="mt-7 gap-y-4">
          <TouchableOpacity
            onPress={() => {
              router.push("/signin");
            }}
            className="overflow-hidden"
          >
            <View className="border border-[#6B39F4] bg-[#6B39F4] rounded-md w-full py-4 items-center">
              <CustomText className="text-2xl text-white" weight="bold">
                Login
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/signup");
            }}
            className="overflow-hidden"
          >
            <View className="border border-black rounded-md w-full py-4 items-center">
              <CustomText className="text-2xl" weight="bold">
                Sign Up
              </CustomText>
            </View>
          </TouchableOpacity>


          <View className="items-center mt-6">
            <View className="flex-row gap-x-3">
                <CustomText className="text-2xl" weight="bold">Forgot Password?</CustomText>
            <CustomText className="text-[#F36454] text-2xl" weight="bold">Reset Now</CustomText>

            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding2;
