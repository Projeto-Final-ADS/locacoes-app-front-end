import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";

import CurrencyInput from 'react-native-currency-input';

import { CreateProduct } from '../services/product';

import { useNavigation } from '@react-navigation/native';

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { Navbar } from "../components/pagesComponents/Navbar";

export function RegisterItemPage() {
  
  const navigation = useNavigation();

  const [ itemName, setItemName ] = useState("");
  const [ itemDescription, setItemDescription ] = useState("");
  const [ itemPrice, setItemPrice ] = useState(0.01);
  const [ itemImage, setItemImage ] = useState("0x00");
  const [ itemAmount, setItemAmount] = useState(1);
  
  useEffect(() => {
    if (itemPrice === null)
      setItemPrice(0.01);
  },[itemPrice]);

  async function handleCreateProduct() {

    const response = await CreateProduct({itemName, itemDescription, itemPrice, itemImage, itemAmount});
    
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

  function clearFields() {
    setItemAmount(1)
    setItemDescription("")
    setItemName("")
    setItemPrice(0.01)
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
            onChangeValue={setItemPrice }
            style={styles.customInputCurrency}
          />

          <Text style={styles.quantidade}>Quantidade:</Text>

          <CurrencyInput
            value={itemAmount}
            delimiter="."
            separator=","
            precision={0}
            minValue={0}
            onChangeValue={setItemAmount }
            style={styles.customInputCurrency}
          />

          <View style={styles.buttons}>
              
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
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 20
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40
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