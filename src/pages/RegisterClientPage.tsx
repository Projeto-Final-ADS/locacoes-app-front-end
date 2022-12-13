import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from "react-native";

import { useNavigation } from '@react-navigation/native'
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { Navbar } from "../components/pagesComponents/Navbar";

export function RegisterClientPage() {

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="position" enabled>

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Cadastrar de Cliente</Text>

          <CustomInputText
            placeholder="Nome do cliente"
            textContentType="text"
          />

          <CustomInputText
            placeholder="Rua"
            textContentType="text"
          />

          <CustomInputText
            placeholder="Bairro"
            textContentType="text"
          />

          <CustomInputText
            placeholder="Cidade"
            textContentType="text"
          />

          <View style={styles.buttonAdd}>
            <CustomAddButton/>
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
  buttonAdd: {
    marginTop: 20
  }
});
