import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function IndexScreen() {
    return (
        <View>
            <Text>Index Screen</Text>
            <Link href="/about">About</Link>
        </View>
    );
}
