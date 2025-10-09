import CustomText from "@/components/ui/CustomText";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const PlanCard = () => {
  return (
    <View className="relative">
      <View className="absolute -top-7 -left-2 z-10">
        <View className="bg-[#F88F8F] self-start py-2 px-2 rounded-xl flex-row items-center gap-x-3">
          <View className="bg-[#B8B8B8] px-4 py-2 rounded-xl">
            <CustomText className="text-xl text-white">Gold</CustomText>
          </View>

          <View className="bg-white px-4 py-2 rounded-xl">
            <CustomText className="text-xl text-[#141414]">
              (Save 20%)
            </CustomText>
          </View>
        </View>
      </View>
      <View className="bg-white rounded-2xl px-5 pb-6 pt-10 w-[300px]">
        <View className="gap-y-2">
          <CustomText className="text-2xl" weight="bold">
            Includes
          </CustomText>
          <CustomText className="text-3xl" weight="bold">
            ₹1499
          </CustomText>
        </View>
        <View className="my-7 gap-y-4">
          <View className="flex-row items-center gap-x-5">
            <Ionicons name="checkmark-outline" size={22} color="black" />
            <CustomText className="text-xl">
              Access to all topics from module 1 to Module 5
            </CustomText>
          </View>
          <View className="flex-row items-center gap-x-5">
            <Ionicons name="checkmark-outline" size={22} color="black" />
            <CustomText className="text-xl">
              one on one session with Experts (max 3)
            </CustomText>
          </View>

          <View className="flex-row items-center gap-x-5">
            <Ionicons name="checkmark-outline" size={22} color="black" />
            <CustomText className="text-xl">24*7 Support</CustomText>
          </View>
        </View>

        <View className="mt-4 rounded-2xl bg-[#F36454] py-4 items-center">
          <Text className="text-white text-xl font-light">
            Enroll Course Now
          </Text>
        </View>
      </View>
    </View>
  );
};

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");

  const handlePlanChange = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <View className="flex-1 bg-[#F4F4F4]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="px-6">
            <CustomText className="text-4xl" weight="bold">
              Find your Perfect Plan
            </CustomText>

            <View className="self-start px-4 py-3 my-8 bg-white rounded-2xl flex-row items-center gap-x-4">
              <TouchableOpacity onPress={() => handlePlanChange("Monthly")}>
                <View
                  className={`flex-row items-center ${
                    selectedPlan === "Monthly" ? "bg-[#7B9B75]" : "bg-white"
                  } px-6 py-3 rounded-xl`}
                >
                  <CustomText
                    className={`text-xl ${
                      selectedPlan === "Monthly" ? "text-white" : "text-black"
                    }`}
                    weight="bold"
                  >
                    Monthly
                  </CustomText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePlanChange("Yearly")}>
                <View
                  className={`flex-row items-center ${
                    selectedPlan === "Yearly" ? "bg-[#7B9B75]" : "bg-white"
                  } px-6 py-3 rounded-xl`}
                >
                  <CustomText
                    className={`text-xl ${
                      selectedPlan === "Yearly" ? "text-white" : "text-black"
                    }`}
                    weight="bold"
                  >
                    Yearly (Save 13%)
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pt-7 pl-2"
            >
              <View className="flex-row items-center gap-x-10 ml-6 pr-6">
                <PlanCard />
                <PlanCard />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Plans;
