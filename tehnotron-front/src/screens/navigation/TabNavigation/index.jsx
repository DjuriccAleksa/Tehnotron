import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../../app/Home';
import Profile from '../../app/Profile';
import Favorites from '../../app/Favorites';

import { colors } from "../../../utility/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../../app/Settings";
import CreateListing from "../../app/CreateListing";
import MyListings from "../../app/MyListings";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="CreateListing" component={CreateListing} options={{ headerShown: false }} />
            <Stack.Screen name="MyListings" component={MyListings} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon;

                if (route.name === "Home") {
                    icon = focused ?
                        require('../../../resources/TabIcons/home_active.png') :
                        require('../../../resources/TabIcons/home.png');
                }
                else if (route.name === "Favorites") {
                    icon = focused ?
                        require('../../../resources/TabIcons/favorites_active.png') :
                        require('../../../resources/TabIcons/favorites.png');
                }
                else if (route.name === "ProfileStack") {
                    icon = focused ?
                        require('../../../resources/TabIcons/profile_active.png') :
                        require('../../../resources/TabIcons/profile.png');
                }

                return <Image style={{ width: size, height: size }} source={icon} />
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { borderTopColor: colors.lightGrey, backgroundColor: colors.white }
        })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator >
    )
}

export default React.memo(Tabs);