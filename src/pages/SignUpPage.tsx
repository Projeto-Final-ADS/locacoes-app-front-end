import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { CustomButton } from "../components/customComponents/CustomButton";

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";

const iconReturnButton = require("../../resources/icons/retornar-icon.png");

export function SignUpPage() {
  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="position" enabled>
        <View>
          
          {/** Button -> Return page */}
          <View>
            <Pressable>
              <Image source={iconReturnButton} style={styles.iconReturnButton} />
            </Pressable>
          </View>

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

            <CustomTextPressable
              text=" Já possui uma conta? Entrar!"
            />

          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF'
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
