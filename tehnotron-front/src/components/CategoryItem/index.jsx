import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./style";

const CategoryItem = ({ title, image, onPress, isFirst, isSelected }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, isFirst ? { marginLeft: 24 } : {}]} >
            <View style={[styles.imageContainer, isSelected ? styles.selectedImageContainer : {}]}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <Text style={[styles.title, isSelected ? styles.selectedTitle : {}]}>{title}</Text>
        </Pressable >
    )
}

export default React.memo(CategoryItem);