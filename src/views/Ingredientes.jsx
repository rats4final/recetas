import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
    Button,
    Dimensions,
    Image,
  } from 'react-native';
  import { Searchbar, Card, Paragraph } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
export default function Reseñas() {
    const navigation = useNavigation();
    const [ingredientes, setIngredientes] = useState();
    const [filteredIngrediente, setFilteredIngrediente] = useState([]);
    const [searchText, setSearchText] = useState('');

    const url = `${API_URL}ingredientes`;

    const getIngredientes = async function () {
        const response = await fetch(url);
        const data1 = await response.json();
        setIngredientes(data1.data);
        setFilteredIngrediente(data1.data);
    };

    const Eliminated = (value) => {
        const urls = `${API_URL}ingredientes/${value}`;
        fetch(urls, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            Alert.alert('Mensaje de la Api', responseData.message);
            getIngredientes();
          })
          .catch((error) => {
            Alert.alert('Mensaje de la Api');
          });
      };

      const Buscador = (text) => {
        setSearchText(text);
        const filteredList = ingredientes.filter((item) =>
          item.receta_owner.nombre.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredIngrediente(filteredList);
      };


    return( 
        <View style={styles.container}>
      <Searchbar
        placeholder="Buscar por nombre de Ingrediente"
        mode="bar"
        value={searchText}
        onChangeText={Buscador}
        style={{ borderRadius: 0, padding: 0 }}
        icon="magnify"
        clearIcon="close"
      />
      <Text></Text>

      <ScrollView>
        {filteredIngrediente.map((item) => (
          <View style={styles.Card} key={item.id}>
            <Card key={item.id} style={styles.Card}>
              <Card.Title title={item.receta_owner.nombre} />
              {/* <Card.Cover source={{ uri: item.receta_owner.images[0].url }} /> */}

              <Card.Content>
                <Text style={styles.label} label>
                nombre
                </Text>
                <Paragraph>{item.nombre}</Paragraph>
              </Card.Content>

              <Card.Content>
                <Text style={styles.Cuerpo}>Descripcion</Text>
                <Text></Text>
                
                <TouchableOpacity
                  onPress={() => Eliminated(item.id)}
                  style={styles.button}>
                  <Text>Eliminar</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
    );
    

}
const styles = StyleSheet.create({
    button: {
      borderRadius: 40,
      borderWidth: 1,
      borderColor: '#FF0000',
      alignItems: 'center',
      margin: 12,
      paddingVertical: 10,
    },
    container: {
      marginBottom: 70,
      padding: 5,
    },
    Card: {
      padding: 8,
    },
    label: {
      fontWeight: 'bold',
      color: 'gold',
    },
    Cuerpo: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });
  