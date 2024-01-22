import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, Animated, StyleSheet, ScrollView, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { userActions } from '../../_actions';

import { connect } from 'react-redux';

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

const Login = props => {





  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setLoading] = useState(false);


  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleRegistration = () => {
    setEmailError("");
    setPasswordError("");
    let isValid = true;



    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };



  const LogIn = async () => {
    const registrationResult = handleRegistration();
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 1500)

    if (registrationResult.success) {

      const FormData = require('form-data');
      let data = new FormData();
      data.append('email', email);
      data.append('password', password);


      props.dispatch(userActions.login(data, props));

    }

  }

  const forgetnavigate = () => {
    if (!isEmailValid(email)) {
      Toast.show({
        text1: "Please Type Email For Password Reset",
        type: "error"
      })
    }
    if (isEmailValid(email)) {
      props.navigation.navigate('ForgetPassword', { "emailId": email })
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

        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 70, fontWeight: '700', color: '#000266' }}>Welcome</Text>
        <Text style={{ fontSize: 15, textAlign: 'center', color: '#000266' }}>Login to continue</Text>
        <View style={{ flex: 1, }}>

          {/* <TextInput
              placeholder='Mail Id'
              placeholderTextColor="black"
              style={{ borderBottomWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', margin: 5, marginTop: 50,color:'#000' }}
              keyboardType='email-address'
              onChangeText={(text) => setemail(text)}
              value={email}
            /> */}
          <AnimatedInput value={email} onChangeText={setemail} placeholder="Email Id" keyboardType='email-address' placeholderTextColor="black" />
          {emailError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{emailError}</Text>}
          {/* <TextInput
              placeholder='Password'
              placeholderTextColor="black"
              style={{ borderBottomWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', margin: 5,color:'#000' }}
              secureTextEntry={true}
              onChangeText={(text) => setpassword(text)}
              value={password}
            /> */}
          <AnimatedInput value={password} onChangeText={setpassword} placeholder="Password" placeholderTextColor="black" secureTextEntry={true} />
          {passwordError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{passwordError}</Text>}

          <TouchableOpacity style={{ width: '90%', alignSelf: 'center', marginTop: 20 }} onPress={() => forgetnavigate()}><Text style={{ color: '#000266' }}>Forget Password ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '70%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 8, marginTop: 60 }} onPress={() => LogIn()}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 30, alignSelf: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#000' }}>Don't Have an Account ?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={{ fontWeight: '700', color: '#000266' }}> Register Now</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{}}>

            <Text style={{}}>Don't Have an Account ?</Text> 
            <TouchableOpacity> <Text style={{fontWeight:'700'}}>Regester Now </Text></TouchableOpacity>

            </View> */}


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

          {/* <Text style={{marginTop:20 ,textAlign:'center',color:'#000266'}}>or Login With</Text>
      <View style={{flexDirection:'row',alignSelf:'center'}}>
        <Image  source={require('../../Images/fbicon.png')} style={{height:25,width:25,margin:10,resizeMode:'contain'}}/>
        <Image  source={require('../../Images/mail.png')} style={{height:25,width:25,margin:10,resizeMode:'contain'}}/>  
         <Image  source={require('../../Images/twitter.png')} style={{height:25,width:25,margin:10,resizeMode:'contain'}}/> 
         </View> */}

        </View>
      </View>


    </ScrollView>
  )
}


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

function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  const { users, } = state;
  return {
    // loggingIn,
    users,
  };
}
export default connect(mapStateToProps)(Login);
