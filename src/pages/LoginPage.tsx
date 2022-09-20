import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomButton } from "../components/customComponents/CustomButton";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";

const imagePeopleLooking = require("../../resources/images/people-looking-phone.png");

export function LoginPage() {
  return (
    <View>
      {/** View Logo */}
      <View style={styles.logo}>
        <Image
          source={require("../../resources/images/logo-cubebox.png")}
          style={{ resizeMode: "contain", height: 75, width: 75 }}
        />
        <Text style={styles.titleLogo}>Locações</Text>
      </View>

      {/** View Container Login */}
      <View style={styles.container}>
        <Image
          source={imagePeopleLooking}
          style={{
            resizeMode: "contain",
            height: 175,
            width: 175,
            marginTop: 20,
            marginBottom: 20,
          }}
        />
        <CustomInputText placeholder="Digite seu e-mail" />
        <CustomInputText placeholder="Digite sua senha" />
        <CustomButton titleButton="Entrar" />
        <CustomTextPressable text="Esqueci minha senha." />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 200,
  },
  titleLogo: {
    color: "#019874",
    fontSize: 40,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
});
