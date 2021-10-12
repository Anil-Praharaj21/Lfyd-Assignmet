import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {Colors} from '../../assets/values/color';
import {Strings} from '../../assets/values/string';
import {styles} from '../../assets/values/styles';
import EmailView from '../components/EmailView';
import OTPView from '../components/OTPView';
import PhoneNumberView from '../components/PhoneNumberView';
import SignUpView from '../components/SignUpView';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
    };

    this.setPhoneNumberView = this.setPhoneNumberView.bind(this);
    this.setSignUpView = this.setSignUpView.bind(this);
    this.getUID = this.getUID.bind(this);
  }

  componentDidMount() {
    this.getUID();
  }

  async getUID() {
    try {
      const uid = await AsyncStorage.getItem(Strings.uid);
      this.setState({
        uid: uid,
      });
    } catch (error) {}
  }

  setPhoneNumberView() {
    this.props.showBottomDrawerDialog(
      <PhoneNumberView
        onSendButtonClick={(value, confirm) => {
          this.props.hideBottomDrawerDialog();
          this.setOTPView(value, confirm);
        }}
        onEmailButtonClick={value => {
          this.props.hideBottomDrawerDialog();
          this.setEmail();
        }}
        onOtherButtonClick={value => {
          this.props.hideBottomDrawerDialog();
          console.log('Value', value);
          if (value && value.user && value.user.uid) {
            this.saveUid(value.user.uid);
            this.setSignUpView(value.user.uid);
          }
        }}
      />,
    );
  }

  setOTPView(mobileNumber, confirm) {
    this.props.showBottomDrawerDialog(
      <OTPView
        mobile={mobileNumber}
        confirm={confirm}
        onVerifyClick={value => {
          this.props.hideBottomDrawerDialog();
          if (value && value.user && value.user.uid) {
            this.saveUid(value.user.uid);
            this.setSignUpView(value.user.uid);
          }
        }}
      />,
    );
  }

  setEmail() {
    this.props.showBottomDrawerDialog(
      <EmailView
        onSendButtonClick={value => {
          this.props.hideBottomDrawerDialog();
          if (value && value.user && value.user.uid) {
            this.saveUid(value.user.uid);
            this.setSignUpView(value.user.uid);
          }
        }}
        onPhoneButtonClick={value => {
          this.props.hideBottomDrawerDialog();
          this.setPhoneNumberView();
        }}
      />,
    );
  }

  setSignUpView(uid) {
    this.props.showBottomDrawerDialog(
      <SignUpView
        uid={uid}
        onSendButtonClick={value => {
          this.props.hideBottomDrawerDialog();
        }}
        onPhoneButtonClick={value => {
          this.props.hideBottomDrawerDialog();
          this.setPhoneNumberView();
        }}
      />,
    );
  }

  async saveUid(uid) {
    try {
      this.setState({
        uid: uid,
      });
      await AsyncStorage.setItem(Strings.uid, uid);
    } catch (e) {}
  }

  render() {
    return (
      <>
        <View style={styles.loginBackground}>
          <Image
            style={styles.loginAppIcon}
            source={require('../../assets/images/company_icon.png')}
          />
          <Image
            style={styles.subIcon}
            source={require('../../assets/images/training_image.png')}
          />

          <Text style={styles.title}>Never miss a sale</Text>

          <Text style={styles.subTitle}>
            Any upcomming sale at your nearby mall and by{'\n'}your favourite
            brands. You will be the first to get{'\n'}the information
          </Text>

          <View style={styles.indicator}>
            <View style={styles.dot} />

            <View style={styles.dot} />

            <View style={styles.dot} />

            <View style={styles.indicatorLine} />
          </View>

          <Button
            style={styles.buttonStyle}
            uppercase={false}
            labelStyle={styles.buttonLable}
            mode={Strings.contained}
            color={Colors.colorSecondary}
            onPress={() => {
              if (this.state.uid) {
                this.setSignUpView(this.state.uid);
              } else {
                this.setPhoneNumberView();
              }
            }}>
            Get started
          </Button>
        </View>
      </>
    );
  }
}

export default LoginScreen;
