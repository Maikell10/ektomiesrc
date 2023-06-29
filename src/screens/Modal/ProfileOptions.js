import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import MyHeader from "../../components/MyHeader";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { updateUserProfile } from "../../config/services";
import { firebase } from "../../config/firebase-config";

const ProfileOptions = ({ navigation, route }) => {
    const user = route.params.usuario;
    const onPress = route.params.logout;

    const cerrarSesion = () => {
        onPress();
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyHeader
                // menu
                // onPressMenu={() => navigation.goBack()}
                title={user?.nameUser}
                headerBg="rgba(215, 215, 215, 0.5 )"
                style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
            />

            <View style={{ alignItems: "center", marginTop: 25 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("ProfileData", {
                            usuario: user,
                            logout: onPress,
                        })
                    }
                >
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                    <Feather name="edit" size={30} color="white" />
                </TouchableOpacity>

                {!user.medico && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            Alert.alert(
                                "¿Quieres ofrecer tus servicios profecionales en Ektomie?",
                                "Te solicitaremos varios datos para tu registro!",
                                [
                                    {
                                        text: "No",
                                        onPress: () =>
                                            console.log("Cancel Pressed"),
                                        style: "cancel",
                                    },
                                    {
                                        text: "Sí",
                                        onPress: async () => {
                                            const jsonValue =
                                                await AsyncStorage.getItem(
                                                    "@currentUser"
                                                );
                                            await updateUserProfile(
                                                JSON.parse(jsonValue).uid
                                            );
                                            navigation.navigate("Home");
                                        },
                                    },
                                ],
                                { cancelable: false }
                            )
                        }
                    >
                        <Text style={styles.buttonText}>
                            Ofrece tus servicios
                        </Text>
                        <AntDesign name="medicinebox" size={30} color="white" />
                    </TouchableOpacity>
                )}
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <TouchableOpacity
                    onPress={cerrarSesion}
                    style={[
                        styles.button,
                        { backgroundColor: "rgba(132, 132, 132, 0.8)" },
                    ]}
                >
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                    <Feather name="log-out" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        marginTop: 8,
        width: "80%",
        height: 50,
        backgroundColor: "rgba(96, 197, 168, 1)",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        marginRight: 5,
        fontFamily: "Quicksand-Bold",
    },
});

export default ProfileOptions;
