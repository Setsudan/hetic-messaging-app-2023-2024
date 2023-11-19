import { Slot } from "expo-router";
import { StyleSheet, Text } from "react-native";

const Layout = () => {
  return (
    <>
      <Slot />
      {__DEV__ && <Text style={styles.debugBanner}>Debug mode</Text>}
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
});

export default Layout;
