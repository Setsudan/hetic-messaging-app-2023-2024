import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Message } from '../../types/API/messages.types';
import { Text, View, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';



const ChatScreen = () => {
    // make a fake message screen  with a fake id   

    const msglist: Message[] = [
        {
            uid: '3434',
            send_uid: 'string',
            chat_uid: 'string',
            group_uid: 'string',
            type: 'text',
            content: 'Bonjour',
            sent_at: new Date(),
            seen_at: new Date(),
            delivered_at: new Date(),
        },
        {
            uid: '5622',
            send_uid: 'string',
            chat_uid: 'string',
            group_uid: 'string',
            type: 'text',
            content: 'Ca va ?',
            sent_at: new Date(),
            seen_at: new Date(),
            delivered_at: new Date(),
        },{
            uid: '3434',
            send_uid: 'string',
            chat_uid: 'string',
            group_uid: 'string',
            type: 'text',
            content: 'oui et toi ?',
            sent_at: new Date(),
            seen_at: new Date(),
            delivered_at: new Date(),
        },{
            uid: '5622',
            send_uid: 'string',
            chat_uid: 'string',
            group_uid: 'string',
            type: 'text',
            content: 'oui je vais bien, merci !',
            sent_at: new Date(),
            seen_at: new Date(),
            delivered_at: new Date(),
        },{
            uid: '3434',
            send_uid: 'string',
            chat_uid: 'string',
            group_uid: 'string',
            type: 'text',
            content: 'alors comment ça se passe ?',
            sent_at: new Date(),
            seen_at: new Date(),
            delivered_at: new Date(),
        },{
            uid: '5622',
            send_uid: 'string',
            chat_uid: 'string',
            group_uid: 'string',
            type: 'text',
            content: 'eh bien ça se passe bien !',
            sent_at: new Date(),
            seen_at: new Date(),
            delivered_at: new Date(),
        },
    ];
    const [userInput, setUserInput] = useState(''); // État pour stocker le texte saisi par l'utilisateur

    const handleSend = () => {
        // Logique pour envoyer le message (à implémenter)
        // Vous pouvez ajouter ici la logique pour envoyer le message à la liste de messages
        // Par exemple, en mettant à jour le state ou en envoyant une requête au serveur.
        // Une fois le message envoyé, réinitialisez userInput à une chaîne vide.
    };

    const { id } = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Message</Text>
            <Text style={styles.id}>Id: {id}</Text>
            {msglist.map((msg, index) => (
                <View style={msg.uid === '3434' ? styles.myMessage : styles.theirMessage} key={index}>
                    <Text style={styles.messageText}>{msg.content}</Text>
                </View>
            ))}
           <TextInput
        style={styles.input}
        placeholder="Écrivez votre message ? "
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
    />
    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        {/* Ajoutez ici la flèche ou tout autre élément */}
        {/* Par exemple, vous pouvez utiliser un composant Text pour afficher une flèche */}
        <Text style={styles.sendButtonText}>➡️</Text>
    </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 17,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    id: {
        fontSize: 18,
        marginBottom: 16,
    },
    myMessage: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-end',
        maxWidth: '70%',
        marginTop: 8,
    },
    theirMessage: {
        backgroundColor: '#FF5733',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        maxWidth: '70%',
        marginTop: 8,
    },
    messageText: {
        fontSize: 16,
        color: 'white',
        
    },
    inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 1,
        marginBottom: 6,
    },
    input: {
        flex: 1, // Pour que le champ d'entrée occupe tout l'espace disponible
        fontSize: 16,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#E5E5EA',
    },
    sendButton: {
        backgroundColor: '#007AFF', // Couleur du bouton "Envoyer"
        padding: 16,
        borderRadius: 8,
        marginLeft: 67, // Marge à gauche pour séparer le champ d'entrée du bouton
    },
    sendButtonText: {
        color: 'white', // Couleur du texte du bouton "Envoyer"
        fontWeight: 'bold',
    },
});

export default ChatScreen;