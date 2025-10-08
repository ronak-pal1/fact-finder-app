import CustomText from "@/components/ui/CustomText";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import ProgressBar from "@/components/ui/ProgressBar";
import { TimeIcon } from "@/components/ui/svg-icons";
import { router } from "expo-router";
import Svg, { Ellipse } from "react-native-svg";
import {useNavigation} from "@react-navigation/native";

export const ProgressCard = () => {
  return (
    <View className="w-full overflow-hidden">
      <View className="w-full bg-[#495ECA] rounded-2xl px-5 py-7">
        <View className="gap-y-3">
          <CustomText className="text-2xl text-white" weight="bold">
            Continue your Progess!
          </CustomText>
          <CustomText className="text-lg text-white">
            Module 1 - Soft skills
          </CustomText>
          <View className="my-2">
            <ProgressBar percentage={50} />
          </View>
        </View>
      </View>
    </View>
  );
};

const LearningCard = () => {
    const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      className="overflow-hidden"
      onPress={() => {
        navigation.navigate("learning-modules");
      }}
    >
      <View className="rounded-2xl bg-white w-[180px] px-5 py-5 gap-y-5">
        <CustomText className="text-2xl" weight="bold">
          Module 1-Soft skills
        </CustomText>

        <View className="w-[90px] overflow-hidden">
          <View className="rounded-2xl bg-[#F36454] items-center py-1">
            <CustomText className=" text-white" weight="bold">
              Gold Plan
            </CustomText>
          </View>
        </View>

        <View className="w-fit flex-row items-center gap-x-2">
          <TimeIcon />
          <CustomText className="text-sm">1d:10Hr</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CourseCard = () => {
  return (
    <View className="overflow-hidden">
      <View className="rounded-2xl bg-white w-[180px] px-3 py-5 gap-y-5">
        <View className="overflow-hidden">
          <Image
            source={require("@/assets/images/demo-thumbnail.png")}
            resizeMode="cover"
            className="w-full h-[70px] rounded-xl"
          />
        </View>

        <CustomText className="text-2xl" weight="bold">
          Traits & Communication
        </CustomText>

        <View className="w-[90px] overflow-hidden">
          <View className="rounded-2xl bg-[#F36454] items-center py-1">
            <CustomText className=" text-white" weight="bold">
              Gold Plan
            </CustomText>
          </View>
        </View>

        <View className="w-fit flex-row items-center gap-x-2">
          <TimeIcon />
          <CustomText className="text-sm">Module 2</CustomText>
        </View>
      </View>
    </View>
  );
};

export const BookMentorSection = () => {
  return (
    <View className="px-6">
      <View className="flex-row items-center gap-x-3">
        <CustomText className="text-2xl" weight="bold">
          Book a Mentor
        </CustomText>
        <CustomText className="text-xl">(Platinum users only)</CustomText>
      </View>

      <View className="w-full overflow-hidden my-6 relative ">
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

        <View className="w-full rounded-2xl bg-[#7B9B75] flex-row items-center gap-x-5 px-3 py-5">
          <View className="z-30">
            <Image
              source={require("@/assets/images/book-a-mentor-img.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />
          </View>

          <View className="gap-y-3 z-30">
            <CustomText className="text-3xl text-white" weight="bold">
              Have any querries?
            </CustomText>
            <CustomText className="text-xl text-white">
              Module 5 - Platinum Module
            </CustomText>

            <View className="overflow-hidden">
              <View className="rounded-lg bg-[#F36454] w-[180px] items-center py-1">
                <CustomText className="text-xl text-white">
                  Book 1 on 1 sesson
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <View className="flex-1 bg-[#F4F4F4]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="gap-y-2  px-6">
            <CustomText className="text-3xl" weight="bold">
              Welcome Back
            </CustomText>
            <CustomText className="text-xl" weight="bold">
              <CustomText className="text-[#F36454]">2 of 6 </CustomText>
              Completed
            </CustomText>
          </View>

          <View className="my-8  px-6">
            <ProgressCard />
          </View>

          {/* Learnings section */}
          <View>
            <View className="flex-row items-center justify-between  px-6">
              <CustomText className="text-2xl" weight="bold">
                Learnings
              </CustomText>

              <CustomText className="text-xl" weight="bold">
                See All
              </CustomText>
            </View>

            <ScrollView
              className="w-full"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View className="my-7 flex-row gap-x-4 ml-6 pr-6">
                <LearningCard />
                <LearningCard />
                <LearningCard />
                <LearningCard />
              </View>
            </ScrollView>
          </View>

          {/* Recommand course section */}
          <View>
            <View className="flex-row items-center justify-between  px-6">
              <CustomText className="text-2xl" weight="bold">
                Recommand Courses
              </CustomText>

              <CustomText className="text-xl" weight="bold">
                See All
              </CustomText>
            </View>

            <ScrollView
              className="w-full"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View className="my-7 flex-row gap-x-4 ml-6 pr-6">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </View>
            </ScrollView>
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

export default Home;
