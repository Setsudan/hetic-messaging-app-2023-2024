import { View, ScrollView, Text, StyleSheet } from "react-native";

import { useEffect, useState } from "react";

export default function UsersListScreen() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        fetch(`https://a8a3-77-132-153-46.ngrok-free.app/users/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.code !== 200) {
                    setError(json.message)
                } else {
                    setUsers(json.data)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {loading ? <Text>Loading...</Text> : users.map((user) => (
                    <View key={user.uuid}
                        style={styles.userContainer}
                    >
                        <View
                            style={styles.userInfo}
                        >
                            <Text style={{ color: "#fff" }}>{user.profile_picture}</Text>
                            <Text style={{ color: "#fff" }}>{user.email}</Text>
                            <Text style={{ color: "#fff" }}>{user.username}</Text>
                            <Text style={{ color: "#fff" }}>{user.uuid}</Text>
                        </View>
                        <Text style={{ color: "#fff" }}>{user.display_name}</Text>
                        <Text
                            style={styles.userAbout}
                        >
                            About
                        </Text>
                        <Text style={{ color: "#fff" }}>{user.about}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b2b2b",
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    userContainer: {
        flex: 1,
        backgroundColor: "#2b2b2b",
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    userInfo: {
        color: "#fff",
        fontSize: 24,
        marginBottom: 16,
    },
    userAbout: {
        color: "#fff",
        fontSize: 24,
        marginBottom: 16,
    },
});