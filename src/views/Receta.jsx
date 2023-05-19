import * as React from 'react'
import  {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar, Searchbar, Card, Paragraph, PaperProvider} from 'react-native-paper'
import { ScrollView } from 'react-native';

const App = () => {
  const [recetas, setRecetas] = useState([]);
  const [searchQuery, setSearchQueary] = useState('')
  console.log(recetas);
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php"
  const getRecetas = async function(){
    const response = await fetch(url)
    const data = await response.json();
    setRecetas(data.categories);// cuando usemos la api, borrar .categories
  } 
  useEffect(()=>{
    getRecetas();
  },[])

  const onChangeSearch = query => setSearchQueary(query);

  return (
    <PaperProvider>
      <View style={styles.container}>
        
        <Searchbar
          placeholder='buscar'
          value={searchQuery}
          onChangeText={onChangeSearch}
          mode='bar'
        />
        <Text>Hello, I am your cat!!!</Text>
        <ScrollView>
          {
            recetas.map((receta)=>(// no que callback function?
              <Card key={receta.idCategory}>
                <Card.Title title={receta.strCategory}/>
                <Card.Cover source={{uri: receta.strCategoryThumb}}/>
                <Card.Content>
                  <Paragraph>{receta.strCategoryDescription}</Paragraph>
                </Card.Content>
              </Card>
            ))
          }
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;