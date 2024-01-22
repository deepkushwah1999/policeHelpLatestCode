import { View, Text, TouchableOpacity, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
const Home = props => {
  

  useEffect(() => {
    props.dispatch(userActions.getEnquiryDetails())
    props.dispatch(userActions.getProfile())

  }, [])
  



  

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>


        <View style={{ marginHorizontal: 20, marginTop: 20,flexDirection:'row',justifyContent:'space-between' }}>

          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.navigation.toggleDrawer()}>
            <Image style={{ alignSelf: 'center', height: 28, width: 28, marginRight: 10,tintColor:'#2E2684' }} source={require('../../Images/more.png')} />
          </TouchableOpacity>
          <Text style={{color:'#000266',fontSize:22,fontWeight:'900',marginRight:20}}>Police Help</Text>
          <Text></Text>
         

        </View>

        <View style={{ flex: 1, marginHorizontal: 20 }}>

          <Image style={{ alignSelf: 'center', height: 170, width: 170, marginTop: 50 }} source={require('../../Images/haretosave.png')} />

          <View style={{ flex: 1, }}>

          <TouchableOpacity style={{borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', marginTop:40, padding: 10, borderRadius: 10,backgroundColor:'#2E2684',flexDirection:'row',justifyContent:'space-around' }} onPress={()=>props.navigation.navigate('PoliceStationEnquiey')}>
            <Text style={{fontSize:16,color:'white'}}>Police Station Search</Text>
            <Image   source={require('../../Images/rightarrow.png')} style={{height:20,width:20}} />

           </TouchableOpacity>
           <TouchableOpacity style={{borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', marginTop:20, padding: 10, borderRadius: 10,backgroundColor:'#2E2684',flexDirection:'row',justifyContent:'space-around' }} onPress={()=>props.navigation.navigate('EmployeeVerification')}>
            <Text style={{fontSize:16,color:'white'}}>Employee Verification</Text>
            <Image   source={require('../../Images/rightarrow.png')} style={{height:20,width:20}} />

           </TouchableOpacity>
           <TouchableOpacity style={{borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', marginTop:20, padding: 10, borderRadius: 10,backgroundColor:'#2E2684',flexDirection:'row',justifyContent:'space-around' }} onPress={()=>props.navigation.navigate('LegalConsultation')}>
            <Text style={{fontSize:16,color:'white'}}>Legal Consultation</Text>
            <Image   source={require('../../Images/rightarrow.png')} style={{height:20,width:20}} />

           </TouchableOpacity>
      
           <TouchableOpacity style={{borderWidth: 1, borderColor: '#000266', width: '90%', alignSelf: 'center', marginTop:20, padding: 10, borderRadius: 10,backgroundColor:'#2E2684',flexDirection:'row',justifyContent:'space-around' }}  onPress={()=>props.navigation.navigate('PreviusEnquiry')}>
            <Text style={{fontSize:16,color:'white'}}>Previous Enquiry</Text>
            <Image   source={require('../../Images/rightarrow.png')} style={{height:20,width:20}} />

           </TouchableOpacity>
         
          





          </View>

        </View>
        
      </ScrollView>

    </View>
  )
}

function mapStateToProps(state) {
  const { users, } = state;
  return {
     
      users
  };
}
export default connect(mapStateToProps)(Home);


