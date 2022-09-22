import React from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomButton } from "../components/customComponents/CustomButton";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";

const imagePeopleLooking = require("../../resources/images/people-looking-phone.png");

export function LoginPage() {

  const navigation = useNavigation();

  function handleInventory() {
    //direcionar para outra pagina
    navigation.navigate('inventory');
  }

  function handleSignUp() {
    //direcionar para outra pagina
    navigation.navigate('signup');
  }
  
  function handleForgotPassword() {
    //direcionar para outra pagina
    navigation.navigate('forgotpassword');
  }

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="position" enabled>
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
            <CustomInputText
              placeholder="Digite seu e-mail"
              textContentType='emailAddress'
            />

            <CustomInputText
              placeholder="Digite sua senha"
              textContentType='password'
              secureText={true}
            />

            <CustomButton
              titleButton="Entrar"
              onPress={handleInventory}
            />
            <CustomTextPressable text="Esqueci minha senha." onPress={handleForgotPassword}/>

            <View style={styles.textRegister}>
              <CustomTextPressable text="Não tem uma conta? Registre-se!" onPress={handleSignUp}/>
            </View>

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
  textRegister: {
    marginTop: 20
  }
});
