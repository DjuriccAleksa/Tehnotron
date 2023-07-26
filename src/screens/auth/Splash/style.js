import { StyleSheet } from 'react-native';
import { colors } from '../../../utility/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  image: {
    width: '100%',
    height: 200,
  },
  titleContainer: {
    marginVertical: 54
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primaryBlack,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  innerTitle: {
    color: colors.orange,
    textDecorationLine: 'underline',
    fontSize: 40
  },
  signInText: {
    color: colors.blue,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  }
});
