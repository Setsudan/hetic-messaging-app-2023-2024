import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Divider, Layout, List, Text } from "@ui-kitten/components";

import { Link } from "expo-router";

const HomeScreen = () => (
    <Layout style={{ flex: 1 }}>
        <Text category="h1" style={{ textAlign: "center", marginTop: 32 }}>
            Routes list
        </Text>
        <List
            style={{ flex: 1, margin: 16, borderRadius: 18 }}
            data={[
                { title: "Sign Up", route: "/auth/signUp" },
                { title: "Sign In", route: "/auth/signIn" },
                { title: "Home", route: "/home" },
                { title: "Settings", route: "/settings" },
                { title: "Profile", route: "/settings/profile" },
                // { title: "Notifications", route: "/settings/notifications" },
                // { title: "Other Settings", route: "/settings/otherSettings" },
            ]}
            renderItem={({ item }) => (
                <>
                    <Link href={item.route} style={{ fontSize: 18, marginVertical: 24, marginHorizontal: 12 }}>
                        <Text style={{ marginVertical: 16 }}>{item.title}</Text>
                    </Link>
                    <Divider />
                </>
            )}
        />
    </Layout>
);

export default () => (
    <ApplicationProvider {...eva} theme={eva.dark}>
        <HomeScreen />
    </ApplicationProvider>
);
