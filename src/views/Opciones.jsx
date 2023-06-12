import { useState } from "react";
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'; 
import { CommonActions } from '@react-navigation/native';  
import Login from './Login';
import Navigation from "../../Navigations";
import { Appbar } from "react-native-paper";

const Opciones = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Logout</Text>
            <Button title='Logout' onPress={()=>{
                    AsyncStorage.removeItem('usuario');
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'login' },//Bruh 
                                //al parecer asi se llama a cualquier ruta, no importa si es stack o no
                                //que raro
                            ],
                        })
                      );
                }}
            />
        </View>
    );
}


const OpcionesStack = createStackNavigator();

const OpcionesStackScreen = () => {
    return (
        <OpcionesStack.Navigator>
            <OpcionesStack.Screen name="Opciones Generales" component={Opciones} />
            {/* <OpcionesStack.Screen name="Login" component={Login} options={{headerShown:false}} /> */}
        </OpcionesStack.Navigator>
    );
}

export default OpcionesStackScreen;