import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, Image, View, Pressable, Linking } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import ImageCarousel from '../../../components/ImageCarousel';
import { API_BASE_URL } from '../../../../env';
import { addFavorite, deleteFavorite, isProductFavorite } from '../../../utility/apiCalls';
import { FavoritesContext, ProductContext, ProfileContext } from '../../../../App';

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

    const onContact = () => {
        //     // Make a phone call
        //     const phone = '127282827'
        //     Linking.openURL(`tel:${phone}`); iz react nativea linking biblioteka.. sa ovim tel ispred prepozna kao telefonski broj

        //     // Send an Email
        //     const email = 'support@mail.com'
        //     Linking.openURL(`mailto:${email}`)
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
                <Pressable onPress={onBookmark} style={styles.bookmarkContainer}>
                    <Image style={styles.bookmarkIcon} source={productLiked ?
                        require('../../../resources/TabIcons/favorites_active.png') :
                        require('../../../resources/TabIcons/favorites.png')} />
                </Pressable>
                <Button onPress={onContact} title="Contact Seller" />
            </View>
        </SafeAreaView>
    )


}

export default React.memo(ProductDetails);