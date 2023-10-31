import { Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";

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
        <Layout style={{ flex: 1 }}>
            <Text category="h1" style={{ textAlign: "center", marginTop: 32 }}>
                We pinged the API!
            </Text>
        </Layout>
    )
}