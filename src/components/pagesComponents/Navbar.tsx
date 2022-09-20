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
        <Image source={profile} style={styles.profile} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topNavBar: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuIcon: {
    width: 35,
    height: 35,
    marginTop: 70,
    marginLeft: 20,
  },
  profile: {
    width: 51,
    height: 50,
    marginTop: 60,
    marginRight: 20,
  },
});
