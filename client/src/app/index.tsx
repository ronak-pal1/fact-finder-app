import CustomText from "@/components/ui/CustomText";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <CustomText className="text-3xl">Fact finder</CustomText>
    </SafeAreaView>
  );
}
