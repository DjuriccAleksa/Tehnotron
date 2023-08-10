import React, { useContext, useState } from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { Text, ScrollView, Alert, TextInput } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../../../App';
import { signIn } from '../../../utility/apiCalls';

const Signin = ({ navigation }) => {
  const [values, setValues] = useState({ UserName: '', Password: '' });
  const { setUser } = useContext(UserContext);
  console.log(values);
  const onSignUp = () => {
    navigation.navigate('Signup');
  }

  const onBack = () => {
    navigation.goBack();
  }

  const onChange = (key, value) => {
    setValues(v => ({ ...v, [key]: value }))
  }

  const onSubimt = async () => {
    try {

      if (!values?.UserName) {
        Alert.alert('Username cant be empty');
        return;
      }
      if (!values?.Password) {
        Alert.alert('Password cant be empty');
        return;
      }

      const token = await signIn(values);
      setUser({ token });
    } catch (e) {
      console.log('e >>', e)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title={"Sign In"} />

        <Input name="UserName" value={values.UserName} onEndEditing={onChange} label="Username" placeholder="username" containerMargin={{ marginBottom: 20 }} />
        <Input name="Password" value={values.Password} onEndEditing={onChange} label="Password" placeholder="*****" isPassword containerMargin={{ marginBottom: 20 }} />

        <Button onPress={onSubimt} style={styles.button} title="Sign In" />

        <Separator text="Or sign in with" />

        <GoogleLogin />

        <Text style={styles.footerText}>Don't have an acoount?
          <Text style={styles.footerTextLink} onPress={onSignUp}> Sign Up</Text>
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Signin);
