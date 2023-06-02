import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TextInput, Image, Alert, TouchableOpacity,ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {API_URL} from "@env"

const Edit = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { name, id, id_receta, id_user, estrellas, cuerpo, imagen } = route.params;

  const [Estrellas, setEstrellas] = useState(estrellas);
  const [Cuerpo, setCuerpo] = useState(cuerpo);

  const Actualizar = () => {
    const url = `${API_URL}reseñas/${id}`;
    //console.log(url);
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_receta: id_receta,
        id_user: id_user,
        estrellas: Estrellas,
        cuerpo: Cuerpo,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        Alert.alert('Mensaje de la API', responseData.message);
      })
      .catch((error) => {
        console.error(error);
      });

    navigation.navigate("ReseñaScreen"); 
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>{name}</Text>
      <Image style={styles.imagen} source={{ uri: imagen }} />

      <Text style={styles.label}>Estrellas</Text>
      <TextInput
  value={Estrellas.toString()}
  placeholder="Estrellas"
  keyboardType="numeric"
  style={styles.input}
  onChangeText={(text) => {
    const value = text.trim() !== '' ? parseInt(text) : 0;
    setEstrellas(value);
  }}
/>

      <Text style={styles.label}>Cuerpo</Text>
      <TextInput
        value={Cuerpo}
        placeholder="Cuerpo de la reseña"
        style={styles.input}
        onChangeText={(text) => setCuerpo(text)}
      />

      <TouchableOpacity onPress={Actualizar} style={styles.button}>
        <Text>Actualizar</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
    borderWidth: 1,
    borderColor: '#FF0000',
    alignItems: 'center',
    margin: 12,
    paddingVertical: 10,
  },
  imagen: {
    height: 300,
    width: 400,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Edit;