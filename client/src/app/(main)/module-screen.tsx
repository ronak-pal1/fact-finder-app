import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import CustomText from "@/components/ui/CustomText";
import { StartIcon } from "@/components/ui/svg-icons";
import { useState } from "react";
import SwitchTab from "@/components/ui/SwitchTab";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const LessionCard = ({
  title,
  isCurrent = false,
}: {
  title: string;
  isCurrent?: boolean;
}) => {

    const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("watch-lecture")}} className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-x-4">
        <View
          className="w-[32px] h-[32px] rounded-full  items-center justify-center"
          style={{ backgroundColor: isCurrent ? "#FB5B35" : "#F0DBDB" }}
        >
          <MaterialIcons
            name="play-arrow"
            size={18}
            color={isCurrent ? "white" : "#FB5B35"}
          />
        </View>

        <CustomText className="text-xl" weight="bold">
          {title}
        </CustomText>
      </View>
      <View>
        <CustomText className="text-lg" weight="bold">
          02:35
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const ModuleScreen = () => {
  const [activeTab, setActiveTab] = useState("Lessons");

  const tabList = ["Lessons", "Description"];

  return (
    <View className="flex-1 bg-[#F4F4F4]  px-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="gap-y-2 ">
            <CustomText className="text-4xl" weight="bold">
              Module 1- Soft Skills
            </CustomText>

            <View className="flex-row items-center gap-x-8">
              <CustomText className="text-xl" weight="bold">
                <CustomText className="text-[#F36454]">2 of 6 </CustomText>
                Completed
              </CustomText>

              <View className="flex-row items-center gap-x-2">
                <StartIcon />
                <CustomText className="text-xl">4.5</CustomText>
              </View>

              <CustomText className="text-xl">2.8k enrolled</CustomText>
            </View>
          </View>

          <View className="relative my-14">
            <View className="w-full rounded-3xl bg-[#CFF0FF] px-5 py-6">
              <View className="gap-y-3">
                <Text className="text-2xl font-medium">Bibhuti Hazarika</Text>
                <Text className="text-lg font-light">Senior expert</Text>

                <View className="overflow-hidden">
                  <View className="rounded-lg bg-[#F36454] w-[180px] items-center py-1">
                    <CustomText className="text-xl text-white">
                      Book 1 on 1 sesson
                    </CustomText>
                  </View>
                </View>
              </View>

              <View className="absolute bottom-0 right-0">
                <Image
                  source={require("@/assets/images/bg-removed-mentor-pic.png")}
                  className="w-[200px] h-[170px]"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          {/* tabs */}
          <View>
            <SwitchTab
              tabs={tabList}
              activeTab={activeTab}
              onChangeTab={(tab) => setActiveTab(tab)}
            />

            <View className="py-7">
              {activeTab === "Lessons" ? (
                <View className="gap-y-6">
                  <LessionCard title="Intro To Finance" isCurrent={true} />
                  <LessionCard title="Fundamentals of Finance" />
                  <LessionCard title="Accounts Introduction" />
                  <LessionCard title="Finance Principles" />
                  <LessionCard title="Accounts Introduction" />
                  <LessionCard title="Finance Principles" />
                </View>
              ) : (
                <View className="gap-y-6">
                  <CustomText className="text-xl" weight="bold">
                    Soft skills play a very important role in a professional
                    investigator’s career.
                  </CustomText>

                  <CustomText className="text-xl" weight="bold">
                    Soft skills play a very important role in a professional
                    investigator’s career.
                  </CustomText>

                  <CustomText className="text-xl" weight="bold">
                    Soft skills play a very important role in a professional
                    investigator’s career.
                  </CustomText>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ModuleScreen;
