import CustomText from "@/components/ui/CustomText";
import {
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import CustomInput from "@/components/ui/CustomInput";
import Feather from "@expo/vector-icons/Feather";
import {
  CallIcon,
  EmailIcon,
  HttpsIcon,
  LocationIcon,
  PersonIcon,
  UserTieIcon,
} from "@/components/ui/svg-icons";
import { router } from "expo-router";
import React from "react";
import { StatusBar as RNStatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { registerLearner } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";

const SignUp = () => {
  const [fullname, setFullname] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async () => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      fullname === "" ||
      companyName === "" ||
      designation === "" ||
      address === "" ||
      phone === ""
    ) {
      ToastAndroid.showWithGravity(
        "Please fill all fields",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }

    try {
      const response = await dispatch(
        registerLearner({
          name: fullname,
          email,
          password,
          company: companyName,
          designation,
          address,
          phone,
        })
      );

      console.log(response.meta)

      if (response.meta.requestStatus === "fulfilled") {
        router.replace("/verification");
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Registration failed. Please try again.",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      RNStatusBar.setBarStyle("light-content");
      RNStatusBar.setBackgroundColor("#3B9678");
      RNStatusBar.setTranslucent(true);
    }, [])
  );

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
          Sign Up
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
          <View className="gap-y-4">
            <CustomText className="text-3xl" weight="bold">
              Welcome
            </CustomText>
            <CustomText className="text-xl">
              Create Account to keep exploring amazing destinations around the
              world!
            </CustomText>
          </View>

          <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
            <View className="gap-y-6">
              <CustomInput
                Icon={PersonIcon}
                placeholder="Enter your full name"
                value={fullname}
                onChangeText={setFullname}
              />
              <CustomInput
                Icon={UserTieIcon}
                placeholder="Agency/Company (Optional)"
                value={companyName}
                onChangeText={setCompanyName}
              />
              <CustomInput
                Icon={PersonIcon}
                placeholder="Designation"
                value={designation}
                onChangeText={setDesignation}
              />

              <CustomInput
                Icon={LocationIcon}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />

              <CustomInput
                Icon={CallIcon}
                placeholder="Mobile Number"
                value={phone}
                onChangeText={setPhone}
              />

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

              <CustomInput
                Icon={HttpsIcon}
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <View>
                <TouchableOpacity
                  onPress={handleRegister}
                  className="overflow-hidden"
                >
                  <View className="border border-[#3B9678] bg-[#3B9678] rounded-2xl w-full py-4 px-5 items-center justify-between flex-row gap-x-4">
                    <CustomText className="text-2xl text-white" weight="bold">
                      Create Account
                    </CustomText>

                    <Feather name="arrow-right" size={28} color="white" />
                  </View>
                </TouchableOpacity>

                <View className="items-center gap-y-9 mt-5">
                  <View>
                    <CustomText className="text-xl">
                      Already have an account?{" "}
                      <CustomText
                      onPress={() => {router.push("/signin");}}
                        className="text-[#3B9678] text-xl"
                        weight="bold"
                      >
                        Sign in
                      </CustomText>
                    </CustomText>
                  </View>

                  <View>
                    <CustomText className="text-lg text-center">
                      By creating an account, you agree to our{" "}
                      <CustomText
                        className="text-[#3B9678] text-lg"
                        weight="bold"
                      >
                        Terms & Condistions
                      </CustomText>{" "}
                      and agree to{" "}
                      <CustomText
                        className="text-[#3B9678] text-lg"
                        weight="bold"
                      >
                        Privacy Policy
                      </CustomText>
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
