import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router"

const App = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome to my React Native app!</Text>
            <Link href="/auth/signUp">
                <Text>Sign Up</Text>
            </Link>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default App;