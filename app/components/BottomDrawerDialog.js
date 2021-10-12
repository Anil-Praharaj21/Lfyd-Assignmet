import React from 'react';
import {View} from 'react-native';
import {Modal} from 'react-native-paper';
import {styles} from '../../assets/values/styles';

function BottomDrawerDialog({show, innerView, hideDialog}) {
  return (
    <Modal
      visible={show}
      contentContainerStyle={styles.modal}
      onDismiss={() => {
        hideDialog();
      }}>
      <View>{innerView ? innerView : <></>}</View>
    </Modal>
  );
}

export default BottomDrawerDialog;
