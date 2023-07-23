import React from "react";
import { View, Text } from "react-native";
import { styles } from './style'

const Separator = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>{text}</Text>
            <View style={styles.line} />
        </View>
    )
}

export default React.memo(Separator);