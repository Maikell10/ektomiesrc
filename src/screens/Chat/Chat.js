import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";

import { StatusBar } from "expo-status-bar";
import MyHeader from "../../components/MyHeader";
import Colors from "../../constants/Colors";
import { SIZES, icons } from "../../constants";

const Chat = ({ navigation }) => {
    const scrollViewRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
    const [textChat, setTextChat] = useState("");

    const [chats, setChats] = useState(null);

    function renderChats() {
        var payments = [];

        if (chats) {
            for (let i = 0; i < chats.chats.length; i++) {
                let bgColor = Colors.lightGray1;
                if (chats.chats[i].tipo_user === "cliente") {
                    bgColor = Colors.primary;
                }

                let tipo_user = "";
                let colorTitle = Colors.gray;
                if (chats.chats[i].tipo_user === "aliado") {
                    tipo_user = "OTRO Aliado";
                    colorTitle = Colors.orange;
                } else if (chats.chats[i].tipo_user === "admin") {
                    tipo_user = "Admin";
                    colorTitle = Colors.blue;
                } else {
                    tipo_user = "OTRO Driver";
                    colorTitle = Colors.red;
                }

                if (chats.chats[i].tipo_user === "cliente") {
                    payments.push(
                        <View
                            style={{
                                alignSelf: "flex-end",
                                marginTop: 5,
                                marginHorizontal: 20,
                            }}
                            key={i}
                        >
                            <View
                                style={{
                                    backgroundColor: bgColor,
                                    padding: 8,
                                    borderRadius: 15,
                                    borderBottomRightRadius: 0,
                                    marginBottom: 8,
                                }}
                            >
                                {chats.chats[i].image ? (
                                    <TouchableOpacity
                                        style={{ padding: 10 }}
                                        onPress={() => {
                                            setModalVisible(true);
                                            setImageModal(chats.chats[i].image);
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: chats.chats[i].image,
                                            }}
                                            style={{ width: 150, height: 150 }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <Text>{chats.chats[i].text}</Text>
                                )}

                                <Text
                                    style={{
                                        fontSize: SIZES.body5,
                                        color: COLORS.gray,
                                        textAlign: "right",
                                    }}
                                >
                                    {moment
                                        .unix(chats.chats[i].created_at.seconds)
                                        .utc()
                                        .subtract(4, "hours")
                                        .format("HH:mm a")}
                                </Text>
                            </View>
                        </View>
                    );
                } else {
                    payments.push(
                        <View
                            style={{
                                alignSelf: "flex-start",
                                marginTop: 5,
                                marginHorizontal: 20,
                            }}
                            key={i}
                        >
                            <View
                                style={{
                                    backgroundColor: bgColor,
                                    padding: 8,
                                    borderRadius: 15,
                                    borderBottomLeftRadius: 0,
                                    marginBottom: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        color: colorTitle,
                                        fontWeight: "700",
                                    }}
                                >
                                    {tipo_user}
                                </Text>

                                {chats.chats[i].image ? (
                                    <TouchableOpacity
                                        style={{ padding: 10 }}
                                        onPress={() => {
                                            setModalVisible(true);
                                            setImageModal(chats.chats[i].image);
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: chats.chats[i].image,
                                            }}
                                            style={{ width: 150, height: 150 }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <Text>{chats.chats[i].text}</Text>
                                )}

                                <Text
                                    style={{
                                        fontSize: SIZES.body5,
                                        color: COLORS.gray,
                                        textAlign: "right",
                                    }}
                                >
                                    {moment
                                        .unix(chats.chats[i].created_at.seconds)
                                        .utc()
                                        .subtract(4, "hours")
                                        .format("HH:mm a")}
                                </Text>
                            </View>
                        </View>
                    );
                }
            }
        }

        return (
            <ScrollView
                style={{ backgroundColor: Colors.white }}
                ref={scrollViewRef}
                onContentSizeChange={() =>
                    scrollViewRef.current.scrollToEnd({ animated: true })
                }
            >
                {isLoadingPhoto ? (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            marginTop: 80,
                        }}
                    >
                        <Text style={{ fontSize: SIZES.h2 }}>
                            Subiendo Imágen
                        </Text>
                        <Text style={{ color: Colors.gray }}>
                            Espere un momento por favor
                        </Text>
                        <ActivityIndicator />
                    </View>
                ) : (
                    payments
                )}
            </ScrollView>
        );
    }

    function renderFooter() {
        return (
            <View
                style={{
                    //marginTop: SIZES.radius,
                    backgroundColor: Colors.lightGray,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        height: 55,
                        justifyContent: "center",
                        marginBottom: SIZES.padding,
                        alignItems: "center",
                    }}
                >
                    <TextInput
                        autoCapitalize="true"
                        style={{
                            width: "80%",
                            height: 40,
                            backgroundColor: Colors.white,
                            padding: 10,
                            borderRadius: 15,
                        }}
                        onFocus={() =>
                            setTimeout(() => {
                                scrollViewRef.current.scrollToEnd({
                                    animated: true,
                                });
                            }, 200)
                        }
                        onChangeText={setTextChat}
                        value={textChat}
                        placeholder="Escriba un mensaje"
                        keyboardType="default"
                    />
                    {textChat && (
                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                                backgroundColor: Colors.white,
                                borderRadius: 25,
                                width: 40,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => handleSaveMsj()}
                        >
                            <Image
                                source={icons.enviar}
                                style={{ width: 25, height: 25 }}
                            />
                        </TouchableOpacity>
                    )}
                    {!textChat && (
                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                                backgroundColor: Colors.white2,
                                borderRadius: 25,
                                width: 40,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => handleSavePhoto()}
                        >
                            <Image
                                source={icons.plus}
                                style={{ width: 25, height: 25 }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView
            style={[
                Platform.OS === "android" ? { marginTop: 40 } : "",
                { flex: 1, marginBottom: 0 },
            ]}
        >
            <StatusBar style="dark" />
            <MyHeader
                menu
                onPressMenu={() => navigation.goBack()}
                title={"Chat"}
                //right="more-vertical"
                // onRightPress={() =>
                //     navigation.navigate("ProfileOptions", {
                //         usuario: user,
                //         logout: logout,
                //     })
                // }
            />
            {/* <ScrollView style={{ backgroundColor: Colors.white }}></ScrollView> */}

            {Platform.OS === "ios" && (
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    {/* Chats */}
                    {renderChats()}

                    {/* Footer */}
                    {renderFooter()}
                </KeyboardAvoidingView>
            )}

            {/* Chats */}
            {Platform.OS === "android" && renderChats()}

            {/* Footer */}
            {Platform.OS === "android" && renderFooter()}
        </SafeAreaView>
    );
};

export default Chat;

const styles = StyleSheet.create({});
