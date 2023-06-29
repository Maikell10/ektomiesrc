import { StatusBar } from "expo-status-bar";
import { SIZES, icons } from "../../constants";
import COLORS from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import ActivityIndicator from "../../components/ActivityIndicator";

import "expo-dev-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const logoEk = require("../../../assets/icons/logo_ek2.png");
const fondoPreview = require("../../../assets/icons/fondo_preview.png");

import { store, setUser } from "../../context/redux";

function PreviewScreen() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignIn = () => {
        console.log("aca");
    };

    useEffect(() => {
        setLoading(true);
        const getPersistedAuth = async () => {
            const jsonValue = await AsyncStorage.getItem("@auth");
            //console.log("jsonValue", JSON.stringify(jsonValue));
            if (jsonValue != null) {
                setLoading(false);
                const authFromJson = JSON.parse(jsonValue);
                setAuthGoogle(authFromJson);
                navigation.replace("Home");
            } else {
                setLoading(false);
                await AsyncStorage.clear();
                store.dispatch(setUser(null));
            }
        };
        getPersistedAuth();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contenContainer}>
                {/* <BlurView intensity={90} tint="light"> */}
                <View style={styles.login}>
                    <Image source={logoEk} style={styles.profilePicture} />

                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <Text
                                style={{
                                    fontSize: SIZES.h2,
                                    width: "90%",
                                    marginBottom: 5,
                                    fontFamily: "Quicksand-Medium",
                                }}
                            >
                                Descubre una excelente oportunidad
                            </Text>
                            <Text
                                style={{
                                    fontSize: SIZES.h3,
                                    width: "90%",
                                    color: "gray",
                                    marginBottom: 15,
                                    fontFamily: "Quicksand-Medium",
                                }}
                            >
                                Compra servicios médicos aqui...
                            </Text>

                            <Image
                                source={fondoPreview}
                                style={{
                                    height: 110,
                                    marginBottom: 20,
                                }}
                                resizeMode="contain"
                            />

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Register")}
                                style={styles.buttonRegister}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontFamily: "Quicksand-Bold",
                                        color: "white",
                                    }}
                                >
                                    Registrarme Ahora
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}
                                style={styles.buttonLogin}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: "Quicksand-Bold",
                                    }}
                                >
                                    Ya tengo una cuenta con ektomie
                                </Text>
                            </TouchableOpacity>

                            <View
                                style={{
                                    backgroundColor: COLORS.darkGray,
                                    height: 2,
                                    width: "80%",
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("RegisterDocPrev")
                                }
                                style={styles.buttonRMedico}
                            >
                                <Image
                                    source={icons.doctor}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: "Quicksand-Bold",
                                        color: COLORS.white,
                                    }}
                                >
                                    Ofrecer Servicios de Salud
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                {/* </BlurView> */}
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

export default PreviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    contenContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    login: {
        width: 350,
        height: 600,
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
        alignItems: "center",
        padding: 10,
    },
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 1,
        marginVertical: 10,
        resizeMode: "contain",
    },
    input: {
        width: 250,
        height: 40,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#ffffff90",
        marginBottom: 10,
    },
    buttonRegister: {
        width: "90%",
        height: 45,
        borderRadius: 20,
        backgroundColor: COLORS.greeEk,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        borderColor: "white",
        borderWidth: 1,
    },
    buttonLogin: {
        width: "90%",
        height: 45,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: COLORS.greeEk,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    buttonRMedico: {
        flexDirection: "row",
        width: "90%",
        height: 45,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: COLORS.darkGray,
    },
});
