import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Layout, Text } from '@ui-kitten/components';
import { HiUserCircle, HiBell, HiInformationCircle } from "react-icons/hi2";

const Settings = () => {

    const navigateToProfile = () => {
        console.log('navigateToProfile');
        // Code pour naviguer vers la page de modification du profil
    };

    const navigateToNotifications = () => {
        console.log('navigateToNotifications');
        // Code pour naviguer vers la page de notifications
    };

    const navigateToOtherSettings = () => {
        console.log('navigateToOtherSettings');
        // Code pour naviguer vers d'autres options de paramètres
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.header}>
                <Text category='h5'>Paramètres</Text>
            </View>
            <Divider />
            <View style={styles.content}>
                <Button
                    style={styles.button}
                    appearance='ghost'
                    status='basic'
                    //accessoryLeft={(props) => <HiUserCircle style={styles.icon} />}
                    onPress={navigateToProfile}>
                    Modifier le profil
                </Button>
                <Button
                    style={styles.button}
                    appearance='ghost'
                    status='basic'
                    //accessoryLeft={(props) => <HiBell style={styles.icon} />}
                    onPress={navigateToNotifications}>
                    Notifications
                </Button>
                <Button
                    style={styles.button}
                    appearance='ghost'
                    status='basic'
                    //accessoryLeft={(props) => <HiInformationCircle style={styles.icon} />}
                    onPress={navigateToOtherSettings}>
                    Autres paramètres
                </Button>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        alignItems: 'center',
    },
    content: {
        padding: 16,
    },
    button: {
        marginBottom: 16,
    },
    icon: {
        width: 32,
        height: 32,
    },
});

export default Settings;
