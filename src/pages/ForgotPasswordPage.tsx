import React from "react";

import {
  View,
  Pressable,
  Image,
  StyleSheet,
  Text
} from "react-native";

import { CustomButton } from "../components/customComponents/CustomButton";
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";

const iconReturnButton = require("../../resources/icons/retornar-icon.png");
const forgotPassImage = require("../../resources/images/esqueci-senha.png");

export function ForgotPasswordPage() {
  return (
    <View>
      {/** Button -> Return page */}
      <Pressable>
        <Image source={iconReturnButton} style={styles.iconReturnButton} />
      </Pressable>

      {/** Body page */}
      <View style={styles.container}>
        <Image source={forgotPassImage} style={styles.forgotPassImage} />

        <Text style={styles.title}>Enviar e-mail de recuperação</Text>

        <CustomInputText placeholder="Digite seu e-mail" />

        <CustomButton titleButton="Enviar" />

        <CustomTextPressable text=" Não tem uma conta? Clique aqui!" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  iconReturnButton: {
    resizeMode: "contain",
    height: 50,
    width: 50,
    marginTop: 50,
    marginLeft: 20,
  },
  forgotPassImage: {
    resizeMode: "contain",
    height: 200,
    width: 200,
  },
});
