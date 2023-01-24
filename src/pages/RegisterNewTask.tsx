import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from "react-native";


import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { Navbar } from "../components/pagesComponents/Navbar";
import { CustomCancelButton } from "../components/customComponents/CustomCancelButton";

import DateTimePicker from '@react-native-community/datetimepicker';

export function RegisterNewTask() {
  
  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="padding" enabled>

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Cadastro de Tarefa</Text>

          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={"date"}
            is24Hour={true}
            display='default'
          />

          <CustomInputText
            placeholder="Cliente"
            textContentType="text"
          />

          <CustomInputText
            placeholder="Data Entrega"
            textContentType="text"
          />
          <CustomInputText
            placeholder="Hora Entrega"
            textContentType="text"
          />
          <CustomInputText
            placeholder="Data Recolhimento"
            textContentType="text"
          />
          <CustomInputText
            placeholder="Hora Recolhimento"
            textContentType="text"
          />

          <View style={styles.buttons}>

            <View style={styles.button}>
              <CustomCancelButton/>
            </View>
              
            <View style={styles.button}>
              <CustomAddButton/>
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
  }
});
