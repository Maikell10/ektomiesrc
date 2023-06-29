import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import FormInput from "../../components/FormInput";
import ChatCard from "../../components/ChatCard";

import { constants } from "../../constants/index";
import Colors from "../../constants/Colors";

import { useNavigation } from "@react-navigation/native";

function ChatScreen() {
    const navigation = useNavigation();
    const [buscar, setBuscar] = useState("");

    return (
        <View style={styles.container}>
            {/* Barra Búsqueda */}
            <FormInput
                placeholder={"Búsqueda"}
                value={buscar}
                containerStyle={{
                    width: "90%",
                }}
                inputStyle={{ paddingHorizontal: 5 }}
                onChange={(value) => {
                    setBuscar(value);
                }}
                appendComponent={
                    <View
                        style={{
                            justifyContent: "center",
                            marginRight: 10,
                        }}
                    >
                        <Ionicons
                            name="ios-search-sharp"
                            size={24}
                            color="gray"
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </View>
                }
            />

            {/* Lista de Especialistas disponibles para Chat */}
            <View
                style={{
                    marginVertical: 10,
                    height: 100,
                    marginLeft: 20,
                    alignSelf: "flex-start",
                }}
            >
                <Text
                    style={{
                        marginVertical: 10,
                        fontSize: 16,
                        fontFamily: "Quicksand-Bold",
                    }}
                >
                    Especialistas Disponibles
                </Text>
                <FlatList
                    data={constants.especialistas}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flex: 1,
                                //alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    padding: 5,
                                    paddingHorizontal: 15,
                                    marginLeft: index == 0 ? 3 : 20,
                                    marginRight:
                                        index ==
                                        constants.especialistas.length - 1
                                            ? 20
                                            : 0,
                                    backgroundColor: Colors.white,
                                    borderRadius: 15,
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2.5,
                                    elevation: 1,
                                }}
                                onPress={() => navigation.navigate("Chatt")}
                            >
                                {/* Imagen de Perfil */}
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: 50,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 1,
                                        borderColor: "lightgrey",
                                        shadowColor: "#171717",
                                        shadowOffset: { width: -2, height: 1 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 3,
                                        backgroundColor: "white",
                                    }}
                                >
                                    <FontAwesome
                                        name="user-md"
                                        size={25}
                                        color="black"
                                    />
                                </View>
                                <Text
                                    style={{
                                        fontFamily: "Quicksand-Medium",
                                        marginLeft: 5,
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            {/* Lista de Chats Activos */}
            <ChatCard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
    },
});

export default ChatScreen;
