import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler, Button, Image, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import CustomText from "@/components/ui/CustomText";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { router } from "expo-router";

const CameraComponent = ({ cameraType }: { cameraType: CameraType }) => {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1, // 0 to 1, where 1 is highest quality
          base64: false, // Set to true if you need base64
          exif: false, // Set to true if you need EXIF data
        });

        console.log("Photo taken:", photo.uri);
        setCapturedPhoto(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const retakePicture = () => {
    setCapturedPhoto(null);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 items-center justify-center gap-y-4">
        <CustomText className="text-xl px-7 text-center">
          We need your permission to show the camera
        </CustomText>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // Show captured photo
  if (capturedPhoto) {
    return (
      <View className="flex-1 justify-center overflow-hidden rounded-xl relative">
        <Image
          source={{ uri: capturedPhoto }}
          className="flex-1 w-full h-full"
          resizeMode="cover"
        />

        <View className="absolute bottom-4 w-full flex-row items-center justify-around px-10">
          {/* Retake button */}
          <TouchableOpacity
            onPress={retakePicture}
            className="overflow-hidden rounded-full"
          >
            <View className="bg-[#f7f4f4a5] w-[58px] h-[58px] rounded-full items-center justify-center">
              <Entypo name="cycle" size={24} color="white" />
            </View>
          </TouchableOpacity>

          {/* Confirm/Use button */}
          <TouchableOpacity
            onPress={() => {
              // Handle the confirmed photo here
              console.log("Photo confirmed:", capturedPhoto);
              // You can pass it to parent component, upload it, etc.
            }}
            className="overflow-hidden rounded-full"
          >
            <View className="bg-[#4CAF50] w-[58px] h-[58px] rounded-full items-center justify-center">
              <Entypo name="check" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center overflow-hidden rounded-xl relative">
      <CameraView
        ref={cameraRef}
        className="flex-1"
        facing={cameraType}
        style={{ width: "100%", height: "100%" }}
        ratio="16:9"
        onCameraReady={() => setIsCameraReady(true)}
      />

      <View className="absolute bottom-4 w-full flex-row items-center justify-center">
        <TouchableOpacity
          onPress={takePicture}
          className="overflow-hidden rounded-full"
          disabled={!isCameraReady}
        >
          <View className="bg-[#f7f4f4a5] w-[58px] h-[58px] rounded-full items-center justify-center">
            <Entypo name="camera" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoStep = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <View className="gap-y-4">
        <Text className="text-3xl text-[#22240F] font-bold">
          Great, You’re Almost There
        </Text>

        <Text className="text-base text-[#B5B5B5]">
          To complete your registration process, you will need to
        </Text>
      </View>

      <View className="my-7 gap-y-7 flex-1">
        <View className="flex flex-row items-center gap-x-4">
          <View className="w-[32px] h-[32px] rounded-full bg-[#3B9678] items-center justify-center">
            <Text className="text-white text-xl">1</Text>
          </View>

          <View>
            <Text className="text-[#363636] text-lg">
              Take photos of your Adhaar Card
            </Text>

            <Text className="text-base text-[#36363699]">
              Photograph both sides
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center gap-x-4">
          <View className="w-[32px] h-[32px] rounded-full bg-[#3B9678] items-center justify-center">
            <Text className="text-white text-xl">2</Text>
          </View>

          <View>
            <Text className="text-[#363636] text-lg">
              Take a photo of yourself
            </Text>
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => setCurrentStep(1)}
          className="flex flex-row items-center justify-between w-full bg-[#3B9678] rounded-2xl py-4 px-5"
        >
          <Text className="text-white text-xl font-bold">Let's continue</Text>

          <Entypo name="chevron-small-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const AdhaarFrontStep = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <View className="gap-y-4">
        <Text className="text-3xl text-[#22240F] font-bold">
          Take a Front photo of your Adhaar
        </Text>
      </View>

      <View className="overflow-hidden flex-1">
        <View className="my-7 flex-1 bg-[#D9D9D966] rounded-xl">
          <CameraComponent cameraType="back" />
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => setCurrentStep(2)}
          className="flex flex-row items-center justify-between w-full bg-[#3B9678] rounded-2xl py-4 px-5"
        >
          <Text className="text-white text-xl font-bold">continue</Text>

          <Entypo name="chevron-small-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const AdhaarBackStep = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <View className="gap-y-4">
        <Text className="text-3xl text-[#22240F] font-bold">
          Take a Back photo of your Adhaar
        </Text>
      </View>

      <View className="overflow-hidden flex-1">
        <View className="my-7 flex-1 bg-[#D9D9D966] rounded-xl">
          <CameraComponent cameraType="back" />
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => setCurrentStep(3)}
          className="flex flex-row items-center justify-between w-full bg-[#3B9678] rounded-2xl py-4 px-5"
        >
          <Text className="text-white text-xl font-bold">continue</Text>

          <Entypo name="chevron-small-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const SelfieStep = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <View className="gap-y-4">
        <Text className="text-3xl text-[#22240F] font-bold">
          Take your photo
        </Text>
      </View>

      <View className="overflow-hidden flex-1">
        <View className="my-7 flex-1 bg-[#D9D9D966] rounded-xl">
          <CameraComponent cameraType="front" />
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => setCurrentStep(4)}
          className="flex flex-row items-center justify-between w-full bg-[#3B9678] rounded-2xl py-4 px-5"
        >
          <Text className="text-white text-xl font-bold">continue</Text>

          <Entypo name="chevron-small-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const VerifyingStep = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerified(true);

      setTimeout(() => {
        router.replace("/welcome-booking");
      }, 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View className="w-full h-full flex-1 flex items-center justify-center px-11 bg-white">
      {isVerified ? (
        <View>
          <Text className="text-4xl font-medium text-[#FDA058]">
            Verification successful
          </Text>
        </View>
      ) : (
        <View className="gap-y-4">
          <Text className="text-3xl text-black font-medium">Verifying...</Text>

          <Text className="text-base text-[#363636]">
            Your verification is pending. You can start using the app while we
            verify your details. Thank You
          </Text>
        </View>
      )}
    </View>
  );
};

const Verification = () => {
  const [currentStep, setCurrentStep] = useState(0);

   useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
          return true; // Prevent default back behavior
        }
        return false; // Allow default back behavior (exit screen)
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [currentStep])
  );

  if (currentStep === 4) {
    return <VerifyingStep />;
  }

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
          Verification
        </CustomText>
      </View>

      <View className="flex-1 overflow-hidden">
        <View className="h-full w-full bg-white rounded-t-[40px] px-8 py-7">
          {currentStep === 0 && <InfoStep setCurrentStep={setCurrentStep} />}
          {currentStep === 1 && (
            <AdhaarFrontStep setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 2 && (
            <AdhaarBackStep setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 3 && <SelfieStep setCurrentStep={setCurrentStep} />}
        </View>
      </View>
    </View>
  );
};

export default Verification;
