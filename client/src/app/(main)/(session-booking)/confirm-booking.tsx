import CustomText from "@/components/ui/CustomText";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ConfirmBooking = () => {
  const [note, setNote] = useState<string>("");
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-[#F4F4F4] px-6">
      <View className="mt-4">
        <CustomText className="text-4xl" weight="bold">
          Confirm Booking
        </CustomText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-6 gap-y-10">
          <View className="rounded-2xl bg-white p-4 gap-y-8">
            <CustomText className="text-2xl" weight="bold">
              One-on-One Session
            </CustomText>
            <CustomText className="text-lg">June 5 10:30 AM</CustomText>
          </View>

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
                  One-on-One Session
                </CustomText>
                <CustomText className="text-lg text-white">
                  (3 sessions left)
                </CustomText>

                <View className="overflow-hidden">
                  <View className="rounded-lg bg-white self-start px-4 items-center py-1">
                    <CustomText className="text-lg text-black" weight="bold">
                      June 5 10:30 AM
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="gap-y-3">
            <CustomText className="text-2xl" weight="bold">
              Notes
            </CustomText>

            <View>
              <TextInput
                placeholder="Enter your message here..."
                className="border border-black rounded-2xl py-5P px-4 h-[115px]"
                multiline={true}
                numberOfLines={4}
                onChangeText={(newText) => setNote(newText)}
                value={note}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        <View className="mt-12 gap-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("join-call")}
            className="bg-[#F36454] w-full items-center py-4 rounded-2xl"
          >
            <Text className="text-xl text-white font-light">
              Confirm Date & Time
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-full items-center py-4 rounded-2xl"
          >
            <Text className="text-xl text-black font-light">Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfirmBooking;
