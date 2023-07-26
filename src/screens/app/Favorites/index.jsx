import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../../../data/products";
import FavoriteItem from "../../../components/FavoriteItem"
import Header from "../../../components/Header";

const Favorites = ({ navigation }) => {
    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item })
        }
        return (
            <FavoriteItem onPress={onProductPress} {...item} />
        )
    }

    return (
        <SafeAreaView>
            <Header title="Favorites" />
            <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => String(item?.id)} />
        </SafeAreaView>
    )
}

export default React.memo(Favorites);