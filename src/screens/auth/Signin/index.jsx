import React from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { Text, ScrollView } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signin = ({ navigation }) => {

  const onSignUp = () => {
    navigation.navigate('Signup');
  }

  const onBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title={"Sign In"} />

        <Input label="Email" placeholder="email@gmail.com" containerMargin={{ marginBottom: 20 }} />
        <Input label="Password" placeholder="*****" isPassword containerMargin={{ marginBottom: 20 }} />

        <Button style={styles.button} title="Sign In" />

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
