import { useState } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Text,
  View,
  StyleSheet,

  Alert,
} from 'react-native';
import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Registro = () => {
  const [name, setName] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = `${API_URL}register`

  const navigation = useNavigation();

  const datosUsuario = {
    name: name,
    apellidos: apellidos,
    telefono: telefono,
    password: password,
    email: email
  }

  const enviarDatos = async () => {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        //'Authorization': 'Bearer token',  usar esto en el login
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuario)
    })
    const data = await response.json();
    Alert.alert('Respuesta',data.message);
    await AsyncStorage.setItem('tokenRegistro',data.token);
    console.log(await AsyncStorage.getItem('tokenRegistro'));
    console.log(await AsyncStorage.getItem('usuario'));
  }
  

  return (
    <ImageBackground
      source={require('../views/Imagenes/cafe.png')}
      style={{
        width: '100%',
        flex: 1,
        height: '100%',
      }}
      imageStyle={{
        resizeMode: 'stretch', // works only here!
      }}>
      <View style={styles.container}>
        <Text style={styles.registerButtonText}>Nuevo Usuario</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre" 
          value={name}
          onChangeText={(name)=>{setName(name)}}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          //secureTextEntry
          value={apellidos}
          onChangeText={(apellidos) => {
            setApellidos(apellidos)
          }
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Telefono"
          //secureTextEntry
          value={telefono}
          onChangeText={(telefono) => {
            setTelefono(telefono)
          }
          }
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          //secureTextEntry
          value={email}
          onChangeText={(email) => {
            setEmail(email)
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(password) => {
            setPassword(password)
          }
          }
        />
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => {
            enviarDatos();
            navigation.goBack();
          }
          }
        >
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
    alignItems: 'center',
    resizeMode: 'cover',
  },
  input: {
    height: 50,
    //backgroundColor: '#ffffff',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
    backgroundColor: 'rgba(226, 226, 226 , 0.3)',
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
export default Registro;