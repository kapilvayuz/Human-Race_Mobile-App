import React from 'react'
import { View, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class AuthLoadingScreen extends React.Component {

    constructor() {
        super();
        this._bootstrap();
    }

    _bootstrap = async () => {
      
        const userToken = await AsyncStorage.getItem('userToken');
        const otp = await AsyncStorage.getItem('otp');
     
        SplashScreen.hide()
        if(userToken){
            if(otp==1){
                this.props.navigation.navigate('Feed')
            }else{
                this.props.navigation.navigate('Auth')
            }
        }else{
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});