import { StyleSheet } from "react-native";
import { colors } from "../../../utility/colors";

export const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    agreeTerms: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreeTermsText: {
        color: colors.blue,
        marginHorizontal: 13
    },
    agreeTermsTextBold: {
        fontWeight: 'bold',
    },
    button: {
        marginVertical: 20,
    },
    footerText: {
        color: colors.blue,
        marginBottom: 56,
        alignSelf: 'center'
    },
    footerTextLink: {
        fontWeight: 'bold'
    }
})