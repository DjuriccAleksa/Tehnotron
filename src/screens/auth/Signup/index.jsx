import React, { useState } from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { View, Text, ScrollView } from 'react-native';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button'
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';

const Signup = () => {
  const [checked, setChecked] = useState(false);

  const onSignIn = () => {

  }

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title={"Sign Up"} />

      <Input label="Name" placeholder="John Doe" />
      <Input label="Email" placeholder="email@gmail.com" />
      <Input label="Password" placeholder="*****" isPassword />

      <View style={styles.agreeTerms}>
        <Checkbox checked={checked} onCheck={setChecked} />
        <Text style={styles.agreeTermsText}>I agree with <Text style={styles.agreeTermsTextBold}>Terms & Privacy</Text></Text>
      </View>

      <Button style={styles.button} title="Sign Up" />

      <Separator text="Or sign up with" />

      <GoogleLogin />

      <Text style={styles.footerText}>Already have an acoount?
        <Text style={styles.footerTextLink} onPress={onSignIn}> Sign in</Text>
      </Text>

    </ScrollView>
  );
};

export default React.memo(Signup);
