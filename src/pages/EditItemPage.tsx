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

import { DeleteProduct, UpdateProduct } from '../services/product';

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomEditButton } from "../components/customComponents/CustomEditButton";
import { Navbar } from "../components/pagesComponents/Navbar";
import { CustomCancelButton } from "../components/customComponents/CustomCancelButton";
import { CustomOpenPicCamera } from "../components/customComponents/CustomOpenPicCamera";

interface Item {
  id: number;
  quantidade: number;
  descricao: string;
  nome: string;
  preco: number;
  imagem: string;
}
export function EditItemPage() {

  const navigation = useNavigation();
  const route = useRoute();

  const [ item, setItem ] = useState<Item>();
  const [ itemId, setItemId ] = useState(-1);
  const [ itemName, setItemName ] = useState("");
  const [ itemDescription, setItemDescription ] = useState("");
  const [ itemPrice, setItemPrice ] = useState(0.01);
  const [ imageBase64, setImageBase64 ] = useState("");
  const [ itemAmount, setItemAmount] = useState(1);

  useEffect(() => {
    if (route.params?.imgBase64 !== undefined)
      setImageBase64(route.params?.imgBase64);
  },[route.params]);
  
  useEffect(() => {
    if (itemPrice === null)
      setItemPrice(0.01);
  },[itemPrice]);
  
  useEffect(() => {
    if (itemAmount === null)
      setItemAmount(0);
  },[itemAmount]);

  useEffect(() => {
    setItem(route?.params?.item);
  }, [route?.params?.item]);

  useEffect(() => {
    if (item !== undefined)
    toFillFields();
  }, [item]);

  function toFillFields() {
    if (item != undefined) {
      setItemId(item.id);
      setItemAmount(item.quantidade);
      setItemDescription(item.descricao);
      setItemName(item.nome);
      setItemPrice(item.preco);
      setImageBase64(item.imagem);
    }
    
  }

  async function updateStorage() {
    
    const responseProduct = await UpdateProduct({itemId, itemName, itemDescription, itemPrice, imageBase64, itemAmount});
    
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

      const responseProduct = await DeleteProduct({itemId});
  
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

  function navigateCameraPage() {
    navigation.navigate('cameraPage', {returnPage: "editItemPage", body: route?.params?.item});
  }

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="padding" enabled>

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Editar Item</Text>

          <Text style={styles.quantidade}>Nome do item:</Text>
          <CustomInputText
            value={itemName}
            placeholder="Nome do item"
            textContentType='none'
            onChange={setItemName}
          />

          <Text style={styles.quantidade}>Descrição:</Text>

          <CustomInputText
            value={itemDescription}
            placeholder="Descrição do item"
            textContentType='none'
            onChange={setItemDescription}
          />

          <Text style={styles.quantidade}>Preço:</Text>

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

          <View style={styles.picture}>
            <CustomOpenPicCamera
              onPress={navigateCameraPage}
              uriBase64Image={imageBase64}
            />
          </View>

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
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
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
      fontSize: 18,
      marginBottom: 10
  },
  quantidade: {
    fontSize: 18,
  },
  picture: {
    marginTop: 20
  }
});