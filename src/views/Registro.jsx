import * as React from 'react';

import { TouchableOpacity,LinearGradient,ImageBackground,TextInput,Text, View, Button,StyleSheet,Image } from 'react-native';
import { createStackNavigator, createAppContainer, StackActions } from 'react-navigation';

export default function App() {
  return(
    
     
      
    <ImageBackground 
      source={require('../views/Imagenes/cafe.png')}
      style={{
      width: '100%', 
      flex: 1,

      height: '100%' 
    }}
    imageStyle={{
      resizeMode: 'stretch' // works only here!
    }}
>
       <View style={styles.container}>
       
      <Text style={styles.registerButtonText}>Nuevo Usuario</Text>
      
    
      <TextInput
        style={styles.input}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton} >
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
          </ImageBackground>

     
  );
}
  const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '',
    alignItems:'center',
    resizeMode:'cover'
    
  },
  input: {
    height: 50,
    //backgroundColor: '#ffffff',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
    backgroundColor: 'rgba(226, 226, 226 , 0.3)'
  },
  registerButton: {
    backgroundColor: 'rgba(137, 57, 29 , 0.8)',
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },


});