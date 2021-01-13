import React from "react";
import {

    ScrollView, Text, StyleSheet, View

} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';



const Coins = ({ navigation }) => {
    return (
        <>
            <ScrollView style={{ backgroundColor: "white" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2%" }}>
                    <Icon name='left'
                        size={20}
                    />
 <Text h1 style={{ fontSize: 25 }}>
                        Coins Details
                    </Text>
                </View>
                <View>
                   
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "5%",alignItems:'center' }} >

                    <Text h1 style={{ fontSize: 30,flex:1 }}>
                        1. Aqua
                                </Text>
                    <Foundation
                    style={{ flex:1 }}
                     name='bitcoin-circle' color="#FFE000"
                        size={40}
                    />
                    <Text h1 style={{ fontSize: 25, flex:1 }} >

                        40 Coins
                                </Text>


                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "5%",alignItems:'center' }} >

                    <Text h1 style={{ fontSize: 30,flex:1}}>
                        2. Art
                                </Text>
                    <Foundation 
                    style={{flex:1 }}
                    name='bitcoin-circle' color="#FFE000"
                        size={40}
                    />
                    <Text h1 style={{ fontSize: 25, flex:1 }} >

                        40 Coins
                                </Text>


                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "5%",alignItems:'center' }} >

                    <Text h1 style={{ fontSize: 30,flex:1 }}>
                        3. Aqua
                                </Text>
                    <Foundation
style={{ flex:1 }}
                     name='bitcoin-circle' color="#FFE000"
                        size={40}
                    />
                    <Text h1 style={{ fontSize: 25,flex:1 }} >

                        40 Coins
                                </Text>


                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "5%" ,alignItems:'center'}} >

                    <Text h1 style={{ fontSize: 30,flex:1 }}>
                        4. Self
                                </Text>
                    <Foundation
style={{ flex:1 }}
                     name='bitcoin-circle' color="#FFE000"
                        size={40}
                    />
                    <Text h1 style={{ fontSize: 25,flex:1 }} >

                        35 Coins
                                </Text>


                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "5%",alignItems:'center' }} >

                    <Text h1 style={{ fontSize: 30,flex:1 }}>
                        5. Connect
                                </Text>
                    <Foundation 
style={{ flex:1}}
                    name='bitcoin-circle' color="#FFE000"
                        size={40}
                    />
                    <Text h1 style={{ fontSize: 25,flex:1 }} onPress={() => navigation.navigate('Followers')} >

                        25 Coins
                    </Text>


                </View>


            </ScrollView>


        </>
    )
}
export default Coins