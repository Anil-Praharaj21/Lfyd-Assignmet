import React, {useState} from 'react';
import {Image, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Button, Card, HelperText, IconButton, Modal} from 'react-native-paper';
import {Colors} from '../../assets/values/color';
import {Dimens} from '../../assets/values/dimes';
import auth from '@react-native-firebase/auth';
import {Strings} from '../../assets/values/string';
import {styles} from '../../assets/values/styles';

function EmailView({onSendButtonClick, onPhoneButtonClick}) {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const emailRegex = Strings.emailRegex;

  const validateEmail = () => {
    return email && emailRegex.test(email);
  };

  const validatePassword = () => {
    return password && password.length > 5;
  };

  const signInWithEmail = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userInfo => {
        onSendButtonClick(userInfo);
      })
      .catch(error => {});
  };

  return (
    <Card style={styles.modalCard}>
      <View style={styles.modalUpperBar} />

      <Text style={styles.modalTitle}>{Strings.emailViewTitle}</Text>

      <Text
        style={{
          flex: 1,
          fontSize: Dimens.subTitle2,
          textAlign: Strings.justify,
          marginLeft: Dimens.margin16,
          marginRight: Dimens.margin16,
          marginBottom: Dimens.margin16,
          color: Colors.colorOnPrimary,
        }}>
        {Strings.emailViewSubtext}
      </Text>

      <TextInput
        style={{
          borderRadius: 8,
          marginLeft: Dimens.margin16,
          marginRight: Dimens.margin16,
          backgroundColor: Colors.textInputBackground,
          paddingLeft: 16,
          paddingRight: 16,
          color: Colors.colorOnPrimary,
        }}
        keyboardType={'email-address'}
        placeholderTextColor={Colors.colorSecondaryVariant}
        placeholder={Strings.yourEmailId}
        onChangeText={value => {
          setEmail(value);
          setEmailError('');
        }}
      />

      <HelperText
        type="error"
        visible={Boolean(emailError)}
        style={{
          marginLeft: Dimens.margin24,
          marginRight: Dimens.margin24,
        }}>
        {emailError}
      </HelperText>

      <TextInput
        style={{
          borderRadius: 8,
          marginLeft: Dimens.margin16,
          marginRight: Dimens.margin16,
          backgroundColor: Colors.textInputBackground,
          paddingLeft: 16,
          paddingRight: 16,
          color: Colors.colorOnPrimary,
        }}
        secureTextEntry={true}
        keyboardType="visible-password"
        autoCompleteType="password"
        placeholderTextColor={Colors.colorSecondaryVariant}
        placeholder={'Your Password'}
        onChangeText={value => {
          setPassword(value);
          setPasswordError('');
        }}
      />

      <HelperText
        type="error"
        visible={Boolean(passwordError)}
        style={{
          marginLeft: Dimens.margin24,
          marginRight: Dimens.margin24,
        }}>
        {passwordError}
      </HelperText>

      <Button
        style={{
          margin: 16,
          borderRadius: 8,
        }}
        uppercase={false}
        labelStyle={{fontWeight: 'bold', padding: 8}}
        mode="contained"
        color={'#003577'}
        onPress={() => {
          if (validateEmail() && validatePassword()) {
            signInWithEmail();
          } else if (!validateEmail()) {
            setEmailError('Please enter a valid email id');
          } else if (!validatePassword()) {
            setPasswordError('Please enter a valid password(>5 letters)');
          }
        }}>
        Create Account
      </Button>

      <Text
        style={{
          fontSize: Dimens.subTitle1,
          color: Colors.colorOnPrimary,
          alignSelf: 'center',
        }}>
        or
      </Text>

      <View style={{alignSelf: 'center', margin: 16, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            signInWithGoogle();
          }}>
          <View
            style={{
              borderRadius: 40,
              borderWidth: 0.5,
              overflow: 'hidden',
              borderColor: Colors.colorSecondaryVariant,
              padding: 8,
              marginRight: Dimens.margin16,
            }}>
            <Image
              style={{
                resizeMode: 'center',
                height: 30,
                width: 30,
                alignSelf: 'center',
              }}
              source={require('../../assets/images/google_icon.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onPhoneButtonClick();
          }}>
          <View
            style={{
              borderRadius: 40,
              borderWidth: 0.5,
              overflow: 'hidden',
              borderColor: Colors.colorSecondaryVariant,
              padding: 8,
              marginLeft: Dimens.margin16,
              marginRight: Dimens.margin16,
            }}>
            <Image
              style={{
                resizeMode: 'center',
                height: 30,
                width: 30,
                alignSelf: 'center',
              }}
              source={require('../../assets/images/call_icon.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            signInWithGoogle();
          }}>
          <View
            style={{
              borderRadius: 40,
              borderWidth: 0.5,
              overflow: 'hidden',
              borderColor: Colors.colorSecondaryVariant,
              padding: 8,
              marginLeft: Dimens.margin16,
            }}>
            <Image
              style={{
                resizeMode: 'center',
                height: 30,
                width: 30,
                alignSelf: 'center',
              }}
              source={require('../../assets/images/facebook_icon.png')}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: Dimens.subTitle3,
          color: Colors.colorSecondaryVariant,
          alignSelf: 'center',
        }}>
        By continuing you agree to our
      </Text>

      <Button
        style={{marginBottom: Dimens.margin16}}
        uppercase={false}
        labelStyle={{fontWeight: 'bold', fontSize: Dimens.subTitle3}}
        mode="text"
        color={'#003577'}
        onPress={() => {}}>
        Terms{' & '}Condition
      </Button>
    </Card>
  );
}

export default EmailView;
