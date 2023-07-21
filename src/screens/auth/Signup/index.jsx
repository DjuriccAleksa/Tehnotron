import React from 'react';
import { styles } from './style'
import AuthHeader from '../../../components/AuthHeader';

const Signup = () => {
  return (
    <View style={styles.container}>
      <AuthHeader title={"Sign Up"} />
    </View>
  );
};

export default Signup;
