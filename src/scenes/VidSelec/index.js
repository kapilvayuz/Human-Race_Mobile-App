
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Text,Button,Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import React, { useState } from 'react';
import {CustomText} from '../../styles/typo'
import InputAtom from '../../components/atoms/Input'
import {PRIMARY,GRAY_DARK,BLACK,SECONDARY, GRAY_MEDIUM} from '../../styles/colors'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
const { height } = Dimensions.get("window");

const EmailnUser= ({navigation}) => {

const [stop,setstop]=useState(false)
 
  return (
  

    
         <View style={styles.container}>
         <Video source={{uri: navigation.state.params.data.uri}} 
            style={styles.backgroundVideo} 
            fullscreen={true} 
          onTouchStart={()=>setstop(true)}
          onTouchEnd={()=>setstop(false)}
paused={stop}
repeat={true}

          resizeMode={"cover"}
      
         
    />
<View style={styles.btnView}>
     <Button buttonStyle={styles.backBut} titleStyle={{fontSize:20,color:SECONDARY}} type='solid' title='Back' onPress={() => navigation.navigate('VideoRec')}/>
     <Button buttonStyle={styles.signupBut} titleStyle={{fontSize:20}} type="solid" title='Next' onPress={() =>{setstop(true) 
      navigation.navigate('ChalSub',{data:navigation.state.params.data})}} />
     </View>



     </View>

   
  );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     backgroundColor: 'black',
    //   },

 signupBut:{
 width:'80%',
  alignSelf:'center',
  backgroundColor:SECONDARY,
  borderRadius:25,
  marginVertical:'10%'
  
 },
 btnView:{

top:height-100,

    display:'flex',
    flexDirection:'row',
  justifyContent:'space-between',
    width:'80%',
    marginLeft:'10%'
 },

 backBut:{
    width:'80%',
  backgroundColor:'#ffffff',
    borderRadius:20,
    marginVertical:'10%'
 },

 backgroundVideo: {
  height: height,
  position: "absolute",
  top: 0,
  left: 0,
  alignItems: "stretch",
  bottom: 0,
  right: 0
}

});

export default EmailnUser;
