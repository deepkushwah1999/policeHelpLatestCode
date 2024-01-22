import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const MyDrawer = props => {




  const {users}=props;
  const { registerToken, registerData } = users;

  console.log("resadasd",registerData);

  const logout = async () => {
    props.dispatch(userActions.logout(props));
    // const Token = JSON.parse(await AsyncStorage.getItem("LogToken"))
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://policeHelpNew.in/api/logout',
    //   headers: {
    //     'Authorization': `Bearer ${Token}`,
    //   }
    // };

    // axios.request(config)
    //   .then((response) => {
    //     props.navigation.navigate('Welcome')
    //     props.navigation.reset({
    //       index: 0,
    //       routes: [{ name: 'Welcome' }]
    //     });

    //     console.log("ssssss", response.data.message);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
       
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{flexDirection:'row'}}>
            <Image style={{ resizeMode: 'cover', height: 60, width: 60, }} source={require('../Images/userImg.png')} />
            <View style={{marginLeft: 5,width:'70%',alignSelf:'center'}}>
              <Text style={{  fontSize: 14, fontWeight: '500', color: '#000266' }}>{registerData&&registerData.name ? registerData.name : "-"}</Text>
              <Text style={{  fontSize: 14, fontWeight: '500', color: '#000266' }}>{registerData&&registerData.email ? registerData.email : "-"}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <Image style={{ resizeMode: 'contain', height: 18, width: 18, marginTop: -25 }} source={require('../Images/close4.png')} />
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', marginTop: 50, alignItems: 'center' }}>
          <Image style={{ resizeMode: 'contain', height: 30, width: 30, }} source={require('../Images/account.png')} />
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#000266' }}>Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
          <Image style={{ resizeMode: 'contain', height: 30, width: 30, }} source={require('../Images/feedback2.png')} />
          <TouchableOpacity onPress={() => props.navigation.navigate('Feedback')}>
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#000266' }}>Feedback</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
          <Image style={{ resizeMode: 'contain', height: 30, width: 30, }} source={require('../Images/power-off.png')} />
          <TouchableOpacity onPress={() => logout()}>
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '600', color: '#000266' }}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

function mapStateToProps(state) {
  const { users, } = state;
  return {
     
      users
  };
}
export default connect(mapStateToProps)(MyDrawer);