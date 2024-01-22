import { View, Text,Image } from 'react-native'
import React,{useState,useEffect} from 'react'




const Splash = props => {




  return (

    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#FFF'}}>

    
    <Image   source={require('../Images/policelogo.gif')}  style={{height:300,width:300, resizeMode:'contain'}}/>
 

      
    </View>
  )
}

export default Splash