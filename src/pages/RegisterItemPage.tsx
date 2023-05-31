import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";

import CurrencyInput from 'react-native-currency-input';

import { CreateProduct } from '../services/product';

import { useNavigation, useRoute } from '@react-navigation/native';

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { Navbar } from "../components/pagesComponents/Navbar";
import { CustomOpenPicCamera } from "../components/customComponents/CustomOpenPicCamera";

export function RegisterItemPage() {
  
  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    if (route.params?.imgBase64 !== undefined)
      setImageBase64(route.params?.imgBase64);
  },[route.params]);

  const [ itemName, setItemName ] = useState("");
  const [ itemDescription, setItemDescription ] = useState("");
  const [ itemPrice, setItemPrice ] = useState(0.00);
  const [ imageBase64, setImageBase64 ] = useState("");
  const [ itemAmount, setItemAmount] = useState(1);
  
  useEffect(() => {
    if (itemPrice === null)
      setItemPrice(0.00);
  },[itemPrice]);

  async function handleCreateProduct() {

    const response = await CreateProduct({itemName, itemDescription, itemPrice, imageBase64, itemAmount});
    
    if (response != undefined) {

      if (response.data.sucesso === true) {
        Alert.alert("Sucesso!", "Item criado com sucesso!");
        clearFields();
        navigateInventoryPage();
      }
      if (response.data.sucesso === false)
        Alert.alert("Erro!", "\n" + response.data.mensagem);
    } else {
      Alert.alert("Erro!", "Erro na requisição!");
    }
  }

  function navigateInventoryPage() {
    navigation.navigate('inventory', {refresh: true});
  }
  function navigateCameraPage() {
    navigation.navigate('cameraPage', {returnPage: "registerItem"});
  }

  function clearFields() {
    setItemAmount(1)
    setItemDescription("")
    setItemName("")
    setItemPrice(0.00)
  }

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="padding" enabled>

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Cadastro de Estoque</Text>

          <CustomInputText
            value={itemName}
            placeholder="Nome do item"
            textContentType='none'
            onChange={setItemName}
          />
          <CustomInputText
            value={itemDescription}
            placeholder="Descrição do item"
            textContentType='none'
            onChange={setItemDescription}
          />

          <CurrencyInput
            value={itemPrice}
            prefix="R$"
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            onChangeValue={setItemPrice}
            style={styles.customInputCurrency}
          />

          <Text style={styles.quantidade}>Quantidade:</Text>

          <CurrencyInput
            value={itemAmount}
            delimiter="."
            separator=","
            precision={0}
            minValue={0}
            onChangeValue={setItemAmount}
            style={styles.customInputCurrency}
          />

          <View style={styles.buttons}>

            <CustomOpenPicCamera
              onPress={navigateCameraPage}
              uriBase64Image={imageBase64}
            />

            <View style={styles.button}>
              <CustomAddButton
                onPress={handleCreateProduct}
              />
            </View>
            
          </View>
        
        </View>
        
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
    padding: 20,
    margin: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    marginBottom: 20
  },
  buttons: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    
  },
  customInputCurrency: {
      backgroundColor: '#f8f8f8',
      height: 50,
      width: '80%',
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 18
  },
  quantidade: {
    fontSize: 18,
    marginTop: 5
  }
});