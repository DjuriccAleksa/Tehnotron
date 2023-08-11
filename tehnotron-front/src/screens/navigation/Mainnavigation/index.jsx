import React, { useContext, useEffect, useState } from 'react';
import Signin from '../../../screens/auth/Signin';
import Splash from '../../../screens/auth/Splash';
import Signup from '../../../screens/auth/Signup';
import Tabs from '../TabNavigation'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../../utility/colors';
import ProductDetails from '../../../screens/app/ProductDetails';
import { UserContext } from '../../../../App';
import { addToxenToRequest } from '../../../utility/request';
import { getItem } from '../../../utility/storageCalls';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            // const token = await AsyncStorage.getItem('auth_token');
            const token = await getItem('token');

            if (token == null) {
                setUser({});
            }
            else {
                setUser({ token });
            }

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        })()
    }, [])

    useEffect(() => {

        if (user?.token) {
            addToxenToRequest(user?.token);

        }
    }, [user])

    const theme = {
        colors: {
            background: colors.white
        }
    }

    if (loading) {
        return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator>
                {user?.token ? (
                    <>
                        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />

                    </>
                ) : (
                    <>
                        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
                        <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
                        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} /></>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default React.memo(Routes);
