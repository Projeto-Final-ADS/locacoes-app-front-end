import { useState } from "react";
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
import { CustomInputPersonalData } from "../components/customComponents/CustomInputCPF";
import { CustomInputNumeric } from "../components/customComponents/CustomInputNumeric";

export function RegisterClientPage() {

  const navigation = useNavigation();

  const [cpf, setCpf] = useState();

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="position" enabled>

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Cadastro de Cliente</Text>

          <CustomInputText
            placeholder="Nome do cliente"
            textContentType="text"
          />

          <CustomInputPersonalData
            placeholder="CPF"
            type='cpf'
            onChange={setCpf}
            value={cpf}
          />
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
            placeholder="Rua"
            textContentType="text"
          />

          <View style={{width: "80%"}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', width: "105%"}}>

              <View style={{width: 100}}>
                <CustomInputText
                  placeholder="Qd."
                  textContentType="text"
                />
              </View>

              <View style={{width: 100}}>
                <CustomInputText
                  placeholder="Lt."
                  textContentType="text"
                />
              </View>

              <View style={{width: 100}}>
                <CustomInputText
                  placeholder="Nº"
                  textContentType="text"
                />
              </View>

            </View>
          </View>

          <CustomInputText
            placeholder="Complemento"
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 20
  },
  buttonAdd: {
    marginTop: 10
  }
});
