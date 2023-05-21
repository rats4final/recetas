import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, Text, View, ActivityIndicator, Image, ScrollView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const DetalleReceta = ({route}) => {
  //no olvidar el return de mierda
  const ancho = Dimensions.get('window').width;
  const [receta, setReceta] = useState({images:[],ingredientes:[],reseñas:[]}); // investigar mas sobre useState(), muy importante;
  const url = 'http://192.168.1.110:8000/api/recetas/'; // extra / para el endpoint
  const {idReceta} = route.params;
  const getReceta = async () => {
    const response = await fetch(`${url}${idReceta}`);
    const data = await response.json();
    console.log(data);
    setReceta(data.data);
  };
  useEffect(() => {
    getReceta();
  }, []);
  console.log(idReceta);
  return (
    <View style={{ flex: 1 }}>
      <Text style={{color: 'black'}}>{receta.nombre}</Text>
      <Text style={{color: 'black'}}>
        {receta.categoria && receta.categoria.nombre}
      </Text>
      <Carousel
        mode='parallax'
        loop
        width={ancho}
        height={ancho / 2}
        autoPlay={false}
        scrollAnimationDuration={1000}
        data={receta.images}
        renderItem={({item})=>(//esto es como un foreach basicamente
            <Image
                key={item.id}
                style={{width: ancho, height: ancho / 2}}
                source={{uri:item.url}}
            />
        )}
      />
      <Carousel
      vertical={true}
      loop
      width={ancho}
      height={ancho/2}
      autoPlay={false}
      scrollAnimationDuration={1000}
      data={receta.ingredientes}
      renderItem={({item})=>(
        <Text style={{color:'black'}}>{item.nombre}</Text>
      )}
      />
      <ScrollView>
        {
            receta.reseñas.map((reseña)=>(
                <Text key={reseña.id} style={{color:'black'}}>{reseña.cuerpo}</Text>
            ))
        }
      </ScrollView>
    </View>
  );
};

export default DetalleReceta;
