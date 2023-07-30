import { StyleSheet } from "react-native";
import { colors } from '../../utility/colors'

export const styles = StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: colors.darkGrey,
        borderRadius: 14,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginBottom: 40
    },
    image: {
        width: 30,
        height: 30
    }
})