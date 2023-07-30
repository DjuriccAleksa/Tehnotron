import React, { useState } from 'react';
import Routes from './src/screens/navigation/Mainnavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const UserContext = React.createContext();
export const ProfileContext = React.createContext();
export const ServicesContext = React.createContext([]);

const App = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [services, setServices] = useState();

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <ServicesContext.Provider value={{ services, setServices }}>
            <Routes />
          </ServicesContext.Provider>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
