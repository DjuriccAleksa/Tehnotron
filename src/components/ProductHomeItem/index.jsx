import React from "react";
import { styles } from './style';
import { Image, Pressable, Text } from "react-native";


const ProductHomeItem = ({ title, price, image, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={{ uri: image }} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
        </Pressable>
    )
}

export default ProductHomeItem;