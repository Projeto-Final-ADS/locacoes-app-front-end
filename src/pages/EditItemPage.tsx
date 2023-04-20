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

import { useNavigation, useRoute } from '@react-navigation/native';

import { deleteProduct, updateProduct } from '../services/product';

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomEditButton } from "../components/customComponents/CustomEditButton";
import { Navbar } from "../components/pagesComponents/Navbar";
import { CustomCancelButton } from "../components/customComponents/CustomCancelButton";

export function EditItemPage() {

  const navigation = useNavigation();

  const route = useRoute();

  const [ itemId, setItemId ] = useState(-1);
  const [ itemName, setItemName ] = useState("");
  const [ itemDescription, setItemDescription ] = useState("");
  const [ itemPrice, setItemPrice ] = useState(0.01);
  const [ itemImage, setItemImage ] = useState("0x00");
  const [ itemAmount, setItemAmount] = useState(1);
  
  useEffect(() => {
    if (itemPrice === null)
      setItemPrice(0.01);
  },[itemPrice]);
  
  useEffect(() => {
    if (itemAmount === null)
      setItemAmount(0);
  },[itemAmount]);

  useEffect(() => {
    toFillFields();
  }, [route?.params?.item]);

  function toFillFields() {
    setItemId(route?.params?.item.id);
    setItemAmount(route?.params?.item.quantidade);
    setItemDescription(route?.params?.item.descricao);
    setItemName(route?.params?.item.nome);
    setItemPrice(route?.params?.item.preco);
  }

  async function updateStorage() {
    
    const responseProduct = await updateProduct({itemId, itemName, itemDescription, itemPrice, itemImage, itemAmount});
    
    if (responseProduct?.data.sucesso == true) {
        Alert.alert("Sucesso!","Produto atualizado com sucesso!");
        navigateInventoryPage();
    } else {

      if (responseProduct?.data.mensagem != undefined)
        Alert.alert("Erro!", responseProduct?.data.mensagem + ".");
    }
  }

  function alertConfirmDelete() {
    Alert.alert(
      "Confirmar",
      "Você realmente deseja excluir este item?",
      [{
        text: "Sim",
        onPress: () => {
          deleteProductStorage();
        }
      },
      {
        text: "Não",
      }]
    );
  }

  async function deleteProductStorage() {

      const responseProduct = await deleteProduct({itemId});
  
      if (responseProduct?.data.sucesso) {
        Alert.alert("Sucesso!","Produto excluido do estoque!");
        navigateInventoryPage();
      } else {
        if (responseProduct?.data.mensagem != undefined)
          Alert.alert("Erro!", responseProduct?.data.mensagem + ".");
      }
  }

  function navigateInventoryPage() {
    navigation.navigate('inventory', {refresh: true});
  }

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="padding" enabled>

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Editar Item</Text>

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
            onChangeValue={ setItemPrice }
            style={styles.customInputCurrency}
          />

          <Text style={styles.quantidade}>Quantidade:</Text>

          <CurrencyInput
            value={itemAmount}
            delimiter="."
            separator=","
            precision={0}
            minValue={0}
            onChangeValue={ setItemAmount }
            style={styles.customInputCurrency}
          />

          <View style={styles.buttons}>     

            <View style={styles.button}>
              <CustomCancelButton
                onPress={alertConfirmDelete}
              />
            </View>

            <View style={styles.button}>
              <CustomEditButton
                onPress={updateStorage}
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