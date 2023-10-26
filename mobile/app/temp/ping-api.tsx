import { useEffect } from "react";
import { View, Text } from "react-native";

const socket = new WebSocket(`ws://${process.env.EXPO_PUBLIC_API_IP}:8080`);

export default function PinApiScreen() {

    useEffect(() => {
        console.log('Connecting...');
        socket.onmessage = (event) => {
            console.log('Received message from server:', event.data);
        };

        socket.send('Hello, server!');

        return () => {
            socket.close();
        };
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", marginTop: 32 }}>
                We pinged the API!
            </Text>
        </View>
    )
}