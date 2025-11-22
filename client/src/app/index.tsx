import { AppDispatch } from "@/store";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import 'react-native-gesture-handler';
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { loadLearnerFromStorage } from "@/store/slices/authSlice";



export default function Page() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //redyrate redux store
    const loadUser = async () => {
      const learner = await SecureStore.getItemAsync("learner");
      const accessToken = await SecureStore.getItemAsync("accessToken");

      console.log(accessToken);
      if (learner && accessToken) {
        router.replace("/welcome-booking");
      }
      else
      {
        router.replace("/onboarding1");
      }

      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (learner && accessToken && refreshToken) {
        dispatch(
          loadLearnerFromStorage({
            learner: JSON.parse(learner),
            accessToken,
            refreshToken,
          })
        );
      }
    };

    loadUser();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return <Redirect href="/onboarding1" />;
}
