import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../app/Home';
import Profile from '../app/Profile';
import Favorites from '../app/Favorites';

import { colors } from "../../utility/colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon;

                if (route.name === "Home") {
                    icon = focused ?
                        require('../../resources/TabIcons/home_active.png') :
                        require('../../resources/TabIcons/home.png');
                }
                else if (route.name === "Favorites") {
                    icon = focused ?
                        require('../../resources/TabIcons/favorites_active.png') :
                        require('../../resources/TabIcons/favorites.png');
                }
                else if (route.name === "Profile") {
                    icon = focused ?
                        require('../../resources/TabIcons/profile_active.png') :
                        require('../../resources/TabIcons/profile.png');
                }

                return <Image style={{ width: size, height: size }} source={icon} />
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { borderTopColor: colors.lightGrey, backgroundColor: colors.white }
        })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator >
    )
}

export default React.memo(Tabs);