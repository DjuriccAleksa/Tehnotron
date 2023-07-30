import React from "react";
import { styles } from './style';
import { Image, Pressable, Text } from "react-native";
import { API_BASE_URL } from "../../../env";


const ProductHomeItem = ({ title, price, image, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={{ uri: `${API_BASE_URL}${image?.path}` }} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price} RSD</Text>
        </Pressable>
    )
}

export default ProductHomeItem;