import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import CheckBox from 'react-native-check-box'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
const LegalConsultation = props => {
  const [isSelected, setSelection] = useState(false);
  const [isSelectederror, setSelectionerror] = useState("");
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [value, setValue] = useState("");
  const [valueB, setValueB] = useState("");
  const [bvalue, setBvalue] = useState("");
  const [showvalue, setShowvalue] = useState("");
  const [showBvalue, setShowBvalue] = useState("");
  const [items, setItems] = useState([
    { "label": "Andhra Pradesh", "value": "Andhra Pradesh" },
    { "label": "Arunachal Pradesh", "value": "Arunachal Pradesh" },
    { "label": "Assam", "value": "Assam" },
    { "label": "Bihar", "value": "Bihar" },
    { "label": "Chhattisgarh", "value": "Chhattisgarh" },
    { "label": "Goa", "value": "Goa" },
    { "label": "Gujarat", "value": "Gujarat" },
    { "label": "Haryana", "value": "Haryana" },
    { "label": "Himachal Pradesh", "value": "Himachal Pradesh" },
    { "label": "Jharkhand", "value": "Jharkhand" },
    { "label": "Karnataka", "value": "Karnataka" },
    { "label": "Kerala", "value": "Kerala" },
    { "label": "Madhya Pradesh", "value": "Madhya Pradesh" },
    { "label": "Maharashtra", "value": "Maharashtra" },
    { "label": "Manipur", "value": "Manipur" },
    { "label": "Meghalaya", "value": "Meghalaya" },
    { "label": "Mizoram", "value": "Mizoram" },
    { "label": "Nagaland", "value": "Nagaland" },
    { "label": "Odisha", "value": "Odisha" },
    { "label": "Punjab", "value": "Punjab" },
    { "label": "Rajasthan", "value": "Rajasthan" },
    { "label": "Sikkim", "value": "Sikkim" },
    { "label": "Tamil Nadu", "value": "Tamil Nadu" },
    { "label": "Telangana", "value": "Telangana" },
    { "label": "Tripura", "value": "Tripura" },
    { "label": "Uttar Pradesh", "value": "Uttar Pradesh" },
    { "label": "Uttarakhand", "value": "Uttarakhand" },
    { "label": "West Bengal", "value": "West Bengal" }
  ]);
  const [itemsb, setItemsb] = useState([
    { "label": "Civil", "value": "Civil" },
    { "label": "Criminal", "value": "Criminal" },
    { "label": "Writ", "value": "Writ" },
  ]);
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getUser()

  // }, [])
  // const getUser = async () => {
  //   try {
  //     const userData = JSON.parse(await AsyncStorage.getItem("LogToken"))
  //     if (userData !== null) {
  //       setToken(userData);
  //       console.log("Cosultation tokoen", userData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState("")
  const [nameError, setnameError] = useState("")
  const [EmailError, setEmailError] = useState("")
  const [MobileError, setMobileError] = useState("")
  const [StateError, setStateError] = useState("")
  const [consultationError, setconsultationError] = useState("")


  const txnByKey = (item) => {
    // console.log("vale::::::::::::::::::", item);
    setShowvalue(item);
  }
  const txnByKeyB = (item) => {
    // console.log("vale::::::::::::::::::", item);
    setShowBvalue(item);
  }


  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const handleRegistration = () => {
    setnameError("");
    setEmailError("");
    setMobileError("");
    setStateError("");
    setconsultationError("");
    setSelectionerror("");

    let isValid = true;

    if (name.trim() === "") {
      setnameError("Name is required.")
      isValid = false;
    }
    if (isSelected == false) {
      setSelectionerror("Required !")
      isValid = false;
    }
    if (mobile.trim() === "") {
      setMobileError("Mobile Number is required.")
      isValid = false;
    }
    if (showvalue.trim() === "") {
      setStateError("Please Select your State")
      isValid = false;
    }
    if (showBvalue.trim() === "") {
      setconsultationError("Please Select Consultation Type")
      isValid = false;
    }

    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }



    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };



  const Submit_Data = () => {

    const registrationResult = handleRegistration();
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 1500)

    if (registrationResult.success) {


      const FormData = require('form-data');
      let data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('mobile', mobile);
      data.append('state', showvalue);
      data.append('consultation_type', showBvalue);


      props.dispatch(userActions.LegalConsultaion(data,props))



    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>



      <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Image style={{ alignSelf: 'center', height: 22, width: 22, marginRight: 10, tintColor: '#2E2684' }} source={require('../../Images/back.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#2E2684', fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Legal Consultation</Text>

        </View>

      </View>

      <View style={{ flex: 1, marginHorizontal: 10, marginTop: 30 }}>
        <Text style={{ marginLeft: 20, fontSize: 12 }}>Fill Up the below mentioned form</Text>

        <TextInput
          placeholder='Name'

          value={name}
          // secureTextEntry={true}
          onChangeText={(text) => setname(text)}
          style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8, margin: 7,color:'#000' }}
        />
        {nameError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{nameError}</Text>}
        <TextInput
          placeholder='Email'

          value={email}
          keyboardType='email-address'
          onChangeText={(text) => setemail(text)}
          // secureTextEntry={true}
          style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8, margin: 7,color:'#000' }}
        />
        {EmailError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{EmailError}</Text>}
        <TextInput
          placeholder='Mobile Number'

          value={mobile}
          onChangeText={(text) => setmobile(text)}

          keyboardType='number-pad'
          maxLength={10}            // secureTextEntry={true}
          style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8, margin: 7,color:'#000' }}
        />
        {MobileError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{MobileError}</Text>}
        {/* <TextInput
            placeholder='State '
         
            value=''
            secureTextEntry={true}
            style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8,margin:7 }}
          /> */}
        <DropDownPicker
          open={open}
          //  zIndex={2000}
          placeholder='State'
          placeholderStyle={{ color: 'grey' }}
          value={value}
          onSelectItem={(item) => txnByKey(item.value)}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{ borderColor: '#000266', }}
          containerStyle={{ width: '90%', alignSelf: 'center' }}
        />
        {StateError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{StateError}</Text>}
        <DropDownPicker
          open={openB}
          zIndex={2000}
          placeholder='Select Consultation Type'
          placeholderStyle={{ color: 'grey' }}
          value={bvalue}
          onSelectItem={(item) => txnByKeyB(item.value)}
          items={itemsb}
          setOpen={setOpenB}
          setValue={setBvalue}
          setItems={setItemsb}
          style={{ borderColor: '#000266', marginTop: 10 }}
          containerStyle={{ width: '90%', alignSelf: 'center' }}
        />

        {consultationError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{consultationError}</Text>}


        <View style={{ marginTop: 20, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
          <CheckBox
            style={{
              marginTop: -55
            }}
            onClick={() => setSelection(!isSelected)}
            isChecked={isSelected}
            leftText={"CheckBox"}
          />
          <Text style={{ fontSize: 12 }}>I have read & agreed to the company’s Teems and Conditions, disclaimer and refund policy. and also ready to accept calls, SMS, emails, etc.
          </Text>

        </View>

        
        {isSelectederror !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{isSelectederror}</Text>}







      </View>
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
      <TouchableOpacity style={{ width: '80%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 12, bottom: 30 }} onPress={() => Submit_Data()}
      // onPress={() => props.navigation.navigate('LegalLoading')}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Request a call back

        </Text>
      </TouchableOpacity>



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
export default connect(mapStateToProps)(LegalConsultation);
