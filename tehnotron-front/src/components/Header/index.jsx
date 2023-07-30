import React, { useState } from "react"
import { styles } from './style'
import { Image, Pressable, Text, View } from "react-native"
import Input from "../Input";

const Header = ({ title, onBackPress, onLogout, onSearch, showLogout, showSearch, showBack, keyword }) => {
    const [showSearchInput, setShowSearchInput] = useState(false);

    const onSearchClick = () => {
        setShowSearchInput(prev => !prev);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                {showBack ? (
                    <Pressable hitSlop={20} onPress={onBackPress}>
                        <Image style={styles.icon} source={require('../../resources/back.png')} />
                    </Pressable>
                ) : showSearch ? (
                    <Pressable hitSlop={20} onPress={onSearchClick}>
                        <Image style={styles.icon} source={require('../../resources/search.png')} />
                    </Pressable>
                ) : <View style={styles.placeholder} />}
                <Text style={styles.title}>{title}</Text>

                {showLogout ? (
                    <Pressable hitSlop={20} onPress={onLogout}>
                        <Image style={styles.icon} source={require('../../resources/logout.png')} />
                    </Pressable>
                ) : <View style={styles.placeholder} />}
            </View>

            {showSearchInput ? (
                <Input onChangeText={onSearch} value={keyword} placeholder={"Type your keyword..."} />
            ) : null}

        </View>
    )
}

export default React.memo(Header);