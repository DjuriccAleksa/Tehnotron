import { StyleSheet } from "react-native";
import { colors } from "../../utility/colors";

export const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 24,
        marginTop: 16,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        color: colors.primaryBlack,
        fontWeight: 'bold'
    },
    icon: {
        width: 24,
        height: 24
    },
    placeholder: {
        width: 24
    }
})