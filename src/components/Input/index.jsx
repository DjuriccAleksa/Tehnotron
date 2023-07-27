import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View, Modal, TouchableOpacity } from "react-native";
import { styles } from './style'

const Input = ({ label, type, placeholder, isPassword, containerMargin, value, onChangeText, options, style, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPickerModalVisible, setPickerModalVisible] = useState(false);

    const onEyePress = () => {
        setIsPasswordVisible(prevState => !prevState);
    }

    const onSelect = (opt) => {
        onChangeText(opt);
        setPickerModalVisible(false);
    }

    const RenderPicker = () => {
        return (
            <Pressable onPress={() => setPickerModalVisible(true)} style={styles.inputContainer}>
                {value ? (
                    <Text style={[styles.input, style]}>{value?.title}</Text>
                ) : (
                    <Text style={[styles.placeholder, style]}>{placeholder}</Text>
                )}

                <Image style={styles.arrow} source={require('../../resources/arrow.png')} />
            </Pressable>
        )
    }

    const RenderInput = () => {
        return (<View style={styles.inputContainer}>
            <TextInput value={value} onChangeText={onChangeText} secureTextEntry={isPassword && !isPasswordVisible} style={[styles.input, style]} placeholder={placeholder} {...props} />

            {
                isPassword ?
                    (<Pressable onPress={onEyePress}>
                        <Image style={styles.eye} source={isPasswordVisible ? require('../../resources/eye_open.png') : require('../../resources/eye_closed.png')} />
                    </Pressable>) : null
            }
        </View>)
    }

    return (
        <View style={[styles.container, containerMargin]}>
            <Text style={styles.label}>{label}</Text>
            {type === 'picker' ? <RenderPicker /> : <RenderInput />}

            <Modal transparent visible={isPickerModalVisible}>
                <TouchableOpacity activeOpacity={1} onPress={() => setPickerModalVisible(false)} style={styles.modalWrapper}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                        <Text style={styles.headerTitle}>Select options</Text>

                        {options?.map(opt => {
                            if (!opt?.id) {
                                return null;
                            }

                            const selected = value?.id === opt?.id;

                            return (
                                <Text onPress={() => onSelect(opt)} style={[styles.optionText, selected ? styles.selectedOption : {}]} key={opt?.title}>{opt?.title}</Text>
                            )
                        })}

                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default React.memo(Input);