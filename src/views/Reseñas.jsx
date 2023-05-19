import React, { useState } from 'react';

import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,

  Image,
  Alert,
} from 'react-native';
import {Searchbar} from 'react-native-paper'

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Button!</Text>
    </View>
  );
}


export default function Reseñas() {
  const [Estrellas, setEstrellas] = useState('');
  const [Cuerpo, setCuerpo] = useState('');
  url = "http://10.174.79.80:8000/api/reseñas";
  const Enviar_Data = () => {
    const data = {
      id_receta: 1,
      id_user: 1,//llave de user cuando usemos authentica
      estrellas: parseInt(Estrellas),
      cuerpo: Cuerpo,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert('Mensaje de la Api',responseJson.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>

<Searchbar
          placeholder='buscar'
          
          mode='bar'
        />

      <Text style={styles.label}>Estrellas</Text>
      <TextInput
        placeholder="Estrellas"
        keyboardType="numeric"
        style={styles.input}
        value={Estrellas}
        // onChangeText={text => setNombre(text)}
        onChangeText={(text) => setEstrellas(text)}
      />
      <Text style={styles.label}>Cuerpo</Text>
      <TextInput
        placeholder="Cuerpo de la reseña"
        style={styles.input}
        value={Cuerpo}
        // onChangeText={ text => setApellido(text)}
        onChangeText={(text) => setCuerpo(text)}
      />
      <Button style={styles.button} onPress={Enviar_Data} title="Registrar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    margin: 12,
  },

  button: {
    borderRadius: 40,
    color: '#FF0000',
    margin: 12,
  },
  imagen: {
    height: 300,
    width: 300,
    margin: 46,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
