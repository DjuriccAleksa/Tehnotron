import React from "react";
import { styles } from './style'
import { Image, TouchableOpacity, View } from "react-native";

const Checkbox = ({ checked, onCheck }) => {
    return (
        <TouchableOpacity activeOpacity={0.75} onPress={() => onCheck(!checked)} style={styles.container}>
            {checked ? (
                <View style={styles.innerContainer}>
                    <Image style={styles.checkIcon} source={require('../../resources/check.png')} />
                </View>
            ) : null}
        </TouchableOpacity>

    );
}

export default React.memo(Checkbox);

