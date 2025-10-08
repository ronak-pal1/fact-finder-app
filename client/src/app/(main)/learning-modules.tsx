import CustomText from "@/components/ui/CustomText";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { BookMentorSection, ProgressCard } from "./home";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const ModuleCard = ({ isLock = true }: { isLock?: boolean }) => {
    const navigation = useNavigation<any>();
  return (
    <TouchableOpacity className="overflow-hidden" onPress={() => {
        if(isLock) return;
        navigation.navigate("module-screen");
    }}>
      <View className="w-full rounded-xl bg-white px-3 py-6 flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-3">
          <CustomText className="text-2xl text-[#FB5B35]" weight="bold">
            Module 1
          </CustomText>
          <CustomText className="text-2xl" weight="bold">
            Soft skills
          </CustomText>
        </View>

        <View className="flex-row items-center gap-x-4">
          {isLock ? (
            <MaterialIcons name="lock" size={25} color="black" />
          ) : (
            <>
              <CustomText className="text-black/30 text-lg">4/10</CustomText>
              <Entypo name="chevron-small-right" size={25} color="black" />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const LearningModules = () => {
  return (
    <View className="flex-1 bg-[#F4F4F4]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="gap-y-2  px-6">
            <CustomText className="text-3xl" weight="bold">
              Learnings
            </CustomText>
            <CustomText className="text-xl" weight="bold">
              <CustomText className="text-[#F36454]">2 of 6 </CustomText>
              Completed
            </CustomText>
          </View>

          <View className="my-8  px-6">
            <ProgressCard />
          </View>

          {/* All modules section */}
          <View className="  px-6">
            <View className="flex-row items-center justify-between">
              <CustomText className="text-2xl" weight="bold">
                All Modules
              </CustomText>

              <CustomText className="text-xl" weight="bold">
                See All
              </CustomText>
            </View>

            <View className="w-full gap-y-5 my-5">
              <ModuleCard isLock={false} />
              <ModuleCard isLock={false} />
              <ModuleCard />
              <ModuleCard />
              <ModuleCard />
              <ModuleCard />
            </View>
          </View>

          {/* Book a mentor section */}
          <View className="my-5">
            <BookMentorSection />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LearningModules;
