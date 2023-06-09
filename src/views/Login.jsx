import { useState} from 'react';
import { View, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

// import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Importación de componentes
import AssetExample from '../views/ComponenteLogin';

// or any pure JavaScript modules available in npm
import { Card } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);// no se si esto sea util

  const url = `${API_URL}login`;
  const datosLogin = {
    email: email,
    password: password,
  }// no se si es bueno que los datos del login sean globales, pero meh

  const enviarDatos = async () => {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        //'Authorization': `Bearer ${token}`, ahora que me doy cuenta no es necesario XD
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosLogin)
    });
    console.log(response.status);
    const data = await response.json();
    setMessage(data.message);
    if (response.status == 401){
      //si la autenticacion falla
      Alert.alert('No autorizado', data.message)
      return false;
    }else{
      await AsyncStorage.setItem('tokenLogin',data.accessToken);
      await AsyncStorage.setItem('usuario',JSON.stringify(data.user));

      console.log(await AsyncStorage.getItem('tokenLogin'));
      console.log(await AsyncStorage.getItem('usuario'));

      Alert.alert('Autorizado', data.message);
      return true;
    }
    
    
  }
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inicio de sesión</Text>
      </View>
      <Card>
        <AssetExample />
      </Card>
      <View style={styles.subtitlesContainer}>
      <Text style={styles.subtitle}>Inicio de sesión</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Registro')
        }}>
     <Text style={styles.subtitle}>Registro</Text>
     </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
          keyboardType='email-address'
          right={<TextInput.Icon icon="email-check"/>}
          value={email}
          onChangeText={(email) => {
            setEmail(email)
          }
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Ingrese su contraseña"
            secureTextEntry={!passwordVisible}
            right={<TextInput.Icon icon="eye" onPress={togglePasswordVisibility}/>}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }
            }
          />
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleRememberMe} style={styles.checkbox}>
          {rememberMe ? (
            <Icon name="check-box" size={24} color="black" />
          ) : (
            <Icon name="check-box-outline-blank" size={24} color="black" />
          )}
          <Text style={styles.checkboxLabel}>Recuérdame</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}   
          onPress={async () => {
            //navigation.navigate('Home');
              const resultado = await enviarDatos()
                if (resultado) {
                  navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Home' },
                        ],
                    })
                  );
                }
            
          }}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../views/Imagenes/gatito.png')}
          style={styles.bottomImage}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  eyeIconContainer: {
    marginLeft: -30,
    marginRight: 5,
    padding: 5,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: 'blue',
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomImage: {
    width: '100%',
    height: 150,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#add8e6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Login;