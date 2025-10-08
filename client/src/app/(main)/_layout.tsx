import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainCustomHeader from "@/components/ui/MainCustomHeader";
import Home from "./home";
import LearningModules from "./learning-modules";

const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer.Navigator
        id={undefined}
        screenOptions={{
            header: () => <MainCustomHeader />,
          drawerStyle: { width: 340 },
        }}
      >
        <Drawer.Screen name="home" component={Home} />
        <Drawer.Screen name="learning-modules" component={LearningModules} />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}
