import React from "react";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Alert
} from "react-native";

import { CustomButton } from "../components/customComponents/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";
import { CustomReturnButton } from "../components/customComponents/CustomReturnButton";
import { SignUp } from '../services/signup';

interface signUp {
  email_username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function SignUpPage() {

  const navigation = useNavigation();

  const [ name, setName ] = useState('');
  const [ lastName, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ confirmEmail, setConfirmEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  function navigateLogin() {
    //direcionar para outra pagina
    navigation.navigate('login');
  }

  function verifyFieldsMatch() {
    if (email === confirmEmail) {
      if ( password === confirmPassword) {
        return true;
      }
    }
    return false;
  }

  function verifyFieldsNotNull() {
    if (name === '') {
      Alert.alert("Erro", "Digite um nome válido!");
      return false;
    }
    if (lastName === '') {
      Alert.alert("Erro", "Digite um sobrenome válido!");
      return false;
    }
    if (email === '') {
      Alert.alert("Erro", "Digite um email válido!");
      return false;
    }
    if (password === '') {
      Alert.alert("Erro", "Digite uma senha válida!");
      return false;
    }
    return true;
  }

  async function CreateNewUser() {
    if (verifyFieldsNotNull()) {
      if (verifyFieldsMatch()) {
        const user:signUp = {
          email_username: email,
          password: password,
          firstName: name,
          lastName: lastName,
        }
    
        const response = await SignUp(user);
            
        if (response != undefined) {
            if (response.data.sucesso == true) {
                    
                navigation.navigate("login");
                    
                Alert.alert("Sucesso!", "Cadastro realizado com sucesso!");
            }
            if (response.data.sucesso == false) {
                Alert.alert("Erro", response.data.mensagem);
            }
        }
      } else {
        Alert.alert("Erro", "Confirme se o email e senha foram digitados corretamente!");
      }
    }
  }

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="position" enabled>
        <View>
          
          {/** Button -> Return page */}
          <CustomReturnButton
            onPress={navigateLogin}
          />

          {/** Body SignUp */}
          <View style={styles.container}>
            <Text style={styles.title}>Cadastrar</Text>

            <CustomInputText
              placeholder="Digite seu nome"
              textContentType='name'
              onChange={setName}
              value={name}
            />

            <CustomInputText
              placeholder="Digite seu sobrenome"
              textContentType='name'
              onChange={setLastname}
              value={lastName}
            />

            <CustomInputText
              placeholder="Digite seu e-mail"
              textContentType='emailAddress'
              onChange={setEmail}
              value={email}
            />

            <CustomInputText
              placeholder="Confirme seu e-mail"
              textContentType='emailAddress'
              onChange={setConfirmEmail}
              value={confirmEmail}
            />

            <CustomInputText
              placeholder="Digite uma senha"
              textContentType='password'
              secureText={true}
              onChange={setPassword}
              value={password}
            />

            <CustomInputText
              placeholder="Confirme sua senha"
              textContentType='newPassword'
              secureText={true}
              onChange={setConfirmPassword}
              value={confirmPassword}
            />

            <CustomButton
              titleButton="Enviar"
              onPress={CreateNewUser}
            />

            <View style={{marginTop: 20, flexDirection: 'row'}}>
              <Text style={{fontSize: 18}}>
                Já possui uma conta?
              </Text>
              <CustomTextPressable
                text=" Entrar!"
                onPress={navigateLogin}
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
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "10%",
  },
  title: {
    fontSize: 40,
    color: "#019874",
    fontWeight: "bold",
    marginBottom: 20,
  },
  iconReturnButton: {
    resizeMode: "contain",
    height: 50,
    width: 50,
    marginTop: 50,
    marginLeft: 20,
  },
});
