import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, Animated, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import Toast from 'react-native-toast-message'

import axios from 'axios'

function AnimatedInput({ value, onChangeText, placeholder, keyboardType, placeholderTextColor, secureTextEntry }) {
  const [inputHeight, setHeight] = useState(null);
  const [placeholderWidth, setWidth] = useState(null);


  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 2],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });
  const onFocus = () => animate(1);
  const onBlur = () => !value && animate(0);
  const animate = val => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View
      style={styles.inputContainer}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
        <Animated.Text
          style={[
            styles.placeholder,
            { transform: [{ translateY }, { translateX }, { scale }] },
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {placeholder}
        </Animated.Text>
      </View>
      <TextInput
        style={[
          styles.input,

        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}

        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}

      />
    </View>
  );
}

const SignUp = props => {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const [nameError, setnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length > 8;
  };

  const handleRegistration = () => {
    setnameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (name.trim() === "") {
      setnameError("Name is required.")
      isValid = false;
    }

    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };



  const Register = async () => {
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 1500)
    const registrationResult = handleRegistration();

    if (registrationResult.success) {


      const FormData = require('form-data');
      let data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);

      props.dispatch(userActions.register(data,props));
      
    }


  }







  return (

    <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>



      <View style={{ marginHorizontal: 20, marginTop: 20 }}>

        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.navigation.pop()}>
          <Image style={{ alignSelf: 'center', height: 22, width: 22, marginRight: 10, tintColor: '#000266' }} source={require('../../Images/back.png')} />
          <Text style={{ color: '#000266', fontSize: 15, fontWeight: '600' }}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginHorizontal: 20 }}>

        <Text style={{ fontSize: 28, textAlign: 'center', marginTop: 70, fontWeight: '500', color: '#000266' }}>Create Account</Text>
        <View style={{ flex: 1, }}>

          {/* <TextInput
            ref={input => { textInputname = input }}
            placeholder='Full Name  '
            placeholderTextColor="black"
            style={{ borderBottomWidth: 1.5, borderColor: '#000266', width: '90%', alignSelf: 'center',color:'#000', margin: 5, marginTop: 50 }}
            onChangeText={(text) => setname(text)}
            value={name}

          /> */}
          <AnimatedInput value={name} onChangeText={setname} placeholder="Full Name " placeholderTextColor="black" />
          {nameError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{nameError}</Text>}
          {/* <TextInput
            ref={input => { textInputemail = input }}
            placeholder='Email Id '
            placeholderTextColor="black"
            style={{ borderBottomWidth: 1.5, borderColor: '#000266', width: '90%', alignSelf: 'center', margin: 5, color: '#000' }}
            onChangeText={(text) => setemail(text)}
            keyboardType='email-address'
            value={email}
          /> */}
          <AnimatedInput value={email} onChangeText={setemail} placeholder="Email Id " keyboardType='email-address' placeholderTextColor="black" />
          {emailError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{emailError}</Text>}
          {/* <TextInput
            ref={input => { textInputpass = input }}
            placeholder='Password'
            placeholderTextColor="black"
            secureTextEntry={true}
            style={{ borderBottomWidth: 1.5, borderColor: '#000266', width: '90%', alignSelf: 'center', margin: 5, color: '#000' }}
            onChangeText={(text) => setpassword(text)}
            value={password}
          /> */}
          <AnimatedInput value={password} onChangeText={setpassword} placeholder="Password" placeholderTextColor="black" secureTextEntry={true} />
          {passwordError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{passwordError}</Text>}
          {/* <TextInput
            ref={input => { textInputconpass = input }}
            placeholder='Confirm Password'
            placeholderTextColor="black"
            secureTextEntry={true}
            style={{ borderBottomWidth: 1.5, borderColor: '#000266', width: '90%', alignSelf: 'center', margin: 5, color: '#000' }}
            onChangeText={(text) => setconfirmPassword(text)}
            value={confirmPassword}
          /> */}
          <AnimatedInput value={confirmPassword} onChangeText={setconfirmPassword} placeholder="Confirm Password" placeholderTextColor="black" secureTextEntry={true} />
          {confirmPasswordError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{confirmPasswordError}</Text>}

          <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
          >
            <View
              style={{
                marginTop: 240,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(231, 231, 231,0)', backfaceVisibility: 'visible'
              }}>
              <ActivityIndicator color={"#6CC417"} size={'large'} />
              <Text style={{ color: "#6CC417", fontSize: 13, }}>
                Loading....
              </Text>
            </View>
          </Modal>

          <TouchableOpacity style={{ width: '70%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 8, marginTop: 60 }} onPress={() => Register()}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '500' }}>Create  Account</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 30, alignSelf: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#000' }}>Already have an Account?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={{ fontWeight: '700', color: '#000266' }}> Login Now</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>


    </ScrollView>
  )
}

function mapStateToProps(state) {

  // const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    // loggingIn,
    users,

  };
}
export default connect(mapStateToProps)(SignUp);
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    borderBottomWidth: 2,
    marginHorizontal: 20,
    borderBottomColor: '#000266',
    // borderRadius: 5,
    // borderColor: '#999',
    marginBottom: 10,
    marginTop: 25
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000'
  },
  placeholderContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 16,
    position: 'absolute',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
});