import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigation/Navigator';
import {Colors} from './assets/values/color';
import BottomDrawerDialog from './app/components/BottomDrawerDialog';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showBottomDrawerDialog: false,
      bottomDialogInnerView: null,
    };

    this.showBottomDrawerDialog = this.showBottomDrawerDialog.bind(this);
    this.hideBottomDrawerDialog = this.hideBottomDrawerDialog.bind(this);
  }

  componentDidMount() {
    console.reportErrorsAsExceptions = false;
    console.disableYellowBox = true;
  }

  showBottomDrawerDialog(innerView) {
    this.setState({
      showBottomDrawerDialog: true,
      innerView: innerView,
    });
  }

  hideBottomDrawerDialog() {
    this.setState({
      showBottomDrawerDialog: false,
    });
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.colorPrimaryVariant} />
        <Navigator
          showBottomDrawerDialog={this.showBottomDrawerDialog}
          hideBottomDrawerDialog={this.hideBottomDrawerDialog}
        />
        <BottomDrawerDialog
          show={this.state.showBottomDrawerDialog}
          innerView={this.state.innerView}
          hideDialog={this.hideBottomDrawerDialog}
        />
      </NavigationContainer>
    );
  }
}

export default App;
