'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { SECONDARY } from '../../styles/colors';
import {CustomText} from '../../styles/typo'
import ImagePicker from 'react-native-image-picker';
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CustomText>Waiting</CustomText>
  </View>
);

class ExampleApp extends PureComponent {

handleChoosePhoto = () => {
    const options = {
      noData: true,
      mediaType: 'video',
      
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        console.log(this.props.navigation.state.params.token)
        this. props. navigation.navigate('VidSelec',{'data':response})
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
              
                useNativeZoom={true}
                useCamera2Api={true}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (

           <View style={styles.test}>
             {/* <CountdownCircleTimer
    isPlaying
    duration={20}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
    onComplete={this.stopVideo.bind(this)}
  >
    {({ remainingTime, animatedColor }) => (
       
    )}
  </CountdownCircleTimer> */}
           <View onTouchStart={this.takeVideo.bind(this)} onTouchEnd={this.stopVideo.bind(this)} style={styles.capture}>

</View>
<View  style={styles.gallery}>
<CustomText style={{textAlign:'center',color:SECONDARY}} onPress={this.handleChoosePhoto}>Gallery </CustomText>
</View>
           </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
  takeVideo = async () => {
   
    if (this.camera ) {
      try { 
        
        const promise = this.camera.recordAsync();

        if (promise) {
          
          const data = await promise;
     console.log(data)


          this. props. navigation.navigate('VidSelec',{'data':data})
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  stopVideo = async () => {
    await this.camera.stopRecording();
   
  };
  
  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri)
  };
}

const styles = StyleSheet.create({
  test:{
    top:Dimensions.get('window').height-100,
width:'100%',
height:'100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    left:(Dimensions.get('window').width/2)-40,
    width:80,
    height:80,
    backgroundColor:SECONDARY,
    borderRadius:50,
    
  },
  gallery:{

 left:(Dimensions.get('window').width/2+75),
    backgroundColor: '#fff',
    borderRadius: 5,
bottom:50+15,
    maxWidth:80,
    padding:15


      }
});

{/* <View style={{flex:0, flexDirection: 'row'}}>
             
<View onTouchStart={this.takeVideo.bind(this)} onTouchEnd={this.stopVideo.bind(this)} style={styles.capture}>

</View>
<View  style={styles.gallery}>
<CustomText style={{ fontSize: 14 }}> GALLERY </CustomText>
</View>
</View> */}




// 'use strict';
// import React, { PureComponent } from 'react';
// import { AppRegistry, StyleSheet, CustomText, TouchableOpacity, View } from 'react-native';
// import { RNCamera } from 'react-native-camera';


// class ExampleApp extends PureComponent {
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           onGoogleVisionBarcodesDetected={({ barcodes }) => {
//             console.log(barcodes);
//           }}
//         />
//         <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//           <TouchableOpacity onPressIn={this.takeVideo.bind(this)} onPressOut={this.stopVideo.bind(this)} style={styles.capture}>
//             <CustomText style={{ fontSize: 14 }}> SNAP </CustomText>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
//   takeVideo = async () => {
   
//         if (this.camera ) {
//           try { 
//             const promise = this.camera.recordAsync();
    
//             if (promise) {
              
//               const data = await promise;
//               console.log('takeVideo', data);
//             }
//           } catch (e) {
//             console.error(e);
//           }
//         }
//       };
//       stopVideo = async () => {
//         await this.camera.stopRecording();
    
//       };
//   takePicture = async () => {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,

//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });

export default ExampleApp