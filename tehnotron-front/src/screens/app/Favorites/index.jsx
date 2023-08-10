import React, { useContext, useState } from "react";
import { Alert, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoriteItem from "../../../components/FavoriteItem"
import Header from "../../../components/Header";
import { FavoritesContext, ProfileContext } from "../../../../App";
import { deleteFavorite, getFavorites, } from "../../../utility/apiCalls";

const Favorites = ({ navigation }) => {
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const { profile } = useContext(ProfileContext);

    useState(() => {
        (async () => {
            const favProducts = await getFavorites(profile?.id);
            setFavorites(favProducts);
        })()
    }, [])

    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item })
        }

        const onRemove = async () => {
            const updatedProducts = await deleteFavorite(profile?.id, item?.id);
            setFavorites(updatedProducts);
        }

        const onDeletePress = () => {
            Alert.alert('Are you sure you want to remove this item from the favorites?', '', [{ text: 'Yes', onPress: onRemove }, { text: 'Cancel' }])
        }
        return (
            <FavoriteItem onPress={onProductPress} onDeletePress={onDeletePress} {...item} />
        )
    }

    return (
        <SafeAreaView>
            <Header title="Favorites" />
            <FlatList ListEmptyComponent={(<Text style={{ textAlign: 'center', marginTop: 40 }}>Your list of favorites is empty</Text>)} data={favorites} renderItem={renderItem} keyExtractor={(item) => String(item?.id)} />
        </SafeAreaView>
    )
}

export default React.memo(Favorites);