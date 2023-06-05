import React, {useState} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  Image
} from 'react-native';

import {API_URL} from '@env';

import Carousel from 'react-native-reanimated-carousel';

import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

const ancho = Dimensions.get('window').width;

const InsertarReseña = ({route}) => {
  
  const [estrellas, setEstrellas] = useState('');
  const [cuerpo, setCuerpo] = useState('');
  const [idUser, setIdUser] = useState(3);
  const {idReceta,images} = route.params;
  const url = `${API_URL}reseñas`;
  
  const reseña = {
    id_receta: idReceta,
    id_user: idUser, //llave de user cuando usemos authentica
    estrellas: parseInt(estrellas),
    cuerpo: cuerpo,
  };
  
  console.log(url);
  const enviarReseña = async () => {
    try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reseña),
    });
    const data = await response.json();
    Alert.alert('Mensaje de la API', data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

<GestureHandlerRootView >
              <Carousel
        mode='parallax'
        loop
        width={ancho + 5}
        height={ancho / 2}
        autoPlay={false}
        scrollAnimationDuration={1000}
        data={images}
        renderItem={({item})=>(//esto es como un foreach basicamente
            <Image
                className="rounded-lg"
                key={item.id}
                style={{width: ancho, height: ancho / 2}}
                source={{uri:item.url}}
            />
        )}
      />
    </GestureHandlerRootView>


      <Text style={styles.label}>Estrellas</Text>
      <TextInput
        placeholder="Estrellas"
        keyboardType="numeric"
        style={styles.input}
        value={estrellas}
        onChangeText={estrellas => setEstrellas(estrellas)}
      />
      <Text style={styles.label}>Cuerpo</Text>
      <TextInput
        placeholder="Cuerpo de la reseña"
        style={styles.input}
        value={cuerpo}
        onChangeText={cuerpo => setCuerpo(cuerpo)}
      />
      <Button style={styles.button} onPress={enviarReseña} title="Registrar" />
    </View>
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

export default InsertarReseña;