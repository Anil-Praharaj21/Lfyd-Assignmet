import React, {useState} from 'react';
import {Image, Text, View, TextInput, Keyboard} from 'react-native';
import {Button, Card, HelperText, IconButton, Modal} from 'react-native-paper';
import {Colors} from '../../assets/values/color';
import {Dimens} from '../../assets/values/dimes';
import {Strings} from '../../assets/values/string';
import {styles} from '../../assets/values/styles';
import OTPTextView from './OtpInputs';
import * as controller from '../controller/LoginController';

function OTPView({mobile, confirm, onVerifyClick}) {
  const [otp, setOTP] = useState();
  const [otpError, setOtpError] = useState();
  const [clear, setClear] = useState(false);

  const validateOTP = () => {
    return otp && otp.length === 6;
  };

  const checkOTP = () => {
    controller.checkOTP(confirm, otp, onVerifyClick, () => {});
  };

  return (
    <Card style={styles.modal}>
      <View style={styles.modalUpperBar} />

      <Text style={styles.modalTitle}>{Strings.otpTitle}</Text>

      <Text
        style={{
          flex: 1,
          fontSize: Dimens.subTitle2,
          textAlign: Strings.justify,
          marginLeft: Dimens.margin16,
          marginRight: Dimens.margin16,
          color: Colors.colorOnPrimary,
        }}>
        {Strings.otpSubtext}
      </Text>

      <Text
        style={{
          flex: 1,
          fontSize: Dimens.subTitle2,
          textAlign: Strings.justify,
          marginTop: Dimens.margin,
          marginLeft: Dimens.margin16,
          marginRight: Dimens.margin16,
          color: Colors.colorOnPrimary,
        }}>
        +91-{mobile}
      </Text>

      <View
        style={{
          marginTop: Dimens.margin16,
          marginLeft: Dimens.margin16,
          marginRight: Dimens.margin16,
        }}>
        <OTPTextView
          clear={clear}
          clearState={val => setClear(val)}
          handleTextChange={value => {
            setOTP(value);
            setOtpError('');
            if (value && value.length === 6) {
              Keyboard.dismiss();
            }
          }}
        />
      </View>

      <HelperText type="error" visible={Boolean(otpError)}>
        {otpError}
      </HelperText>

      <Button
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 8,
          marginBottom: 16,
          borderRadius: 8,
        }}
        uppercase={false}
        labelStyle={{fontWeight: 'bold', padding: 8}}
        mode="contained"
        color={'#003577'}
        onPress={() => {
          if (validateOTP()) {
            checkOTP();
          } else {
            setOtpError('Please enter a valid OTP');
          }
        }}>
        Send OTP
      </Button>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          marginBottom: Dimens.margin30,
        }}>
        <Text
          style={{fontSize: Dimens.subTitle3, color: Colors.colorOnPrimary}}>
          Didn’t receive OTP?
        </Text>

        <Button
          mode="text"
          labelStyle={{fontSize: Dimens.subTitle3}}
          color={'#003577'}
          onPress={() => {
            sendOTPRequest();
            sendOtp();
          }}>
          Resend OTP
        </Button>
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

export default OTPView;
