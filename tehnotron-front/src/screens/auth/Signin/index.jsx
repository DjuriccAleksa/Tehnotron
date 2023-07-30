import React, { useContext, useState } from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { Text, ScrollView, Alert } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../../../App';
import { signIn } from '../../../utility/apiCalls';

const Signin = ({ navigation }) => {
  const [values, setValues] = useState({});
  const { setUser } = useContext(UserContext);

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

      if (!values?.email) {
        Alert.alert('Email cant be empty');
        return;
      }
      if (!values?.password) {
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

        <Input value={values.email} onChangeText={(v) => onChange('email', v)} label="Email" placeholder="email@gmail.com" containerMargin={{ marginBottom: 20 }} />
        <Input value={values.password} onChangeText={(v) => onChange('password', v)} label="Password" placeholder="*****" isPassword containerMargin={{ marginBottom: 20 }} />

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
