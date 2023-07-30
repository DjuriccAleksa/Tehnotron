import React, { useContext } from 'react';
import { Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../../data/products';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import { ProfileContext, ServicesContext } from '../../../../App';
import { deleteService } from '../../../utility/apiCalls';

const MyListings = ({ navigation }) => {
    const { services, setServices } = useContext(ServicesContext);
    const { profile } = useContext(ProfileContext);
    const myServices = Array.isArray(services) ? services?.filter(service => service?.owner === profile?._id) : [];

    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item })
        }

        const onRemove = async () => {
            const updatedServices = await deleteService(item?._id,);
            setServices(updatedServices);

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

            <FlatList data={myServices} renderItem={renderItem} keyExtractor={(item) => String(item?._id)} />
        </SafeAreaView>
    )
}

export default React.memo(MyListings);