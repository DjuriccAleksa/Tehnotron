import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { styles } from './style'

const Input = ({ label, placeholder, isPassword, containerMargin, value, onChangeText }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onEyePress = () => {
        setIsPasswordVisible(prevState => !prevState);
    }

    return (
        <View style={[styles.container, containerMargin]}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput value={value} onChangeText={onChangeText} secureTextEntry={isPassword && !isPasswordVisible} style={styles.input} placeholder={placeholder} />

                {
                    isPassword ?
                        (<Pressable onPress={onEyePress}>
                            <Image style={styles.eye} source={isPasswordVisible ? require('../../resources/eye_open.png') : require('../../resources/eye_closed.png')} />
                        </Pressable>) : null
                }
            </View>
        </View>
    )
}

export default React.memo(Input);