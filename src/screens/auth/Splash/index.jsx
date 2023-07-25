import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './style';
import Button from '../../../components/Button';

const Splash = ({ navigation }) => {
  const onSignup = () => {
    navigation.navigate('Signup');
  }

  const onSignin = () => {
    navigation.navigate('Signin');
  }

  return (
    <View style={styles.container}>
      <Image
        resizeMode='contain'
        style={styles.image}
        source={require('../../../resources/splash_image.png')}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You'll find</Text>
        <Text style={[styles.title, styles.innerTitle]}>All you need</Text>
        <Text style={styles.title}>Here!</Text>
      </View>

      <Button title="Sign up" onPress={onSignup}></Button>

      <Pressable hitSlop={20}>
        <Text style={styles.signInText} onPress={onSignin}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(Splash);
