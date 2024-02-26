import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CONST } from '../../_config'
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Toast from 'react-native-toast-message'
import RNFetchBlob from 'rn-fetch-blob';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
const EmployeeVerification = props => {

  const [doc, setdoc] = useState(null);
  const [docError, setdocError] = useState(null);
  const [companyName, setcompanyName] = useState("");
  const [concernedPerson, setconcernedPerson] = useState("");
  const [concernedEmail, setconcernedEmail] = useState("");
  const [concernednumber, setconcernednumber] = useState("");
  const [companyNameError, setcompanyNameError] = useState("");
  const [concernPersonError, setconcernPersonError] = useState("");
  const [concernedEmailError, setconcernedEmailError] = useState("");
  const [concernednumberError, setconcernednumberError] = useState("");
  const [loading, setLoading] = useState(false);


  const isEmailValid = (concernedEmail) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(concernedEmail);
  };

  const handleRegistration = () => {
    setcompanyNameError("");
    setconcernPersonError("");
    setconcernedEmailError("");
    setconcernednumberError("");
    setdocError();

    let isValid = true;

    if (companyName.trim() === "") {
      setcompanyNameError("Company Name is required.")
      isValid = false;
    }
    if (doc === null) {
      setdocError("Requied !")
      isValid = false;
    }
    if (concernedPerson.trim() === "") {
      setconcernPersonError("Conserned Person is required.")
      isValid = false;
    }
    if (concernednumber.trim() === "") {
      setconcernednumberError("Conserned Number  is required.")
      isValid = false;
    }

    if (!isEmailValid(concernedEmail)) {
      setconcernedEmailError("Please enter a valid email address.");
      isValid = false;
    }


    if (isValid) {

      const registrationResult = { success: true };
      return registrationResult;
    } else {

      return { success: false };
    }
  };





  const UplaordDocument = async () => {
    try {

      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.csv],

      })

      console.log("sssss", doc);
      setdoc(doc)

    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log(err);
      else
        console.log(err);

    }


  }


  const SendEmployeedata = () => {
    const registrationResult = handleRegistration();
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 1500)

    if (registrationResult.success) {

      console.log('send data', { companyName, concernedEmail, concernedPerson, concernednumber });

      console.log("doc file", doc);
      const FormData = require('form-data');
      let data = new FormData();
      data.append('name_of_company', companyName);
      data.append('name_of_concerd_person', concernedPerson);
      data.append('email_of_concerd_person', concernedEmail);
      data.append('number_of_concerd_person', concernednumber);
      data.append('csv_xlsx_file', {
        uri: doc[0].uri,
        name: doc[0].name,
        type: doc[0].type,
      });

      props.dispatch(userActions.employeVerify(data, props));

    }
  }



  const downloadFile = () => {
    const downloadUrl = 'https://policehelp.in/public/images/sample.xlsx'; // URL of the file to download
    const savePath = RNFetchBlob.fs.dirs.DownloadDir + '/sample.xlsx'; // Path to save the downloaded file

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'Downloading File',
        description: 'Please wait...',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        path: savePath,
      },
    })
      .fetch('GET', downloadUrl)
      .then((res) => {
        // File downloaded successfully
        console.log('File downloaded:', savePath);
      })
      .catch((error) => {
        // Handle download error
        console.error('Error downloading file:', error);
      });
  };



  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={{ flex: 1, backgroundColor: '#FFF' }}>



        <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <Image style={{ alignSelf: 'center', height: 22, width: 22, marginRight: 10, tintColor: '#2E2684' }} source={require('../../Images/back.png')} />
            </TouchableOpacity>
            <Text style={{ color: '#2E2684', fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Employee Verification</Text>

          </View>

        </View>

        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 50 }}>

          <TextInput
            placeholder='Name Of The Company'
            placeholderTextColor="#000"
            onChangeText={(text) => setcompanyName(text)}

            value={companyName}
            // secureTextEntry={true}
            style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8, margin: 7, color: '#000' }}
          />
          {companyNameError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{companyNameError}</Text>}
          <TextInput
            placeholder='Name of Concerned person'
            placeholderTextColor="#000"
            onChangeText={(text) => setconcernedPerson(text)}

            value={concernedPerson}
            style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8, margin: 7, color: '#000' }}
          />
          {concernPersonError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{concernPersonError}</Text>}
          <TextInput
            placeholder='Email of Concerned Person '
            placeholderTextColor="#000"
            onChangeText={(text) => setconcernedEmail(text)}

            value={concernedEmail}

            style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8, margin: 7, color: '#000' }}
          />
          {concernedEmailError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{concernedEmailError}</Text>}
          <TextInput
            placeholder='Number of Concerned Person'
            placeholderTextColor="#000"
            value={concernednumber}
            keyboardType='number-pad'
            maxLength={10}
            onChangeText={(text) => setconcernednumber(text)}
            style={{ borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', padding: 7, borderRadius: 8, margin: 7, color: '#000' }}
          />
          {concernednumberError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{concernednumberError}</Text>}
          <View style={{ marginTop: 30, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', width: '60%' }}>

            <Image source={require('../../Images/excelicon.png')} style={{ height: 22, width: 22, }} />
            {doc && doc[0] ?
              <>
                <Text style={{ color: 'green', marginLeft: 5 }}>File Uploaded Succesfully</Text>

                <Image source={require('../../Images/check-mark.png')} style={{ height: 20, width: 20, }} />
              </>
              :
              <>
                <TouchableOpacity onPress={() => downloadFile()} style={{ flexDirection: 'row' }}>
                  <Text style={{color:'#000'}}>  Download Simple File  </Text>

                  <Image source={require('../../Images/Downlord.png')} style={{ height: 20, width: 20, }} />
                </TouchableOpacity>
              </>

            }
            {docError !== "" && <Text style={{ color: 'red', marginHorizontal: 20 }}>{docError}</Text>}

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


          <TouchableOpacity style={{ width: '60%', marginLeft: 10, borderRadius: 20, backgroundColor: '#000266', padding: 6, marginTop: 25, flexDirection: 'row', justifyContent: 'space-evenly' }} onPress={() => UplaordDocument()} >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>Upload Employee Data</Text>
            <Image source={require('../../Images/upload.png')} style={{ height: 18, width: 18, tintColor: 'white' }} />
          </TouchableOpacity>





        </View>

        <View style={{ marginTop: 200 }} />



      </View>
      <TouchableOpacity style={{ width: '80%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#000266', padding: 12, bottom: 30 }}
        onPress={() => SendEmployeedata()}
      
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>Submit
        </Text>
      </TouchableOpacity>

    </View>
  )
}

function mapStateToProps(state) {
  const { users, } = state;
  return {
    users,
  };
}
export default connect(mapStateToProps)(EmployeeVerification);



