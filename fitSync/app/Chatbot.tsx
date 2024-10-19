import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './dialogFlowConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import chabotImg from '../assets/images/chatbot.png';

const ChatScreen = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        // Initialize Dialogflow with the correct configuration
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key.replace(/\\n/g, '\n'), // Replace newlines
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        );

        // Initial welcome message
        setMessages([
            {
                _id: 1,
                text: 'Hello! How can I assist you today?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chatbot',
                    avatar: chabotImg,
                },
            },
        ]);
    }, []);

    const onSend = (newMessages: IMessage[] = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

        const userMessage = newMessages[0].text;
        const sessionId = 'unique-session-id'; // Use a unique session ID

        // Use CORS proxy
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        const DIALOGFLOW_ENDPOINT = `https://dialogflow.googleapis.com/v2/projects/${dialogflowConfig.project_id}/agent/sessions/${sessionId}:detectIntent`;

        const requestBody = {
            queryInput: {
                text: {
                    text: userMessage,
                    languageCode: 'en-US',
                },
            },
        };

        fetch(CORS_PROXY + DIALOGFLOW_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dialogflowConfig.token_uri}`, // If you're using OAuth2 token
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                const chatbotResponse = data.queryResult?.fulfillmentText || "I didn't quite get that.";
                const botMessage: IMessage = {
                    _id: Math.random().toString(36).substring(7),
                    text: chatbotResponse,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Chatbot',
                        avatar: chabotImg,
                    },
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const renderBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#15b9a6',
                        borderRadius: 20,
                        padding: 5,
                    },
                    left: {
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 5,
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                    left: {
                        color: '#333',
                    }
                }}
            />
        );
    };

    const renderSend = (props: any) => {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <Icon name="send" size={24} color="#15b9a6" />
                </View>
            </Send>
        );
    };

    const renderInputToolbar = (props: any) => {
        return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
                _id: 1,
            }}
            placeholder="Type your message here..."
            alwaysShowSend
            showUserAvatar
            renderAvatarOnTop
            renderBubble={renderBubble} // Custom bubble
            renderSend={renderSend} // Custom send button
            renderInputToolbar={renderInputToolbar} // Custom input toolbar
        />
    );
};

const styles = StyleSheet.create({
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        padding: 10
    },
    inputToolbar: {
        // borderTopWidth: 1,
        borderTopColor: '#fff',
        paddingVertical: 5,
    },
});

export default ChatScreen;
