import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import { CustomButton } from "../components/customComponents/CustomButton";

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";

const iconReturnButton = require("../../resources/icons/retornar-icon.png");

export function SignUpPage() {
  return (
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

        <CustomInputText placeholder="Digite seu e-mail" />
        <CustomInputText placeholder="Confirme seu e-mail" />
        <CustomInputText placeholder="Digite uma senha" />
        <CustomInputText placeholder="Confirme sua senha" />

        <CustomButton titleButton="Enviar" />

        <CustomTextPressable text=" Já possui uma conta? Entrar!" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
