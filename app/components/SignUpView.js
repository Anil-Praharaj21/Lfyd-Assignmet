import React, {useState} from 'react';
import {Text, View, TextInput, PermissionsAndroid} from 'react-native';
import {Button, Card, Menu} from 'react-native-paper';
import {Colors} from '../../assets/values/color';
import {Dimens} from '../../assets/values/dimes';
import {styles} from '../../assets/values/styles';
import {launchCamera} from 'react-native-image-picker';
import * as controller from '../controller/LoginController';
import {Strings} from '../../assets/values/string';

function SignUpView({uid, onSendButtonClick, onPhoneButtonClick}) {
  const [documentDetails, setDocumentDetails] = useState();
  const [profile, setProfile] = useState();
  const [name, setName] = useState();

  const accessCamera = () => {
    launchCamera({}, response => {
      if (response && !response.errorCode && !response.didCancel) {
        setDocumentDetails(response);
        controller.uploadImage(
          response,
          value => {
            setProfile(value);
          },
          error => {
            console.log(error);
          },
        );
      } else if (
        response &&
        response.errorCode &&
        response.errorCode === 'others' &&
        !response.didCancel
      ) {
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ).then(response => {
            if (response && response === 'granted') {
              accessCamera();
            }
          });
        }
      }
    });
  };

  const verifyData = () => {
    return name;
  };

  const updateData = () => {
    const params = {
      uid: uid,
      name: name,
      profile: profile,
    };
    console.log('Data 3131', params);
    controller.updateUserData(
      params,
      () => {},
      () => {},
    );
  };

  return (
    <Card style={styles.modal}>
      <View style={styles.modalUpperBar} />
      <Text style={styles.modalTitle}>Sign Up</Text>
      <Text
        style={{
          flex: 1,
          fontSize: Dimens.subTitle2,
          textAlign: 'justify',
          marginLeft: Dimens.margin16,
          marginRight: Dimens.margin16,
          marginBottom: Dimens.margin16,
          color: Colors.colorOnPrimary,
        }}>
        {Strings.signUpTitle}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: Dimens.subTitle1,
            marginLeft: Dimens.margin16,
            fontWeight: 'bold',
            color: Colors.colorOnPrimary,
          }}>
          {Strings.profilePicture}
        </Text>

        <Text
          style={{
            fontSize: Dimens.subTitle1,
            color: Colors.colorSecondaryVariant,
          }}>
          {Strings.optional}
        </Text>
      </View>
      <Button
        style={{
          marginLeft: 16,
          marginRight: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
        disabled={
          documentDetails &&
          documentDetails.assets &&
          documentDetails.assets.length != 0 &&
          documentDetails.assets.fileName
        }
        icon={'cloud-upload'}
        uppercase={false}
        labelStyle={{fontWeight: 'bold', padding: 8}}
        mode="outlined"
        color={'#003577'}
        onPress={() => {
          accessCamera();
        }}>
        {Strings.uploadPicture}
      </Button>
      <Text
        style={{
          flex: 1,
          fontSize: Dimens.subTitle1,
          marginLeft: Dimens.margin16,
          fontWeight: 'bold',
          color: Colors.colorOnPrimary,
        }}>
        {Strings.name}
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
        placeholderTextColor={Colors.colorSecondaryVariant}
        placeholder={'Your name'}
        onChangeText={value => {
          setName(value);
        }}
      />
      <Button
        style={{
          margin: 16,
          borderRadius: 8,
        }}
        uppercase={false}
        labelStyle={{fontWeight: 'bold', padding: 8}}
        mode="outlined"
        color={'#003577'}
        onPress={() => {
          if (verifyData()) {
            updateData();
          }
        }}>
        {Strings.next}
      </Button>

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

export default SignUpView;
