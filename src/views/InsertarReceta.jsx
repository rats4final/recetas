import {useEffect, useState} from 'react';
import {Text, SafeAreaView} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {API_URL} from '@env';
import {Button, TextInput} from 'react-native-paper';
import DocumentPicker, {
  types,
  isCancel,
  isInProgress,
} from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';



const InsertarReceta = () => {
  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);

  const [selectedIngredientes, setSelectedIngredientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [instrucciones, setInstrucciones] = useState('');

  const [fecha, setFecha] = useState(new Date())
  const [tiempo, setTiempo] = useState('');
  const [show, setShow] = useState(false);

  const [imagenes, setImagenes] = useState([]);
  const [usuario, setUsuario] = useState(3); // esto esta hardcoded de momento
  const [selectedCategoria, setSelectedCategoria] = useState([]);

  const urlIngredientes = `${API_URL}ingredientes`;
  const urlCategorias = `${API_URL}categorias`;
  const urlRecetas = `${API_URL}recetas`;

  //console.log(selectedIngredientes);
  console.log(imagenes);

  const getIngredientes = async () => {
    const response = await fetch(urlIngredientes);
    const data = await response.json();
    setIngredientes(data.data);
  };

  const getCategorias = async () => {
    const response = await fetch(urlCategorias);
    const data = await response.json();
    setCategorias(data.data);
  };

  const enviarReceta = async () => {
    const formData = new FormData();

    formData.append('nombre', nombre);
    formData.append('instrucciones', instrucciones);
    formData.append('tiempo', tiempo);
    formData.append('id_user', usuario);
    formData.append('id_categoria', selectedCategoria[0]);

    selectedIngredientes.forEach((elemento, indice) => {
      formData.append(`ingredientes[${indice}]`, elemento);
    });

    imagenes.forEach((imagen, indice) => {
      formData.append(`imagenes[${indice}]`, {
        name: imagen.name,
        type: imagen.type,
        uri: imagen.uri, // al parecer para iOS hay que quitarle el file://
      });
    });

    console.log(formData);

    const response = await fetch(urlRecetas, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const onChange = (event, selectedTime) =>{
    const currentDate = selectedTime || fecha
    setShow(false);
    setFecha(currentDate);
    const tiempoFormateado = format(currentDate,'HH:mm');
    setTiempo(tiempoFormateado);
    console.log(tiempoFormateado)
  };

  const showTimePicker = () => {
    setShow(true);
  }

  useEffect(() => {
    getCategorias();
    getIngredientes();
  }, []); // [] es igual a on mount

  return (
    <SafeAreaView>
      <Text className="text-black text-center bg-white m-1 p-2">
        Crea tu propia receta
      </Text>
      <TextInput
        mode="flat"
        label="Nombre de la receta"
        value={nombre}
        onChangeText={nombre => setNombre(nombre)}
      />
      {/* <TextInput
        mode="flat"
        label="Tiempo que toma la receta"
        value={tiempo}
        onChangeText={tiempo => setTiempo(tiempo)}
        inputMode="numeric"
        right={<TextInput.Affix text="minutos" />}
      /> */}
      <Button
        onPress={showTimePicker}
      >Tiempo de la receta
      </Button>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          mode='time'
          value={fecha}
          onChange={onChange}
          display='spinner'
        />
      )}
      <Text
        className="text-black text-left bg-white m-1 p-2"
      >Tiempo de la receta(HH:mm): {tiempo}</Text>
      <TextInput
        mode="flat"
        label="Instrucciones"
        value={instrucciones}
        onChangeText={instrucciones => setInstrucciones(instrucciones)}
        multiline={true}
        right={<TextInput.Icon icon="script-text-outline" />}
      />
      <MultiSelect
        single={true}
        items={categorias}
        uniqueKey="id"
        displayKey="nombre"
        selectedItems={selectedCategoria}
        onSelectedItemsChange={setSelectedCategoria}
        selectText="Selecciona una categoria"
        searchInputPlaceholderText="Buscar una categoria..."
        submitButtonText="Guardar"
      />
      <MultiSelect
        //objeto a usar en el multiselect
        items={ingredientes}
        uniqueKey="id"
        displayKey="nombre"
        //guardar ingredientes seleccionados
        selectedItems={selectedIngredientes}
        onSelectedItemsChange={setSelectedIngredientes}
        //display values
        selectText="Selecciona los ingredientes de la receta"
        searchInputPlaceholderText="Buscar ingredientes..."
        submitButtonText="Guardar"
      />
      <Button
        mode="elevated"
        icon="camera"
        onPress={() => {
          DocumentPicker.pick({
            allowMultiSelection: true,
            type: types.images,
          }).then(setImagenes);
        }}>
        Subir Imagenes
      </Button>
      <Button
        onPress={() => {
          enviarReceta();
        }}>
        Guardar Receta
      </Button>
    </SafeAreaView>
  );
};

export default InsertarReceta;
