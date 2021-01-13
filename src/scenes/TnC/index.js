import React from 'react';
import {SafeAreaView,View,StyleSheet} from 'react-native';
import { Text,Button } from 'react-native-elements';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import {PRIMARY,GRAY_DARK,BLACK,SECONDARY} from '../../styles/colors'
import {CustomText} from '../../styles/typo'
const TnCScreen = ({navigation}) => (
  <SafeAreaView style={{backgroundColor:PRIMARY}}>
      <View style={{backgroundColor:PRIMARY,alignSelf:'center'}}>
  <View>
      <CustomText style={styles.heading} >Terms and Conditions</CustomText>
  </View>
   <ScrollView style={styles.scroll} >
<CustomText style={styles.text} >
     Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.{"\n"} {"\n"} This book is a treatise on the theory of ethics, very popular during the Renaissance.The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.{"\n"} {"\n"} Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
     Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.{"\n"} {"\n"} This book is a treatise on the theory of ethics, very popular during the Renaissance.The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.{"\n"} {"\n"} Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
</CustomText> 
   </ScrollView>
   <View>
   <Button buttonStyle={styles.signupBut} titleStyle={{fontSize:18}} type="solid" title='I agree' onPress={() => navigation.navigate('OTP',{flow:'signup'})}/>
   </View>
   </View>
  </SafeAreaView>
);

export default TnCScreen;

const styles = StyleSheet.create({
heading:{
    color:BLACK,
    fontSize:28,
    fontWeight:'bold',
    marginTop:'20%',
    marginBottom:'4%'
},
scroll:{
    backgroundColor:'#ffffff',
    width:'80%',
    alignSelf:'center',
    borderRadius:20,
    maxHeight:'70%'

},
text:{
    color:'black',
    letterSpacing:1.2,
    paddingHorizontal:'10%',
    paddingVertical:'5%',
    fontSize:16,
    fontWeight:'900'
},
signupBut:{
    width:'70%',
    alignSelf:'center',
    backgroundColor:SECONDARY,
    borderRadius:20,
    marginVertical:'10%'
    
   },

})