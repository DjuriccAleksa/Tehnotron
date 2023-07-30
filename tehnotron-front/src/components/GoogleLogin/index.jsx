import React from "react";
import { styles } from './style'
import { Image, TouchableOpacity } from "react-native";

const GoogleLogin = () => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.container}>
            <Image style={styles.image} source={require('../../resources/google.png')} />
        </TouchableOpacity>
    )
}

export default React.memo(GoogleLogin);