import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { Searchbar, Card, Paragraph } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';

import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function Reseñas({route}) {
  console.log(route.params);
  const ancho = Dimensions.get('window').width;

  // const [receta, setReceta] = useState({images:[],ingredientes:[],reseñas:[]});

  const navigation = useNavigation();
  const [reseña, setRecetas] = useState({ images: [] });
  const [filteredReseña, setFilteredReseña] = useState([]);
  const [searchText, setSearchText] = useState('');

  const {id} = route.params
  console.log('route resenias');
  console.log(route.params);
  const url = `${API_URL}reseñas/${id}`;
  console.log(url);
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getRecetas();
    });
  
    return unsubscribe;
  }, [navigation]);

  
  const getRecetas = async function () {
    const response = await fetch(url);
    const data1 = await response.json();
    setRecetas(data1.data);
    setFilteredReseña(data1.data);
  };

  const Eliminated = (value) => {
    const urls = `${API_URL}reseñas/${value}`;
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
        getRecetas();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Mensaje de la Api');
      });
  };

  const Buscador = (text) => {
    setSearchText(text);
    const filteredList = reseña.filter((item) =>
      item.receta_owner.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredReseña(filteredList);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar por nombre de Reseña"
        mode="bar"
        value={searchText}
        onChangeText={Buscador}
        style={{ borderRadius: 0, padding: 0 }}
        icon="magnify"
        clearIcon="close"
      />
      <ScrollView>
        {filteredReseña.map((item) => (
          <View style={styles.Card} key={item.id}>
            <Card key={item.id} style={styles.Card}>
              <Card.Title title={item.receta_owner.nombre} />
              {/* <Card.Cover source={{ uri: item.receta_owner.images[0].url }} /> */}

              <GestureHandlerRootView>
                <Carousel
                  mode="parallax"
                  loop
                  width={ancho + 5}
                  height={ancho / 2}
                  autoPlay={false}
                  scrollAnimationDuration={1000}
                  data={item.receta_owner.images}
                  renderItem={(
                    { item } //esto es como un foreach basicamente
                  ) => (
                    <Image
                      className="rounded-lg"
                      key={item.id}
                      style={{ width: ancho, height: ancho / 2 }}
                      source={{ uri: item.url }}
                    />
                  )}
                />
              </GestureHandlerRootView>

              <Card.Content>
                <Text style={styles.label} label>
                  Estrellas
                </Text>
                <Paragraph>{item.estrellas}</Paragraph>
              </Card.Content>

              <Card.Content>
                <Text style={styles.Cuerpo}>Cuerpo de la reseña</Text>
                <Text></Text>
                <Paragraph>
                  {truncateText(item.cuerpo, 200)}{' '}
                  {/* Limitar a 100 caracteres */}
                </Paragraph>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Stack', {
                      name: item.receta_owner.nombre,
                      id: item.id,
                      id_receta: item.id_receta,
                      id_user: item.id_user,
                      estrellas: item.estrellas,
                      cuerpo: item.cuerpo,
                      imagen: item.receta_owner.images,
                    })
                  }
                  style={styles.button}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

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
