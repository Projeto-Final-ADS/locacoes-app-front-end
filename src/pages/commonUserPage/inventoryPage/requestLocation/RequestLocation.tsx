import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  FlatList
} from "react-native";

import { useNavigation, useRoute } from '@react-navigation/native'
import { CustomInputText } from "../../../../components/customComponents/CustomInputText";
import { CustomAddButton } from "../../../../components/customComponents/CustomAddButton";
import { Navbar } from "../../../../components/pagesComponents/Navbar";
import { CustomInputNumeric } from "../../../../components/customComponents/CustomInputNumeric";

export function RequestLocation() {

  const route = useRoute();

  const [ itemsList, setItemList ] = useState([]);

  useEffect(()=> {
    setItemList(route.params?.itemsLocationList);
  });

  return (
    <View style={styles.page}>
      <KeyboardAvoidingView behavior="position" enabled>

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Locação</Text>

          <CustomInputNumeric
            placeholder="CEP"
            maxLength={8}
          />
          <CustomInputText
            placeholder="Cidade"
            textContentType="text"
          />

          <CustomInputText
            placeholder="Bairro"
            textContentType="text"
          />

          <CustomInputText
            placeholder="Rua, Lote, Quadra, Número"
            textContentType="text"
          />

          <CustomInputText
            placeholder="UF"
            textContentType="text"
          />

          <View style={styles.buttonAdd}>
            <CustomAddButton/>
          </View>
        
        </View>
        <View>
          {itemsList.length == 0 &&
                    <Text>Nenhum item encontrado</Text>
          }

          <FlatList
            data={itemsList}
            showsVerticalScrollIndicator ={false}
            renderItem={
              ({item}) => (
                <>
                  <Text>{item.productName}</Text>
                </>
              )
            }
            ListFooterComponent={<View style={{height:300}}></View>} //Adiciona espaço abaixo do Flatlist
          />
        </View> 
      </KeyboardAvoidingView>
    </View>
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
  buttonAdd: {
    marginTop: 20
  }
});
