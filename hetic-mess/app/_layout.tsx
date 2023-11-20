import { Slot } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <>
      <Slot />
    </>
  );
};

const styles = StyleSheet.create({
  debugBanner: {
    backgroundColor: 'orange',
    padding: 5,
    zIndex: 999,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  debugBannerText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Layout;
