import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, PermissionsAndroid, Platform, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation'
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import StationResult from '../../constantComponent/StationResult';
const PoliceStationEnquiey = props => {

  const [pincode, setpincode] = useState("")
  const [pincodeError, setpincodeError] = useState("")

  const [loading, setLoading] = useState(false);
  const [modelresult, setModelresult] = useState(false);
  const [station, setStation] = useState([]);


  useEffect(() => {
    requestCameraPermission()

  }, [])

  console.log("@@@@@@@@@", station);




  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };




  const getLocation = () => {
    Geolocation.getCurrentPosition(async (info) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${info.coords.latitude}&lon=${info.coords.longitude}`
      );
      const data = await response.json();
      console.log("Acctual Addredd", data);
      const pincode = data.address.postcode;
      console.log("pincode ", pincode);
      setpincode(data && data.address && data.address.postcode ? data.address.postcode : null)

    });
  }

  const handleRegistration = () => {
    setpincodeError()

    let isValid = true;

    if (pincode.trim() === "") {
      setpincodeError("Please Enter Pin Code")
      isValid = false;
    }


    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };




  const searchStation = () => {
    const { users } = props;
    let { registerToken, } = users
    const registrationResult = handleRegistration();
    setLoading(true)

    if (registrationResult.success) {


      const FormData = require('form-data');
      let data = new FormData();
      data.append('postal_code', pincode);
      let config = {
        method: 'post',
        url: 'https://policehelp.in/api/policeenquiry',
        headers: {
          'Authorization': `Bearer ${registerToken}`,
          'Content-Type': 'multipart/form-data',
        },
        data: data
      };
      axios.request(config)
        .then((response) => {
          console.log("Search data ", JSON.stringify(response.data));
          console.log("Search data ", response.data.items);
          setStation(response.data.items);
          setLoading(false);
          setModelresult(true)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error);
        });
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>



      <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Image style={{ alignSelf: 'center', height: 22, width: 22, marginRight: 10, tintColor: '#2E2684' }} source={require('../../Images/back.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#2E2684', fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Police Station Enquiey</Text>

        </View>

      </View>

      <View style={{ flex: 1, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginTop: -30 }}>

        <View style={{
          width: '95%', height: 40, borderRadius: 18, borderWidth: 1, borderColor: '#2E2684', flexDirection: 'row', elevation: 5, backgroundColor: 'white',
        }}>
          <TextInput style={{ width: '80%', marginLeft: 10, fontSize: 15, color: '#000' }}
            placeholder='Enter Pin Code / Area Name'
            placeholderTextColor="#000"
            // onFocus={() => getLocation()}
            onChangeText={(text) => setpincode(text)}
            keyboardType='numbers-and-punctuation'
            // maxLength={10}

            value={pincode}
          />


          <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }} onPress={() => getLocation()}>

            <Image style={{ height: 23, width: 23, resizeMode: 'contain' }} source={require('../../Images/location.png')} />
          </TouchableOpacity>
        </View>

        {pincodeError !== "" && <Text style={{ color: 'red', }}>{pincodeError}</Text>}

        <TouchableOpacity style={{ width: '90%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 10, marginTop: 50 }} onPress={() => searchStation()}
        //  props.navigation.navigate('PoliceStationEnquieyresult')}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>Search Nearby Police Station
          </Text>
        </TouchableOpacity>
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

        <StationResult addmodel={modelresult} props={props} stationRes={station} closeModel={() => setModelresult(!modelresult)} />

      </View>



    </View>
  )
}


function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  const { users, } = state;
  return {
    // loggingIn,
    users,
  };
}
export default connect(mapStateToProps)(PoliceStationEnquiey);
