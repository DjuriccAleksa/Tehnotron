import React, { useContext } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './style';
import Button from '../../../components/Button';
import { UserContext } from '../../../../App';

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

      <View style={styles.buttonContainer}>
        <Button title="Sign up" onPress={onSignup}></Button>
      </View>


      <Pressable hitSlop={20}>
        <Text style={styles.signInText} onPress={onSignin}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(Splash);
