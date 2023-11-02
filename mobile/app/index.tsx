import React from "react";

import { Link } from "expo-router";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const pages = [
    { title: "Sign Up", route: "/auth/signUp" },
    { title: "Sign In", route: "/auth/signIn" },
    { title: "Home", route: "/home" },
    { title: "Users List", route: "/users/list" },
]

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <ScrollView>
                {pages.map((page) => (
                    <View key={page.title}>
                        <Link
                            style={styles.pageLink}
                            href={page.route}>
                            {page.title}
                        </Link>
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
    pageLink: {
        color: "#fff",
        fontSize: 24,
        marginBottom: 16,
    },
});

export default HomeScreen;