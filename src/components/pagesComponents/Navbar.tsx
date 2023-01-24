import { View, StyleSheet, Image, TouchableOpacity} from "react-native";
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
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60
  },
  profile: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20 
  }
});
