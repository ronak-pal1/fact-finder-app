import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainCustomHeader from "@/components/ui/MainCustomHeader";
import Home from "./home";
import LearningModules from "./learning-modules";
import ModuleScreen from "./module-screen";
import CustomBottomTabs from "@/components/ui/CustomBottomTabs";


const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
    id={undefined}
      screenOptions={{
        header: () => <MainCustomHeader />,
        drawerStyle: { width: 340 },
      }}
    >
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="module-screen" component={ModuleScreen} />
      <Drawer.Screen name="learning-modules" component={LearningModules} />
    </Drawer.Navigator>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs.Navigator
        id={undefined}
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomBottomTabs {...props} />}
      >
        <Tabs.Screen name="HomeTab" component={HomeDrawer} options={{ title: "Home" }} />
        <Tabs.Screen name="CoursesTab" component={HomeDrawer} options={{ title: "Courses" }} />
        <Tabs.Screen name="ResourcesTab" component={HomeDrawer} options={{ title: "Resources" }} />
        <Tabs.Screen name="ProfileTab" component={HomeDrawer} options={{ title: "Profile" }} />
      </Tabs.Navigator>
    </GestureHandlerRootView>
  );
}
