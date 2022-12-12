import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";

import { CustomButton } from "../components/customComponents/CustomButton";
import { useNavigation } from '@react-navigation/native'
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";
import { CustomReturnButton } from "../components/customComponents/CustomReturnButton";


export function SignUpPage() {

  const navigation = useNavigation();

  function navigateLogin() {
    //direcionar para outra pagina
    navigation.navigate('login');
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
              placeholder="Digite seu e-mail"
              textContentType='emailAddress'
            />

            <CustomInputText
              placeholder="Confirme seu e-mail"
              textContentType='emailAddress'
            />

            <CustomInputText
              placeholder="Digite uma senha"
              textContentType='password'
              secureText={true}
            />

            <CustomInputText
              placeholder="Confirme sua senha"
              textContentType='newPassword'
              secureText={true}
            />

            <CustomButton
              titleButton="Enviar"
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
    marginTop: "30%",
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
