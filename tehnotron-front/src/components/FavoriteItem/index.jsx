import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { styles } from './style';
import { API_BASE_URL } from '../../../env';

const FavoriteItem = ({ title, price, icon, thumbnailImage, onPress, onDeletePress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={{ uri: `${thumbnailImage}` }} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
            <Pressable onPress={onDeletePress}>
                <Image source={icon || require('../../resources/remove_favorite.png')} style={styles.icon} />
            </Pressable>

        </Pressable>
    )
}

export default React.memo(FavoriteItem);