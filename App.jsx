import React from 'react';
import Signin from './src/screens/auth/Signin';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import Tabs from './src/screens/navigation'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utility/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  const isSignedIn = true;

  const theme = {
    colors: {
      background: colors.white
    }
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

            </>
          ) : (
            <>
              <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
              <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
              <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} /></>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
