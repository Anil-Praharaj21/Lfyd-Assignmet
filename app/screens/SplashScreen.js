import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {styles} from '../../assets/values/styles';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      const getData = async () => {
        props.showLogin(true);
      };
      getData();
    }, 2000);
  }, []);

  return (
    <View style={styles.screen}>
      <Image
        style={styles.splashIcon}
        source={require('../../assets/images/company_icon.png')}
      />
    </View>
  );
};

export default SplashScreen;
