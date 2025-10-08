import { View } from "react-native";
import CustomText from "./CustomText";

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <View className="w-full gap-x-7 flex-row items-center">
      <View className="w-[85%] overflow-hidden">
        <View className="w-full h-[8px] rounded-full bg-black">
            <View className="w-full overflow-hidden">
                <View className="h-[8px] rounded-full bg-white" style={{ width: `${percentage}%` }}></View>
            </View>
        </View>
      </View>

      <View>
        <CustomText className="text-xl text-white" weight="bold">
          {percentage}%
        </CustomText>
      </View>
    </View>
  );
};

export default ProgressBar;
