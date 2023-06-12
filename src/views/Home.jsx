import {useEffect, useState} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  Section,
  Image,
  Alert,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import InsertarReceta from './InsertarReceta';
import { Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-screens';

const Home = () => {
  const [user, setUser] = useState('');
  const [recetas, setRecetas] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredRecetas, setFilteredRecetas] = useState([]);
  const navigation = useNavigation();
  return (
    <View>
      <SearchBar/>
      <ScrollView>
      <Card>
          <Card.Title title="" subtitle="Tu recetario de confianza" />
          <Card.Cover/>
          <Card.Content>
            <Paragraph></Paragraph>
          </Card.Content>
      </Card>
      </ScrollView>
      <Button title='Insertar' onPress={()=>navigation.navigate('Crear una receta')}/>
    </View>
  );
};

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Tus Recetas" component={Home} />
      <HomeStack.Screen name="Crear una receta" component={InsertarReceta} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
