import React from "react";
import {styles} from './style'
import { Text, TouchableOpacity } from "react-native";

const Button = ({title, onPress}) => {
    return(
        /*  bice visible da je kliknuto, ali clickable je samo ono u wrapperu */
        <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        
    );
}

export default Button;

 
        /* ima neki spacing outside koji takodje moze se klikne 
            property hit slop da se prosiri to da moze van se klikne
        <Pressable onPress={handlePress} hitSlop={20} style={styles.container}>
            <Text>{title}</Text>
        </Pressable>
        */