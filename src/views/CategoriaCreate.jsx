import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TextInput, Alert, Dimensions, Image } from 'react-native';
import { API_URL } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';

const InsertarCategoria = ({ route }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const url = `${API_URL}categorias`;

  const Categoria = {
    nombre: nombre,
    descripcion: descripcion
  };

  const enviarCategoria = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Categoria),
      });
      const data = await response.json();
      Alert.alert('Mensaje de la API', data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Nombre categoria</Text>
      <TextInput
        placeholder="Nombre de la categoria"
        style={styles.input}
        value={nombre}
        onChangeText={nombre => setNombre(nombre)}
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        placeholder="Descripción de la categoria"
        style={styles.input}
        value={descripcion}
        onChangeText={descripcion => setDescripcion(descripcion)}
      />
      <Button style={styles.button} onPress={enviarCategoria} title="Registrar" />
    </SafeAreaView>
  );
};

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

export default InsertarCategoria;