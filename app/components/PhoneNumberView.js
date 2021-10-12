import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Button, Card, HelperText, IconButton, Modal} from 'react-native-paper';
import {Colors} from '../../assets/values/color';
import {Dimens} from '../../assets/values/dimes';
import {Strings} from '../../assets/values/string';

import {styles} from '../../assets/values/styles';
import * as controller from '../controller/LoginController';

function PhoneNumberView({
  onSendButtonClick,
  onEmailButtonClick,
  onOtherButtonClick,
}) {
  const [mobile, setMobile] = useState();
  const [mobileError, setMobileError] = useState();
  const reg = /^[0-9]\d{9}$/;

  useEffect(() => {
    controller.setGoogleConfigur();
  }, []);

  const validateMobile = () => {
    return mobile && reg.test(mobile);
  };

  const signInWithPhoneNumber = () => {
    controller.signInWithPhoneNumber(mobile, onSendButtonClick, () => {});
  };

  const signInWithGoogle = async () => {
    controller.signInWithGoogle(
      data => {
        onOtherButtonClick(data);
      },
      error => {},
    );
  };

  const signInWithFacebook = async () => {
    controller.signInWithFacebook(
      data => {
        onOtherButtonClick(data);
      },
      error => {},
    );
  };

  return (
    <Card style={styles.modalCard}>
      <View style={styles.modalUpperBar} />

      <Text style={styles.modalTitle}>Enter phone number</Text>

      <Text style={styles.phoneNumberSubText}>
        We will send you a 4-digit OTP to your phone number{'\n'}for
        verification
      </Text>

      <View style={styles.rowFlex}>
        <View style={styles.circularParent}>
          <Image
            style={styles.indiaFlag}
            source={require('../../assets/images/india_flag.png')}
          />
        </View>

        <Text style={styles.indiaText}>India</Text>

        <View style={styles.deviderHorizontal} />

        <Text style={styles.subTextCode}>+91</Text>

        <IconButton
          size={20}
          style={{position: 'absolute', right: 0}}
          color={Colors.colorSecondaryVariant}
          icon={'clipboard-arrow-down'}
        />
      </View>

      <TextInput
        style={styles.mobileText}
        keyboardType={'phone-pad'}
        maxLength={10}
        placeholderTextColor={Colors.colorSecondaryVariant}
        placeholder={'Your 10-digit phone number'}
        onChangeText={value => {
          setMobile(value);
          setMobileError('');
          if (value && value.length === 10) {
            Keyboard.dismiss();
          }
        }}
      />

      <HelperText
        type="error"
        visible={Boolean(mobileError)}
        style={{
          marginLeft: Dimens.margin24,
          marginRight: Dimens.margin24,
        }}>
        {mobileError}
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
          if (validateMobile()) {
            signInWithPhoneNumber();
            // onSendButtonClick();
          } else {
            setMobileError('Please enter a valid mobile number');
          }
        }}>
        Send OTP
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
            onEmailButtonClick();
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
              source={require('../../assets/images/email_icon.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            signInWithFacebook();
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
        {Strings.termsAndConditionTitle}
      </Text>

      <Button
        style={{marginBottom: Dimens.margin16}}
        uppercase={false}
        labelStyle={{fontWeight: 'bold', fontSize: Dimens.subTitle3}}
        mode="text"
        color={'#003577'}
        onPress={() => {}}>
        {Strings.termsAndCondition}
      </Button>
    </Card>
  );
}

export default PhoneNumberView;
