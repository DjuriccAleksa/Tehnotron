import React, { useState } from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { Text, ScrollView } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';

const Signin = () => {

  const onSignUp = () => {
    console.log("Sign up");
  }

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title={"Sign In"} />

      <Input label="Email" placeholder="email@gmail.com" />
      <Input label="Password" placeholder="*****" isPassword />

      <Button style={styles.button} title="Sign In" />

      <Separator text="Or sign in with" />

      <GoogleLogin />

      <Text style={styles.footerText}>Don't have an acoount?
        <Text style={styles.footerTextLink} onPress={onSignUp}> Sign Up</Text>
      </Text>

    </ScrollView>
  );
};

export default React.memo(Signin);
