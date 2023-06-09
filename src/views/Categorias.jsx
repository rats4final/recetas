import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
  } from 'react-native';
  import { Searchbar, Card, Paragraph } from 'react-native-paper';
  

import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
export default function Categorias() {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState('');
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [searchText, setSearchText] = useState('');
//mas rapido :v No
    const url = `${API_URL}categorias`;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getCategorias();
        });
      
        return unsubscribe;
      }, [navigation]);


    const getCategorias = async function () {
        const response = await fetch(url);
        const data1 = await response.json();
        setCategorias(data1.data);
        setFilteredCategorias(data1.data);
    };

    const Eliminated = (value) => {
        const urls = `${API_URL}categorias/${value}`;
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
            getCategorias();
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('Mensaje de la Api');
          });
      };

      const Buscador = (text) => {
        setSearchText(text);
        const filteredList = categorias.filter((item) =>
          item.nombre.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredCategorias(filteredList);
      };


    return( 
        <View style={styles.container}>
      <Searchbar
        placeholder="Buscar por nombre de categorias"
        mode="bar"
        value={searchText}
        onChangeText={Buscador}
        style={{ borderRadius: 0, padding: 0 }}
        icon="magnify"
        clearIcon="close"
      />
      <Text></Text>

      <TouchableOpacity style={styles.registerButton}  onPress={() =>
        navigation.navigate('CategoriaCreate')}
       >
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
      <ScrollView>
        {filteredCategorias.map((item) => (
          <View style={styles.Card} key={item.id}>
             <Card key={item.id} style={styles.Card}>
              {/*<Card.Title title={item.receta_owner.nombre} />*/}
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
                <Paragraph>{item.descripcion}</Paragraph>
                
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
  