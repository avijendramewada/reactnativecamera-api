import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera'

function QrScreen() {
    const [barcode, setBarcode] = useState(null);
  
    return (
      <View style={styles.screen}>
        <SafeAreaView style={styles.saveArea}>
          <View style={styles.topBar}>
            <Text style={styles.topBarTitleText}>QR code Scanner</Text>
          </View>
        </SafeAreaView>
  
        <View style={styles.caption}>
          <Text style={styles.captionTitleText}>Welcome to Qr</Text>
        </View>
  
        {barcode ? (
          <View style={[styles.rnCamera, styles.rmCameraResult]}>
            <Text style={styles.rmCameraResultText}>{barcode.data}</Text>
            <Text style={styles.rmCameraResultText}>{barcode.type}</Text>
          </View>
        ) : (
          <RNCamera
            style={styles.rnCamera}
            onBarCodeRead={setBarcode}
          />
        )}
  
        <View style={styles.cameraControl}>
          <TouchableOpacity style={styles.btn} onPress={() => setBarcode(null)}>
            <Text style={styles.btnText}>New QR Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
 
  const styles = StyleSheet.create({
    topBar: {
      height: 50,
      backgroundColor: '#62d1bc', // green
      alignItems: 'center',
      justifyContent: 'center',
    },
    topBarTitleText: {
      color: '#ffffff', // white
      fontSize: 20,
    },
    caption: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    captionTitleText: {
      color: '#121B0D', // black
      fontSize: 16,
      fontWeight: '600'
    },
  });
  export default QrScreen