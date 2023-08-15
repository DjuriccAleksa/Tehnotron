import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, Image, View, Pressable, Linking, Alert } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import ImageCarousel from '../../../components/ImageCarousel';
import { API_BASE_URL } from '../../../../env';
import { addFavorite, deleteFavorite, isProductFavorite } from '../../../utility/apiCalls';
import { FavoritesContext, ProductContext, ProfileContext } from '../../../../App';
import { openInbox } from 'react-native-email-link';

const ProductDetails = ({ route, navigation }) => {
    const params = route?.params || {};

    const { products, setProducts } = useContext(ProductContext);
    const { profile } = useContext(ProfileContext);
    const { setFavorites } = useContext(FavoritesContext);
    const [productLiked, setProductLiked] = useState();

    const product = products.find(product => product?.id === params?.product?.id);

    useEffect(() => {
        (async () => {
            const isLiked = await isProductFavorite(profile?.id, product?.id);
            setProductLiked(isLiked);
        })()
    }, []);

    const onBackPress = () => {
        navigation.goBack();
    }

    const onContactEmail = async () => {
        try {
            const email = `mailto:${product.user?.email}`;
            await Linking.openURL(email);
        } catch (e) {
            Alert.alert('Error with oppenenig email application');
            try {
                await openInbox();
            } catch (e) {
                console.error("Can't open emaill app.");
            }
        }
    }

    const onContactPhone = async () => {
        try {
            const phoneNumber = product.user.phoneNumber;
            if (phoneNumber === null) {
                Alert.alert("This user doesn't have phone number", "Contact him via email");
                return;
            }

            await Linking.openURL(`tel:${phoneNumber}`);
        } catch (e) {
            Alert.alert('Phone number is not available');
        }
    }

    const onBookmark = async () => {
        let updatedProducts = [];
        if (productLiked)
            updatedProducts = await deleteFavorite(profile?.id, product?.id)
        else
            updatedProducts = await addFavorite(profile?.id, product?.id);

        setProductLiked((prev) => !prev);
        setFavorites(updatedProducts);
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>
                {product?.images?.length ? (
                    <ImageCarousel images={product?.images} />
                ) : (
                    <Image style={styles.image} source={{ uri: `${product?.thumbnailImage}` }} />
                )}
                <View style={styles.content}>
                    <Text style={styles.title}>{product?.title}</Text>
                    <Text style={styles.price}>{product?.price} RSD</Text>
                    <Text style={styles.description}>{product?.description}</Text>
                </View>

                <Pressable onPress={onBackPress} style={styles.backContainer}>
                    <Image style={styles.backIcon} source={require('../../../resources/back.png')} />
                </Pressable>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable onPress={onBookmark} style={styles.bookmarkPhoneContainer}>
                    <Image style={styles.bookmarkPhoneIcon} source={productLiked ?
                        require('../../../resources/TabIcons/favorites_active.png') :
                        require('../../../resources/TabIcons/favorites.png')} />
                </Pressable>
                <Button onPress={onContactEmail} title="Send email" />
                <Pressable onPress={onContactPhone} style={styles.bookmarkPhoneContainer}>
                    <Image styles={styles.bookmarkPhoneIcon} source={require('../../../resources/phone.png')} />
                </Pressable>
            </View>
        </SafeAreaView>
    )


}

export default React.memo(ProductDetails);