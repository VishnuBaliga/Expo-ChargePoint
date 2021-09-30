import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'; 
import MapView, {UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';

const Dashboard = () => {  

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
      console.log('location', location)

  return (
    <> 
       <SafeAreaView style={styles.container}> 
       {location && 
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
                
       } 
            <Text>Location details: {text}</Text> 

            <View>

                {[1,3,4,4,5].map((item)=>{
                    <View  style={styles.card} >
                        <Text>Location details: {text}</Text> 
                        <Text>{item}</Text> 
                    </View> 
                })}

            </View>

       </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({ 
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'flex-start',  
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
    card:{
        backgroundColor:'red',
        padding: '20px 10px',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
  });
  

export default Dashboard