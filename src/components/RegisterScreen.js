import React, { useState } from 'react';
import { Text, View, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {NAME,EMAIL,NUMBER} from '../container/constant'
const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const inputRef = React.createRef();
  const handleSubmitButton = async () => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const regname = /^[a-zA-Z_]*$/;
    if (!userName) {
      Alert.alert('Please fill Name');
      return;
    } else if (regname.test(userName) === false) {
      Alert.alert('Enter valid username');
      return;
    }
    if (!userEmail) {
      Alert.alert('Please fill Email');
      return;
    } else if (reg.test(userEmail) === false) {
      Alert.alert('Enter valid Email');
      return;
    }
    if (!userNumber) {
      Alert.alert('Please fill Number');
      return;
    }
    if (!(userNumber.length === 10)) {
      Alert.alert('Please fill correct mobile number');
    } else {
      postData();
    };
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: userName, email: userEmail, contact: userNumber })
  };
  const postData = async () => {
    fetch('http://192.168.35.135:8000/employee', requestOptions)
      .then(result => {
        console.log('####', result.json());
        handleResetButton();
        navigation.navigate('Dashboard', {
          username: userName
        });
      })
      .then(data => console.log(data));
  };
  const handleResetButton = () => {
    setUserName('');
    setUserEmail('');
    setUserNumber('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.container} >
      <Text style={styles.heading}>User Registration Form</Text>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
          underlineColorAndroid="#f000"
          placeholder={NAME}
          ref={inputRef}
          selectionColor="black"
          placeholderTextColor="black"/>
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          placeholder={EMAIL}
          value={userEmail}
          onChangeText={(userEmail) => setUserEmail(userEmail)}
          placeholderTextColor="black"
          selectionColor="black"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          value={userNumber}
          placeholder={NUMBER}
          onChangeText={(userNumber) => setUserNumber(userNumber)}
          placeholderTextColor="black"
          selectionColor="black"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity
          style={styles.reset_buttonStyle}
          activeOpacity={0.5}
          onPress={handleResetButton}>
          <Text style={styles.buttonTextStyle}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitButton}>
          <Text style={styles.buttonTextStyle}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#018786',
    alignContent: 'center',
    textAlign: 'center'
  },
  heading: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
    padding: 10

  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  button_container: {
    flexDirection: 'row'
  },
  reset_buttonStyle: {
    backgroundColor: 'red',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    width: '30%',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: -2,
    fontSize: 16
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    width: '30%',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20
  },
  buttonTextStyle1: {
    color: '#FFFFFF',
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: -2,
    fontSize: 16
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14
  }
});
