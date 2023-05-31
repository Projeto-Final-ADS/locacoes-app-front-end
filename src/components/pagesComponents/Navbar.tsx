import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import { MenuButton } from "../customComponents/MenuButton";
import { ReturnButton } from "../customComponents/ReturnButton";


const profile = require("../../../resources/icons/profile.png");

export function Navbar() {
  return (
    <>
      {/* Navbar */}
      <View style={styles.topNavBar}>

        {/** Button -> Return page */}
        <ReturnButton/>
        <MenuButton/>
        {/** Imagem perfil */}
        <Image source={profile} style={styles.profile} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topNavBar: {
    backgroundColor: "#ffffff",
    width: Dimensions.get("screen").width - 15,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
    marginLeft: 15
  },
  profile: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20 
  }
});
