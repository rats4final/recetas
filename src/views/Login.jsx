import * as React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';

// import { MaterialIcons } from '@expo/vector-icons';

// You can import from local files
import AssetExample from '../views/ComponenteLogin';

// or any pure JavaScript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

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
        <Text style={styles.subtitle}>Registro</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Ingrese su contraseña"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
            <Image source={require('../views/Imagenes/6866733.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleRememberMe} style={styles.checkbox}>
          {rememberMe && <MaterialIcons name="check-box" size={24} color="black" />}
          {!rememberMe && <MaterialIcons name="check-box-outline-blank" size={24} color="black" />}
          <Text style={styles.checkboxLabel}>Recuérdame</Text>
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
      </TouchableOpacity> */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../views/Imagenes/majao.jpg')}
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
});