import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainCustomHeader from "@/components/ui/MainCustomHeader";
import Home from "./home";
import LearningModules from "./learning-modules";
import ModuleScreen from "./module-screen";
import CustomBottomTabs from "@/components/ui/CustomBottomTabs";
import CustomDrawerContent from "@/components/ui/CustomDrawerContent";
import Plans from "./plans";
import SessionBooking from "./(session-booking)/session-booking";
import ConfirmBooking from "./(session-booking)/confirm-booking";
import PickDate from "./(session-booking)/pick-date";
import JoinCall from "./(session-booking)/join-call";
import WatchLecture from "./watch-lecture";
import Profile from "./profile";

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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="module-screen" component={ModuleScreen} />
      <Drawer.Screen name="learning-modules" component={LearningModules} />
      <Drawer.Screen name="plans" component={Plans} />
      <Drawer.Screen name="session-booking" component={SessionBooking} />
      <Drawer.Screen name="pick-date" component={PickDate} />
      <Drawer.Screen name="confirm-booking" component={ConfirmBooking} />
      <Drawer.Screen name="join-call" component={JoinCall} />
      <Drawer.Screen name="watch-lecture" component={WatchLecture} />
      <Drawer.Screen name="profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs.Navigator
        id={undefined}
        screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: "#FFFFFF"}}}
        tabBar={(props) => <CustomBottomTabs {...props} />}
      >
        <Tabs.Screen name="HomeTab" component={HomeDrawer} options={{ title: "Home" }} />
        <Tabs.Screen name="CoursesTab" component={HomeDrawer} options={{ title: "Courses" }} />
        <Tabs.Screen name="ResourcesTab" component={HomeDrawer} options={{ title: "Resources" }} />
        <Tabs.Screen name="ProfileTab" component={Profile} options={{ title: "Profile" }} />
      </Tabs.Navigator>
    </GestureHandlerRootView>
  );
}
