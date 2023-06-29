import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const ChatCard = () => {
    return (
        <TouchableOpacity
            style={{
                marginVertical: 15,
                flexDirection: "row",
                backgroundColor: Colors.white,
                justifyContent: "space-around",
                width: "90%",
                padding: 5,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2.5,
                elevation: 2,
            }}
        >
            {/* Imagen de Perfil */}
            <View
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "lightgrey",
                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    backgroundColor: "white",
                }}
            >
                <FontAwesome name="user-md" size={48} color="black" />
            </View>

            {/* Nombre & Ultimo Msj */}
            <View
                style={{
                    flex: 1,
                    margin: 5,
                    marginLeft: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        color: "#5A5959",
                        fontFamily: "Quicksand-Bold",
                    }}
                    numberOfLines={1}
                >
                    Dr Olivos
                </Text>

                <View style={{ flexDirection: "row" }}>
                    <Ionicons name="checkmark-done" size={20} color="black" />
                    <Text
                        style={{
                            color: "gray",
                            marginLeft: 5,
                            fontFamily: "Quicksand-Medium",
                        }}
                        numberOfLines={2}
                    >
                        Hola quisiera saber en que Clínica esta atendiendo y si
                        hay cupo?
                    </Text>
                </View>
            </View>

            {/* Hora de Ultimo Msj */}
            <View
                style={{
                    margin: 5,
                    marginRight: 10,
                }}
            >
                <Text style={{ color: "gray", fontFamily: "Quicksand-Medium" }}>
                    11:50am
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatCard;
