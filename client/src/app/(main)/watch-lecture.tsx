import { Text, View } from "react-native";
import { ResizeMode, Video, VideoFullscreenUpdate } from "expo-av";
import CustomText from "@/components/ui/CustomText";
import * as ScreenOrientation from "expo-screen-orientation";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const WatchLecture = () => {
  const handleFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
      // User entered fullscreen → lock to landscape
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
      // User exited fullscreen → revert to portrait
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };
  return (
    <View className="flex-1 bg-[#F4F4F4] px-3">
      <View className="my-8">
        <Video
          source={{ uri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }}
          style={{ width: "100%", height: 200 }}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          onFullscreenUpdate={handleFullscreenUpdate}
          useNativeControls
        />

        <View className="px-2">
          <View className=" flex-row items-center justify-between mt-6 border-b border-gray-300 pb-8">
            <View className="gap-y-2">
              <CustomText className="text-3xl" weight="bold">
                Intro to Finance
              </CustomText>
              <CustomText className="text-xl text-gray-400" weight="bold">
                by Bibhuti Hazarika
              </CustomText>
            </View>

            <View className="flex-row items-center gap-x-4">
              <View className="overflow-hidden">
                <View className="w-[40px] h-[40px] rounded-full bg-gray-200 items-center justify-center">
                  <SimpleLineIcons name="like" size={20} color="#786767" />
                </View>
              </View>

              <View className="overflow-hidden">
                <View className="w-[40px] h-[40px] rounded-full bg-gray-200 items-center justify-center">
                  <Ionicons name="bookmark-outline" size={20} color="#786767" />
                </View>
              </View>
            </View>
          </View>

          <View className="mt-14 gap-y-7">
            <CustomText className="text-2xl" weight="bold">
              Description
            </CustomText>

            <View>
              <Text className="text-xl font-light text-gray-500 leading-relaxed">
                Soft skills play a very important role in a professional
                investigator’s career. Soft skills play a very important role in
                a professional investigator’s career. Soft skills play a very
                important role in a professional investigator’s career.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WatchLecture;
