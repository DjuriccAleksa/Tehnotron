import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import { ProfileContext } from '../../../../App';
import { deleteProduct, getMyListingProducts } from '../../../utility/apiCalls';

const MyListings = ({ navigation }) => {
    const [myProducts, setMyProducts] = useState([]);
    const { profile } = useContext(ProfileContext);

    useEffect(() => {
        (async () => {
            const products = await getMyListingProducts(profile?.id);
            setMyProducts(products);
        })()
    }, [])

    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item })
        }

        const onRemove = async () => {
            const updatedProducts = await deleteProduct(item?.id, profile?.id);
            setMyProducts(updatedProducts);
        }

        const onDeletePress = () => {
            Alert.alert('Are you sure you want to remove this item from your listing?', '', [{ text: 'Yes', onPress: onRemove }, { text: 'Cancel' }])
        }

        return (
            <FavoriteItem onDeletePress={onDeletePress} icon={require('../../../resources/delete.png')} onPress={onProductPress} {...item} />
        )
    }

    const goBack = () => navigation.goBack()

    return (
        <SafeAreaView>
            <Header title="My Listings" showBack onBackPress={goBack} />

            <FlatList ListEmptyComponent={(<Text style={{ textAlign: 'center', marginTop: 40 }}>You don't have published product currently.</Text>)} data={myProducts} renderItem={renderItem} keyExtractor={(item) => String(item?.id)} />
        </SafeAreaView>
    )
}

export default React.memo(MyListings);