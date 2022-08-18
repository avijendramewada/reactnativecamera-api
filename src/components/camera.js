import { View, Text, StyleSheet,Button,
  PermissionsAndroid,Image} from 'react-native';
import React,{useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
const Camera = () => {
  const [imageSource, setImageSource] = useState(null);
  function selectImage() {
    let options = {
      width: 600,
      height: 550,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].uri;;
        setImageSource(source);
      }
    });
  }
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      width: 600,
      height: 550,
      quality: 1,
      saveToPhotos: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        let source = response.assets[0].uri;
        setImageSource(source);
      });
    }
  };
  return (
    <View style={styles.main}>
     <Text style={styles.user}>Welcome</Text>
     <View style={styles.imageContainer}>
        {imageSource === null ? (
          <Image
            source={{uri:'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}}
            style={styles.imageBox}
            resizeMode='contain'
          />
        ) : (
          <Image
            source={{ uri: imageSource }}
            style={styles.imageBox}
            resizeMode='contain'
          />
        )}
      </View>
      <View  style={{ flexDirection: 'row' }}>
        <View style={{ marginRight:40 }}>
         <Button
         title="select image"
         onPress={selectImage}
        /> 
        </View>
      <View>
         <Button
         title="Camera"
         onPress={captureImage}
        /> 
      </View>
     </View>
   </View>
  );
};

export default Camera;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  user: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#ff5555'
  },
  imageBox: {
    width: 150,
    height: 200
  }
});
