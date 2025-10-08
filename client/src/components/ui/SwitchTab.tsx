import { View, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

export default function SwitchTab({
  tabs,
  activeTab,
  onChangeTab,
}: {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}) {
  return (
    <View className="flex-row">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          className="mr-3 items-center pb-2"
          onPress={() => onChangeTab(tab)}
        >
          <CustomText
            className={`text-2xl mr-4 ${
              activeTab === tab ? "text-blue-500" : "text-gray-300"
            }`}
            weight="bold"
          >
            {tab}
          </CustomText>
          {activeTab === tab && (
            <View className="h-[3px] w-full bg-blue-500 rounded-full mt-1" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
