import React, { useState } from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { View, Text, ScrollView, Alert } from 'react-native';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUp } from '../../../utility/apiCalls';

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({
    Fullname: '',
    UserName: '',
    Email: '',
    Password: '',
    PhoneNumber: ''
  });

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
      if (!values?.Fullname || !values?.Email || !values?.Password || !values?.UserName) {
        Alert.alert('All fields expected phone number are required');
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

        <Input name="Fullname" value={values.Fullname} onEndEditing={onChange} label="Name and surname" placeholder="John Doe" containerMargin={{ marginBottom: 20 }} />
        <Input name="UserName" value={values.UserName} onEndEditing={onChange} label="Username" placeholder="JohnDoe10" containerMargin={{ marginBottom: 20 }} />
        <Input name="Email" value={values.Email} onEndEditing={onChange} label="Email" placeholder="email@gmail.com" containerMargin={{ marginBottom: 20 }} />
        <Input name="Password" value={values.Password} onEndEditing={onChange} label="Password" placeholder="*****" isPassword containerMargin={{ marginBottom: 20 }} />
        <Input name="PhoneNumber" value={values.PhoneNumber} onEndEditing={onChange} label="Phone number" placeholder="+3816.." containerMargin={{ marginBottom: 20 }} />

        <View style={styles.agreeTerms}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeTermsText}>I agree with <Text style={styles.agreeTermsTextBold}>Terms & Privacy</Text></Text>
        </View>

        <Button onPress={onSubmit} style={styles.button} title="Sign Up" />

        <Text style={styles.footerText}>Already have an acoount?
          <Text style={styles.footerTextLink} onPress={onSignin}> Sign in</Text>
        </Text>

      </ScrollView>
    </SafeAreaView>

  );
};

export default React.memo(Signup);
