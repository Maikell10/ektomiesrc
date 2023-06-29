import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Button,
    SafeAreaView,
    Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MyHeader from "../components/MyHeader";

import { store, logOut, setUser } from "../context/redux";
import { icons } from "../constants";

import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";

const Perfil = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [isEnabledMed, setIsEnabledMed] = useState(false);

    const [loading, setLoading] = useState(false);

    const user = store.getState().user?.payload;

    const logout = async () => {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem("@auth");
        //console.log("valor", jsonValue);
        logOut;
        if (jsonValue != null) {
            const authFromJson = JSON.parse(jsonValue);
            if (authFromJson.accessToken) {
                await AuthSession.revokeAsync(
                    {
                        token: authFromJson.accessToken,
                    },
                    {
                        revocationEndpoint:
                            "https://oauth2.googleapis.com/revoke",
                    }
                );
            }

            // setAuthGoogle(undefined);
            // setUserInfo(undefined);
            store.dispatch(setUser(null));
            await AsyncStorage.clear();
            setLoading(false);

            navigation.replace("Login");
        }
    };

    useEffect(() => {
        console.log("State perfil=>", store.getState());
    }, [isFocused]);

    const toggleSwitchMedico = () => {
        setIsEnabledMed((previousState) => !previousState);

        const storeData = async () => {
            try {
                await AsyncStorage.setItem(
                    "isMedico",
                    !isEnabledMed ? "true" : "false"
                );
            } catch (e) {
                // saving error
                console.log(e);
            }
        };
        storeData();
    };

    return (
        <SafeAreaView
            style={[
                Platform.OS === "android" ? { marginTop: 40 } : "",
                { flex: 1 },
            ]}
        >
            <StatusBar style="dark" />
            <MyHeader
                //menu
                //onPressMenu={() => navigation.goBack()}
                title={"Perfil"}
                right="more-vertical"
                onRightPress={() =>
                    navigation.navigate("ProfileOptions", {
                        usuario: user,
                        logout: logout,
                    })
                }
            />

            {user ? (
                <View
                    style={{
                        backgroundColor: Colors.white,
                        flex: 1,
                        padding: 10,
                    }}
                >
                    {user.completado ? (
                        ""
                    ) : (
                        <Text style={styles.textCompleteAlert}>
                            Debe completar su perfil
                        </Text>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 7,
                        }}
                    >
                        {user.picture ? (
                            <Image
                                style={styles.logo}
                                source={{ uri: user.picture }}
                            />
                        ) : (
                            <View
                                style={[
                                    styles.logo,
                                    {
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 1,
                                        borderColor: "lightgrey",
                                        shadowColor: "#171717",
                                        shadowOffset: { width: -2, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 3,
                                    },
                                ]}
                            >
                                {(user.cliente == false ||
                                    user.medico == true) && (
                                    <FontAwesome
                                        name="user-md"
                                        size={48}
                                        color="black"
                                    />
                                )}

                                {(user.cliente == true ||
                                    user.medico == false) && (
                                    <FontAwesome
                                        name="user"
                                        size={48}
                                        color="black"
                                    />
                                )}
                            </View>
                        )}

                        <TouchableOpacity style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: "Quicksand-Medium" }}>
                                10
                            </Text>
                            <Text style={{ fontFamily: "Quicksand-Medium" }}>
                                Calificaciones
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: "Quicksand-Medium" }}>
                                10
                            </Text>
                            <Text style={{ fontFamily: "Quicksand-Medium" }}>
                                Seguidos
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: "Quicksand-Medium" }}>
                                10
                            </Text>
                            <Text style={{ fontFamily: "Quicksand-Medium" }}>
                                Siguiendo
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.textProfile}>
                            {user?.name ? user?.name : user?.nameUser}
                        </Text>
                        <Text style={styles.textProfile}>{user.email}</Text>
                    </View>

                    <View
                        style={{
                            borderColor: "#DCDCDC",
                            borderWidth: 1,
                            marginVertical: 5,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={[styles.text, { marginRight: 5 }]}>
                            Tipo usuario: {user.cliente ? "Paciente" : ""}{" "}
                            {user.medico ? "Médico" : ""}
                        </Text>
                        {user.medico && (
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: "#96FF81",
                                }}
                                thumbColor={
                                    isEnabledMed ? "#4BF54E" : "#f4f3f4"
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchMedico}
                                value={isEnabledMed}
                            />
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("ProfileData", {
                                usuario: user,
                                logout: logout,
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Editar perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonCompra}
                        onPress={() =>
                            navigation.navigate("MisCompras", {
                                usuario: user,
                            })
                        }
                    >
                        <Image
                            source={icons.compra}
                            style={{ width: 40, height: 40 }}
                        />
                        <Text style={styles.buttonText2}>Mis Compras</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonConfig}
                        onPress={() =>
                            navigation.navigate("ProfileData", {
                                usuario: user,
                                logout: logout,
                            })
                        }
                    >
                        <Image
                            source={icons.config}
                            style={{ width: 40, height: 40 }}
                        />
                        <Text style={styles.buttonText}>Configuración</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <></>
            )}
        </SafeAreaView>
    );
};

export default Perfil;

const styles = StyleSheet.create({
    textCompleteAlert: {
        fontSize: 17,
        marginVertical: 7,
        textAlign: "center",
        color: "red",
        fontFamily: "Quicksand-Bold",
    },
    textTitle: {
        fontSize: 17,
        marginVertical: 7,
        marginLeft: 10,
        fontFamily: "Quicksand-Bold",
    },
    textProfile: {
        fontSize: 17,
        marginVertical: 2,
        fontSize: 14,
        fontFamily: "Quicksand-Medium",
    },
    text: {
        fontSize: 17,
        marginVertical: 7,
        fontFamily: "Quicksand-Medium",
        textAlign: "center",
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    button: {
        marginTop: 8,
        width: "100%",
        height: 30,
        backgroundColor: "rgba(96, 197, 168, 0.8)",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonConfig: {
        marginTop: 15,
        width: "100%",
        height: 40,
        backgroundColor: "rgba(96, 197, 168, 1)",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Quicksand-SemiBold",
    },
    buttonCompra: {
        marginTop: 15,
        width: "100%",
        height: 45,
        backgroundColor: Colors.light2,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        elevation: 2,
    },
    buttonText2: {
        //color: Colors.darkGray,
        fontSize: 16,
        fontFamily: "Quicksand-SemiBold",
    },
});
