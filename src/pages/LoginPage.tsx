import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from "react-native";
import { useNavigation } from '@react-navigation/native'
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomButton } from "../components/customComponents/CustomButton";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";

const imagePeopleLooking = require("../../resources/images/people-looking-phone.png");

export function LoginPage() {

  const navigation = useNavigation();

  function handleTasksPage() {
    //direcionar para outra pagina
    navigation.navigate('tasksPage');
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
                height: 150,
                width: 150,
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
              onPress={handleTasksPage}
            />

            <View style={{marginTop: 20, alignItems: 'center'}}>
              <CustomTextPressable
                text="Esqueci minha senha!"
                onPress={handleForgotPassword}
              />

              <View style={styles.textRegister}>
                <Text style={{fontSize: 18}}>
                  Não tem uma conta?
                </Text>
                <CustomTextPressable
                  text=" Registre-se!"
                  onPress={handleSignUp}
                />
              </View>
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
  logo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 180,
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
    marginTop: 20,
    flexDirection: 'row'
  }
});
