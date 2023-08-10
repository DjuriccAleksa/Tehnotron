import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./style";

const CategoryItem = ({ name, image, onPress, isFirst, isSelected }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, isFirst ? { marginLeft: 24 } : {}]} >
            <View style={[styles.imageContainer, isSelected ? styles.selectedImageContainer : {}]}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <Text style={[styles.title, isSelected ? styles.selectedTitle : {}]}>{name}</Text>
        </Pressable >
    )
}

export default React.memo(CategoryItem);