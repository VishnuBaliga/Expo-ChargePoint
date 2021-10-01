import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, Modal, TouchableHighlight } from 'react-native'; 
import MapView, {UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';

const EVStationsData = [
  {
    name: 'Maruti Charging Station',
    pin: '3 pin, Fast charging',
    rating: '4.5',
    distance: '400',
    slots: '13',
    image: require('../assets/stations/station-1.png'),
  },
  {
    name: 'Vikas EV Station',
    pin: '3 pin, Normal/Fast charging',
    rating: '4.5',
    distance: '400',
    slots: '13',
    image: require('../assets/stations/station-2.png'),
  },
  {
    name: 'Bajaj EV',
    pin: '3 pin, Normal/Fast charging',
    rating: '4.5',
    distance: '400',
    slots: '13',
    image: require('../assets/stations/station-3.png'),
  },
  {
    name: 'Ather Energy - HSR',
    pin: '3 pin, Normal/Fast charging',
    rating: '4.5',
    distance: '400',
    slots: '13',
    image: require('../assets/stations/station-2.png'),
  },
  {
    name: 'TATA EV',
    pin: '3 pin, Fast charging',
    rating: '4.5',
    distance: '400',
    slots: '13',
    image: require('../assets/stations/station-1.png'),
  },
]


const Dashboard = () => {  

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedStn, setStn] = useState(false)

    const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date'); 
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; 
    setDate(currentDate);
  };

  console.log('date-->>',date);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      } 

      const BookNow = (station) =>{
        setStn(station)
        console.log('BookNow', station);
        setModalVisible(true);
      }
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

  return (
    <> 
       <SafeAreaView style={styles.container}>  

       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

          <View style={styles.card}>
                            <View style={styles.cardLeft}>
                              <Image style={styles.cardImage} source={selectedStn.image} />
                            </View>
                            <View style={styles.cardRight}>
                              <Text style={styles.cardTitle} >{selectedStn.name}</Text> 
                              <Text style={{marginBottom:3}}>{selectedStn.pin}</Text> 
                              <Text>{`${selectedStn.rating}    ${selectedStn.distance}m    ${selectedStn.rating} Slots`}</Text> 
                            </View>
            </View>


            <View style={styles.bookCol}>
              <Text style={styles.textDark} >Choose your slots</Text> 
              <View style={styles.bookRow}>
                <TouchableOpacity style={styles.bookBtn} onPress={showDatepicker} >
                                <Text style={styles.textLight}>Select Date</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.bookBtn} onPress={showTimepicker} >
                                <Text style={styles.textLight}>Select Time slot</Text> 
                </TouchableOpacity> 
            </View>
          </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}


            <TouchableHighlight
               style={styles.bookBtn}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textLight}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


                <MapView style={styles.map}  
                showsUserLocation={true} 
                initialRegion={{
                    "latitude": location ? location?.coords?.latitude : 12.9121167,
                    "latitudeDelta": location ? 120 : 0.5,
                    "longitude": location ? location?.coords?.longitude : 77.6445533,
                    "longitudeDelta": location ? 120 : 0.5,
                    'zoom': 10
                }} 
                zoomEnabled={true}
                />  
            {/* <Text>Location details: {text}</Text>  */}

            <ScrollView style={styles.scrollView}> 
             {EVStationsData.map((item,index)=>{  
                        return <View key={index} style={styles.card}>
                            <View style={styles.cardLeft}>
                              <Image style={styles.cardImage} source={item.image} />
                            </View>
                            <View style={styles.cardRight}>
                              <Text style={styles.cardTitle} >{item.name}</Text> 
                              <Text style={{marginBottom:3}}>{item.pin}</Text> 
                              <Text>{`${item.rating}    ${item.distance}m    ${item.rating} Slots`}</Text> 
                            </View>
                            <TouchableOpacity style={styles.bookBtn} onPress={() => BookNow(item)} >
                              <Text style={styles.textLight}>Book</Text> 
                            </TouchableOpacity>
                        </View>
}
                )}
      </ScrollView>

 
                

       </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({ 
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'flex-start',  
        paddingTop: StatusBar.currentHeight,
      }, 
      bookRow: {  
        justifyContent: 'flex-start', 
        flexDirection: 'row' , 
        marginTop: 20,
        width:'100%',
        paddingHorizontal: 12, 
      }, 
      bookCol: {  
        justifyContent: 'flex-start',  
        marginBottom: 50,
        paddingHorizontal: 12, 
        width:'100%',
      }, 
      scrollView: {
        // backgroundColor: 'pink',
        width:'100%',
        marginHorizontal: 5,
      }, 
      textLight:{
        fontSize: 16,
        color: '#fff',
      },
      dateBtn:{
        paddingVertical:6, 
        paddingHorizontal: 12, 
        backgroundColor: '#0ACFC9', 
      },
      bookBtn:{
        // width:'60%',
        color: '#fff',
        marginLeft:10,
        paddingVertical:6, 
        paddingHorizontal: 12, 
        backgroundColor: '#0ACFC9', 
        borderRadius: 10 ,
        flex: 0,  
        alignItems: 'center',
        justifyContent: 'center',  
      },
    text:{
      fontSize: 34,
      color: '#fff',
    },  
    mapContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    },
    map: {
      width: '100%',
      height: '30%',
    },
    cardTitle:{
      fontSize: 18, 
      fontWeight: '700',
      color: '#222',
      marginBottom: 5
    },  
    card:{
        // backgroundColor:'red',
        width:'100%',
        paddingVertical: 20,
        paddingHorizontal: 20, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      cardLeft:{
        // paddingVertical: 5,
        // paddingHorizontal: 10, 
        // backgroundColor:'grey',
        // height: 80,
        // width: 80
      },
      cardRight:{  
        paddingVertical: 5,
        paddingHorizontal: 5, 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cardImage:{
      width: 80,
      height: 80,  
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
    },
    textDark:{
      fontSize: 18,
      color: '#222',
    },
    modalView: {
      margin: 12,
      width:'90%',
      height:'60%',
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 5,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  

export default Dashboard