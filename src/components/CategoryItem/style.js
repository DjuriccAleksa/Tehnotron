import { StyleSheet } from "react-native";
import { colors } from "../../utility/colors";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    imageContainer: {
        backgroundColor: colors.lightGrey,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    },
    image: {
        width: 32,
        height: 32
    },
    title: {
        color: colors.grey
    },
    selectedImageContainer: {
        backgroundColor: colors.primaryBlack
    },
    selectedTitle: {
        color: colors.blue,
        fontWeight: '500'
    }
})