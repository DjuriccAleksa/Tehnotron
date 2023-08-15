import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../utility/colors";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        margin: 8,
        width: (width - 64) / 2
    },
    title: {
        color: colors.textGrey,
    },
    image: {
        width: (width - 64) / 2,
        height: 220,
        borderRadius: 8,
        resizeMode: 'contain'
    },
    price: {
        color: colors.primaryBlack,
        paddingBottom: 8
    }
})