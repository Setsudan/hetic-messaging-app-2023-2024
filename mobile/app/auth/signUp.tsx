import { Layout, Text } from "@ui-kitten/components";
import checkWebSocketConnection from "../../utils/websocket";
import { useEffect, useState } from "react";

export default function SignUpScreen() {

    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

    useEffect(() => {
        setIsWebSocketConnected(checkWebSocketConnection());
    }, []);

    useEffect(() => {
        if (isWebSocketConnected) {
            console.log("WebSocket is connected");
        } else {
            console.log("WebSocket is not connected");
        }
    }
        , [isWebSocketConnected]);


    return (
        <Layout style={{ flex: 1 }}>
            <Text category="h1" style={{ textAlign: "center", marginTop: 32 }}>
                SignUp screen
            </Text>
            <Text style={{ textAlign: "center", marginTop: 32 }}>
                WebSocket is {isWebSocketConnected ? "connected" : "not connected"}
            </Text>
            {/* <Button onPress={() => { handlePress() }}>Sign Up</Button> */}
        </Layout>
    )
}