import React, { useState } from 'react';
import Routes from './src/screens/navigation/Mainnavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const UserContext = React.createContext();
export const ProfileContext = React.createContext();
export const ProductContext = React.createContext([]);
export const CategoryContext = React.createContext([]);
export const FavoritesContext = React.createContext([]);

const App = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [favorites, setFavorites] = useState();

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <ProductContext.Provider value={{ products, setProducts }}>
            <FavoritesContext.Provider value={{ favorites, setFavorites }}>
              <CategoryContext.Provider value={{ categories, setCategories }}>
                <Routes />
              </CategoryContext.Provider>
            </FavoritesContext.Provider>
          </ProductContext.Provider>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
