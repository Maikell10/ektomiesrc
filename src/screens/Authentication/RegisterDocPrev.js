import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import COLORS from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { BlurView } from "expo-blur";

import { firebase } from "../../config/firebase-config";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityIndicator from "../../components/ActivityIndicator";

import { useNavigation } from "@react-navigation/native";

function RegisterDocPrev() {
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const handleCreateAccount = async () => {};

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerScroll}>
                {/* <BlurView intensity={90} tint="light"> */}
                <View style={styles.login}>
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <Image
                                source={icons.logoEk}
                                style={styles.profilePicture}
                            />

                            <View
                                style={{
                                    backgroundColor: COLORS.darkGray,
                                    height: 2,
                                    width: "80%",
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            />

                            {/* Persona Natural */}
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "90%",
                                    alignItems: "center",
                                }}
                                onPress={() =>
                                    navigation.navigate("RegisterDoc", {
                                        tipoP: "Natural",
                                    })
                                }
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: "Quicksand-SemiBold",
                                    }}
                                >
                                    Persona Natural
                                </Text>
                                <View style={[styles.button, { width: "45%" }]}>
                                    <Text
                                        style={{
                                            fontFamily: "Quicksand-Medium",
                                        }}
                                    >
                                        Continuar
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textDescription}>
                                Profesional de la salud o personas dedicadas a
                                prestar servicios relacionados de forma
                                independiente.
                            </Text>

                            <View
                                style={{
                                    backgroundColor: COLORS.darkGray,
                                    height: 2,
                                    width: "80%",
                                    marginTop: 10,
                                    marginBottom: 5,
                                }}
                            />

                            {/* Persona Jurídica */}
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "90%",
                                    alignItems: "center",
                                }}
                                onPress={() => {
                                    // navigation.navigate("RegisterDoc", {
                                    //     tipoP: "Juridica",
                                    // });

                                    Alert.alert(
                                        "Atención!",
                                        "Aún no Disponible"
                                    );
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: "Quicksand-SemiBold",
                                    }}
                                >
                                    Persona Jurídica
                                </Text>
                                <View style={[styles.button, { width: "45%" }]}>
                                    <Text
                                        style={{
                                            fontFamily: "Quicksand-Medium",
                                        }}
                                    >
                                        Continuar
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: "100%",
                                }}
                            >
                                <Text style={styles.textDescription}>
                                    Clínica
                                </Text>
                                <Text style={styles.textDescription}>
                                    Grupo Médico
                                </Text>
                                <Text style={styles.textDescription}>
                                    Centro Médico
                                </Text>
                                <Text style={styles.textDescription}>
                                    Unidad Médica / Asistencial
                                </Text>
                                <Text style={styles.textDescription}>
                                    Consultorio
                                </Text>
                                <Text style={styles.textDescription}>
                                    Laboratorio
                                </Text>
                                <Text style={styles.textDescription}>
                                    Proveedor de Servicios Medico-Asistenciales
                                </Text>
                                <Text style={styles.textDescription}>
                                    Local Comercial de Atención al Público
                                </Text>
                            </View>
                        </>
                    )}
                </View>
                {/* </BlurView> */}
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

export default RegisterDocPrev;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    containerScroll: {
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
    button: {
        width: "90%",
        height: 40,
        borderRadius: 20,
        //backgroundColor: COLORS.greeEk,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        borderColor: COLORS.greeEk,
        borderWidth: 3,
    },
    textDescription: {
        marginVertical: 5,
        color: "gray",
        fontFamily: "Quicksand-Medium",
    },
});
