import React from "react";

import {
  View,
  Pressable,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { CustomButton } from "../components/customComponents/CustomButton";
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomTextPressable } from "../components/customComponents/CustomTextPressable";

const iconReturnButton = require("../../resources/icons/retornar-icon.png");
const forgotPassImage = require("../../resources/images/esqueci-senha.png");

export function ForgotPasswordPage() {

  const navigation = useNavigation();

  function handleSignUp() {
    //direcionar para outra pagina
    navigation.navigate('signup');
  }

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView behavior="position" enabled>
        <View>
          {/** Button -> Return page */}
          <Pressable>
            <Image
              source={iconReturnButton}
              style={styles.iconReturnButton}
            />
          </Pressable>

          {/** Body page */}
          <View style={styles.container}>
            <Image
              source={forgotPassImage}
              style={styles.forgotPassImage}
            />

            <Text style={styles.title}>
              Enviar e-mail de recuperação
            </Text>

            <CustomInputText
              placeholder="Digite seu e-mail"
              textContentType='emailAddress'
            />

            <CustomButton 
              titleButton="Enviar"
            />

            <View style={{marginTop: 20, flexDirection: 'row'}}>
              <Text style={{fontSize: 18}}>
                Não tem uma conta?
              </Text>
              <CustomTextPressable
                text=" Clique aqui!"
                onPress={handleSignUp}
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
