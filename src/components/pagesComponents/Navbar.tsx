import { View, StyleSheet, Pressable, Image } from "react-native";

const menuIcon = require("../../../resources/icons/menu-icon.png");
const profile = require("../../../resources/icons/profile.png");

export function Navbar() {
  return (
    <>
      {/* Navbar */}
      <View style={styles.topNavBar}>

        {/** Button -> Return page */}
        <Pressable>
          <Image source={menuIcon} style={styles.menuIcon} />
        </Pressable>

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
  menuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 20
  },
  profile: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20 
  }
});
