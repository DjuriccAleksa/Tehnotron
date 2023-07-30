import React, { useState } from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { View, Text, ScrollView, Alert } from 'react-native';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button'
import Separator from '../../../components/Separator';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleLogin from '../../../components/GoogleLogin';
import { signUp } from '../../../utility/apiCalls';

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({});

  const onSignin = () => {
    navigation.navigate('Signin');
  }

  const onBack = () => {
    navigation.goBack();
  }

  const onChange = (key, value) => {
    setValues(v => ({ ...v, [key]: value }))
  }

  const onSubmit = async () => {
    try {
      if (!values?.fullName || !values?.email || !values?.password || !values?.confirmPassword) {
        Alert.alert('All fields are required');
        return;
      }

      if (values?.password !== values.confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      if (!checked) {
        Alert.alert("Please agree to the terms of use");
        return;
      }

      const response = await signUp(values);
      if (response) {
        Alert.alert('You have successfully created your account');
        navigation.navigate('Signin');
      }
    } catch (error) {
      console.log('error >>', error)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title={"Sign Up"} />

        <Input value={values.fullName} onChangeText={(v) => onChange('fullName', v)} label="Name" placeholder="John Doe" containerMargin={{ marginBottom: 20 }} />
        <Input value={values.email} onChangeText={(v) => onChange('email', v)} label="Email" placeholder="email@gmail.com" containerMargin={{ marginBottom: 20 }} />
        <Input value={values.password} onChangeText={(v) => onChange('password', v)} label="Password" placeholder="*****" isPassword containerMargin={{ marginBottom: 20 }} />
        <Input value={values.confirmPassword} onChangeText={(v) => onChange('confirmPassword', v)} label="Confirm Password" placeholder="*****" isPassword containerMargin={{ marginBottom: 20 }} />

        <View style={styles.agreeTerms}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeTermsText}>I agree with <Text style={styles.agreeTermsTextBold}>Terms & Privacy</Text></Text>
        </View>

        <Button onPress={onSubmit} style={styles.button} title="Sign Up" />

        <Separator text="Or sign up with" />

        <GoogleLogin />

        <Text style={styles.footerText}>Already have an acoount?
          <Text style={styles.footerTextLink} onPress={onSignin}> Sign in</Text>
        </Text>

      </ScrollView>
    </SafeAreaView>

  );
};

export default React.memo(Signup);
