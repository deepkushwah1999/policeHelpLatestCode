import { useState } from "react";
import { Text, Modal, View, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"

const { height, width } = Dimensions.get('window')

const StationResult = ({ addmodel, closeModel, props, stationRes }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={addmodel}
        >
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: 'rgba(231, 231, 231,0.5)'
            }} onPress={() => closeModel()} activeOpacity={1} >
                <View
                    style={{
                        marginTop: height / 2.49,
                        width: width / 1.19,
                        paddingVertical: 10,

                        borderWidth: 1,
                        borderColor: '#000266',
                        paddingHorizontal: 15,
                        borderRadius: 20,
                        alignSelf: "center",
                        backgroundColor: '#FFF', backfaceVisibility: 'visible'
                    }}>


                    {
                        stationRes?.length > 0 ?
                            <View style={{ marginHorizontal: 5, marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#000266', textDecorationLine: 'underline', lineHeight: 20 }}>Listed Police Stations</Text>
                                <TouchableOpacity onPress={() => closeModel()}>
                                    <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={require('../Images/close.png')} />
                                </TouchableOpacity>

                            </View>
                            :
                            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: 100, width: 100, resizeMode: 'contain' }} source={require('../Images/nodata.gif')} />

                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#0C8993', lineHeight: 20, textAlign: 'center' }}>No Police Sation Found !</Text>
                                <TouchableOpacity onPress={() => closeModel()} style={{ padding: 10, backgroundColor: 'red', bottom: -15, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 12, color: '#FFF', fontWeight: '600' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                    }

                    <ScrollView style={{ maxHeight: 150 }}>
                        {
                            stationRes?.length > 0 ?
                                stationRes.map((ele, index) => (
                                    <>

                                        <TouchableOpacity style={{ marginVertical: 10, borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between',borderColor:'#000266' }} key={index}
                                            onPress={() => { props.navigation.navigate('PoliceStationEnquieyresult', { "policedata": ele }), closeModel() }} activeOpacity={0.7}
                                        >
                                            <View style={{ paddingVertical: 5, width: '80%' }}>
                                                <Text style={{ color: '#000', lineHeight: 20 }} >{ele?.local_police_station_name
                                                }, {ele?.city}, {ele.poatal_code}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../Images/continue.png')} />
                                            </View>
                                        </TouchableOpacity>



                                    </>
                                ))
                                :
                                null
                        }

                    </ScrollView>







                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default StationResult