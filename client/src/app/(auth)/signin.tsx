import CustomText from "@/components/ui/CustomText";
import { Image, ToastAndroid, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import CustomInput from "@/components/ui/CustomInput";
import Feather from "@expo/vector-icons/Feather";
import { EmailIcon, HttpsIcon } from "@/components/ui/svg-icons";
import { router } from "expo-router";
import React from "react";
import { StatusBar as RNStatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginLearner } from "@/store/slices/authSlice";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      RNStatusBar.setBarStyle("light-content");
      RNStatusBar.setBackgroundColor("#3B9678");
      RNStatusBar.setTranslucent(true);
    }, [])
  );

  const handleSignin = async () => {
    if (email === "" || password === "") {
      ToastAndroid.showWithGravity(
        "Please fill all fields",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }

    try {
      await dispatch(loginLearner({ email, password }));

      router.replace("/welcome-booking");
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Invalid email or password",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  };

  return (
    <View className="flex-1 bg-[#3B9678] relative">
      <View className="px-5 my-10 relative items-center">
        <Entypo
          name="chevron-small-left"
          className="absolute left-5"
          size={30}
          color="white"
        />

        <CustomText className="text-xl text-white" weight="bold">
          Sign In
        </CustomText>
      </View>

      <View className="absolute right-[40px] -top-[30px]">
        <Image
          source={require("@/assets/images/signup-plane.png")}
          resizeMode="contain"
          className="w-[430px] h-[330px]"
        />
      </View>

      <View className="flex-1 overflow-hidden">
        <View className="h-full w-full bg-white rounded-t-[40px] px-8 py-7">
          <View className="mt-5 flex-1 flex flex-col items-center justify-center gap-y-20">
            <View className="gap-y-4 flex flex-col items-center justify-center">
              <CustomText className="text-3xl" weight="bold">
                Welcome back
              </CustomText>
              <CustomText className="text-xl text-center">
                Sign in to continue exploring amazing destinations around the
                world!
              </CustomText>
            </View>

            <View className="gap-y-6">
              <CustomInput
                Icon={EmailIcon}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <CustomInput
                Icon={HttpsIcon}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
              />

              <View>
                <TouchableOpacity
                  onPress={handleSignin}
                  className="overflow-hidden"
                >
                  <View className="border border-[#3B9678] bg-[#3B9678] rounded-2xl w-full py-4 px-5 items-center justify-between flex-row gap-x-4">
                    <CustomText className="text-2xl text-white" weight="bold">
                      Sign In
                    </CustomText>

                    <Feather name="arrow-right" size={28} color="white" />
                  </View>
                </TouchableOpacity>

                <View className="items-center gap-y-9 mt-5">
                  <View>
                    <CustomText className="text-xl">
                      Don't have an account?{" "}
                      <CustomText
                        onPress={() => {
                          router.push("/signup");
                        }}
                        className="text-[#3B9678] text-xl"
                        weight="bold"
                      >
                        Sign up
                      </CustomText>
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
