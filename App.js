import React from 'react';
import { StyleSheet, Text, Button, TextInput, View, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function App() {
  const [email, setEmail] = React.useState('');
  const [video, setVideo] = React.useState('');

  const __newInstance = async () => {
    fetch('http://127.0.0.1:3000/new-instance')
      .then(response => response.json())
      .then(data => {
        alert(data.msg)
      })
  }

  const _pickDocument = async () => {
    let file = await DocumentPicker.getDocumentAsync({});
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('email', email);

    try {
      const res = await axios.post('http://127.0.0.1:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(res.data.msg);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <View style={styles.container}>
      <View style={[styles.main, styles.shadow]}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Escoge el video que</Text>
          <Text style={styles.text}>desees subir al servidor</Text>
          <Image style={styles.tinyLogo} source={{
            uri: 'https://icon-icons.com/icons2/614/PNG/48/cloud-upload-symbol_icon-icons.com_56540.png',
          }}></Image>
        </View>
        <TextInput style={styles.input} placeholder="Correo electronico"
          onChangeText={(text) => { setEmail(text) }}></TextInput>
        <View style={styles.select}>
          <Button title='Seleccionar video' onPress={_pickDocument} />
        </View>
        <View style={styles.instance}>
          <Button title='Crear nueva instancia' onPress={__newInstance} />
        </View>
      </View>
    </View>
  );
}

function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow: elevationShadowStyle(20),
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  titleContainer: {
    marginBottom: 40,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center'
  },
  text: {
    fontSize: 28,
    textAlign: "center"
  },
  input: {
    margin: 20,
    height: 40,
    width: 310,
    marginBottom: 20,
    textAlign: "center",
    borderBottomColor: '#ccc',
    borderBottomWidth: 2
  },
  select: {
    marginLeft: 20,
    marginRight: 20
  },
  instance: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  }, tinyLogo: {
    width: 48,
    height: 48,
    marginTop:15
  },
});
