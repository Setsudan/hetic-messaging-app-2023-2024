import { Layout, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";

// const socket = new WebSocket('ws://192.168.1.221:8080');
const socket = new WebSocket(`ws://${process.env.EXPO_PUBLIC_API_IP}:8080`);

export default function SignUpScreen() {

    useEffect(() => {
        console.log('Connecting...');
        // Handle messages received from the server
        socket.onmessage = (event) => {
            console.log('Received message from server:', event.data);
        };

        // Send a message to the server
        socket.send('Hello, server!');

        return () => {
            // Close the WebSocket connection when the component unmounts
            socket.close();
        };
    }, []);


    return (
        <Layout style={{ flex: 1 }}>
            <Text category="h1" style={{ textAlign: "center", marginTop: 32 }}>
                SignUp screen
            </Text>
            {/* <Button onPress={() => { handlePress() }}>Sign Up</Button> */}
        </Layout>
    )
}