import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { getProfesion } from "../../../config/services";

import FormInput from "../../../components/FormInput";
import ActivityIndicator from "../../../components/ActivityIndicator";

import { SkeletonContainer, Skeleton } from "@nlazzos/react-native-skeleton";

import { constants, icons } from "../../../constants";
import COLORS from "../../../constants/Colors";

import { store } from "../../../context/redux";
import Colors from "../../../constants/Colors";

import { StatusBar } from "expo-status-bar";

function PrincipalMedScreen({ bgColor }) {
    const pantalla1 = [
        {
            id: 1,
            name: "Mis Consultas en Agenda",
        },
        {
            id: 2,
            name: "Modificar mi Agenda de Consultas",
        },
        {
            id: 3,
            name: "Reporte de Consultas",
        },
        {
            id: 4,
            name: "Mis Pacientes",
        },
    ];

    const cupones = [
        {
            id: 1,
            name: "Publicar NUEVA OFERTA (+)",
        },
        {
            id: 2,
            name: "Duplicar OFERTA",
        },
        {
            id: 3,
            name: "Ver mis ofertas de servicio",
        },
    ];

    const promociones = [
        {
            id: 1,
            name: "Aumenta la exposición de tus OFERTAS de Servicio",
        },
        {
            id: 2,
            name: "Gana un lugar privilegiado en nuestra App",
        },
        {
            id: 3,
            name: "Invita a un amigo y sube de nivel",
        },
    ];

    const [user, setUser] = useState("");

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [buscar, setBuscar] = useState("");

    const [profesion, setProfesion] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         setUser(store.getState().user.payload);
    //         setLoading(true);
    //         getDataFirebase(store.getState().user.payload);
    //     }, [])
    // );

    useEffect(() => {
        setUser(store.getState().user.payload);
        setLoading(true);
        getDataFirebase(store.getState().user.payload);
    }, []);

    const getDataFirebase = async (user) => {
        const profesionFire = await getProfesion(user.id_profesion);
        setProfesion(profesionFire);
        setEspecialidades(user.especialidades);

        setLoading(false);
    };

    if (loading || profesion === "") {
        return <ActivityIndicator />;
    }

    function renderRamasEspecialidades() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    width: "90%",
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: Colors.light2,
                    borderRadius: 5,
                    height: 70,
                    paddingHorizontal: 10,
                }}
                onPress={() =>
                    navigation.navigate("Especialidades", { especialidades })
                }
            >
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontSize: 23,
                                fontFamily: "Quicksand-SemiBold",
                            }}
                        >
                            {user.nameUser}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontSize: 20,
                                fontFamily: "Quicksand-SemiBold",
                                color: Colors.darkGray,
                            }}
                        >
                            {profesion?.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    function renderPantalla1() {
        return (
            <FlatList
                data={pantalla1}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: COLORS.white,
                            marginBottom: 7,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                        }}
                        onPress={() => {
                            if (item.name === "Mis Pacientes") {
                                navigation.navigate("Mis Pacientes");
                            }
                        }}
                    >
                        <Text style={styles.textMenu}>{item.name}</Text>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }

    function renderCupones() {
        return (
            <FlatList
                data={cupones}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: COLORS.white,
                            marginBottom: 7,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                        }}
                        onPress={() => {
                            if (item.name === "Publicar NUEVA OFERTA (+)") {
                                navigation.navigate("Nueva Oferta (+)");
                            }
                            if (item.name === "Ver mis ofertas de servicio") {
                                navigation.navigate("Mis Ofertas de Servicio");
                            }
                            if (item.name === "Duplicar OFERTA") {
                                navigation.navigate(
                                    "Duplicar Ofertas de Servicio"
                                );
                            }
                        }}
                    >
                        <Text style={styles.textMenu}>{item.name}</Text>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }

    function renderButtons() {
        return (
            <FlatList
                style={{ width: "90%", marginTop: 10 }}
                showsVerticalScrollIndicator={false}
                data={promociones}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                    <>
                        {renderPantalla1()}

                        <Text
                            style={{
                                fontFamily: "Quicksand-Medium",
                                fontSize: 20,
                                marginVertical: 7,
                                marginLeft: 8,
                            }}
                        >
                            Gestiona tus {"\n"}Ofertas de Servicio
                        </Text>

                        {renderCupones()}

                        <Text
                            style={{
                                fontFamily: "Quicksand-SemiBold",
                                fontSize: 20,
                                marginVertical: 7,
                                marginLeft: 8,
                            }}
                        >
                            Promociónate {"\n"}al MÁXIMO
                        </Text>
                    </>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: COLORS.white,
                            marginBottom: 7,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Text style={styles.textMenu} numberOfLines={2}>
                            {item.name}
                        </Text>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                    <View style={{ height: 450 }}>
                        <View
                            style={{
                                borderColor: "#DCDCDC",
                                borderWidth: 1,
                                marginVertical: 5,
                            }}
                        />

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                height: 40,
                                alignItems: "center",
                                backgroundColor: COLORS.white,
                                marginBottom: 7,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                marginTop: 10,
                            }}
                        >
                            <Text style={styles.textMenu}>
                                Visitar el centro de ayuda
                            </Text>
                            <Image
                                source={icons.adelante}
                                style={{ width: 15, height: 15 }}
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                marginTop: 20,
                                flexDirection: "row",
                                justifyContent: "space-around",
                            }}
                        >
                            <TouchableOpacity>
                                <Text style={styles.textBottom}>
                                    Términos y Condiciones
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textBottom}>
                                    Política de Privacidad
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={{
                                marginBottom: 40,
                                marginTop: 5,
                                fontSize: 13,
                                textAlign: "center",
                            }}
                        >
                            Versión 1.2.15
                        </Text>
                    </View>
                )}
            />
        );
    }

    function renderLoading() {
        return (
            <View>
                <SkeletonContainer>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 16,
                            justifyContent: "center",
                        }}
                    >
                        <Skeleton
                            style={{
                                height: 60,
                                width: "30%",
                                borderRadius: 15,
                            }}
                        />
                        <View style={{ marginLeft: 16, width: "60%" }}>
                            <Skeleton
                                style={{
                                    width: "100%",
                                    height: 30,
                                    borderRadius: 7,
                                    marginBottom: 5,
                                }}
                            />
                            <Skeleton
                                style={{
                                    width: "100%",
                                    height: 30,
                                    borderRadius: 7,
                                }}
                            />
                        </View>
                    </View>
                </SkeletonContainer>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Ramas de Especialidad */}
            {renderRamasEspecialidades()}

            <View
                style={{
                    borderColor: "#DCDCDC",
                    borderWidth: 0.5,
                    marginVertical: 5,
                    width: "90%",
                }}
            />

            {renderButtons()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        alignItems: "center",
    },
    textMenu: {
        marginVertical: 5,
        fontSize: 17,
        width: "90%",
        fontFamily: "Quicksand-Light",
    },
    textBottom: {
        fontSize: 12,
        textDecorationLine: "underline",
        fontFamily: "Quicksand-Regular",
    },
});

export default PrincipalMedScreen;
