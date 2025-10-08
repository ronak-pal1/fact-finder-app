import CustomText from "@/components/ui/CustomText";
import { LearningIcon, SupportAgentIcon } from "@/components/ui/svg-icons";
import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

const Onboarding1 = () => {
  return (
    <View className="flex-1 bg-white relative justify-center">
      <View className="absolute top-0 left-0 flex flex-row px-5 py-3">
        <Image
          source={require("@/assets/images/logo.png")}
          resizeMode="contain"
          className="w-[100px] h-[80px]"
        />
      </View>

      <View className="absolute bottom-0 left-0">
        <Image
          source={require("@/assets/images/learner-idea.png")}
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
          <CustomText className="text-5xl text-[##316F5C]" weight="bold">
            How do you want
          </CustomText>
          <CustomText className="text-5xl text-[##316F5C]" weight="bold">
            to use
          </CustomText>
          <CustomText className="text-5xl text-[##316F5C]" weight="bold">
            FactFindr?
          </CustomText>
        </View>

        <CustomText className="text-2xl text-[#B20000] my-6" weight="bold">
          Facts Finder
        </CustomText>

        <View className="mt-7 gap-y-4">
          <TouchableOpacity onPress={() => {router.push("/onboarding2")}} className="overflow-hidden">
            <View className="border border-black rounded-md w-full py-4 items-center justify-center flex-row gap-x-4">
              <LearningIcon />
              <CustomText className="text-2xl" weight="bold">
                Learn With FactFindr
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="overflow-hidden">
            <View className="border border-[#6B39F4] bg-[#6B39F4] rounded-md w-full py-4 items-center justify-center flex-row gap-x-4">
              <SupportAgentIcon />
              <CustomText className="text-2xl text-white" weight="bold">
                Enroll As Agent
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboarding1;
