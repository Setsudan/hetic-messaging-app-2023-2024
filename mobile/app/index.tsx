import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router"


const App = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome to my React Native app!</Text>
            <View style={styles.columns}>
                <Link
                    style={styles.links}
                    href={"/auth/signUp"}>Sign Up</Link>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    links: {
        marginTop: 20,
        color: "#2b2b2b",
        padding: 10,
        borderBottomColor: "#2b2b2b",
        width: 100,
        textAlign: "center",
        borderBottomWidth: 1
    },
    columns: {
        flexDirection: "row"
    }
});

export default App;