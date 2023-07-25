import React, { useState } from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';
import { View, Text, ScrollView } from 'react-native';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button'
import Separator from '../../../components/Separator';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleLogin from '../../../components/GoogleLogin';

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);

  const onSignin = () => {
    navigation.navigate('Signin');
  }

  const onBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title={"Sign Up"} />

        <Input label="Name" placeholder="John Doe" containerMargin={{ marginBottom: 20 }} />
        <Input label="Email" placeholder="email@gmail.com" containerMargin={{ marginBottom: 20 }} />
        <Input label="Password" placeholder="*****" isPassword containerMargin={{ marginBottom: 20 }} />

        <View style={styles.agreeTerms}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeTermsText}>I agree with <Text style={styles.agreeTermsTextBold}>Terms & Privacy</Text></Text>
        </View>

        <Button style={styles.button} title="Sign Up" />

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
