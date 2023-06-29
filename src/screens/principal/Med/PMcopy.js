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
            name: "Agregar nueva publicación (+)",
        },
        {
            id: 2,
            name: "Ver mis ofertas de servicio",
        },
        {
            id: 3,
            name: "Aumentar la exposición de mis publicaciones",
        },
    ];

    const promociones = [
        {
            id: 1,
            name: "Aumenta las ventas de tus servicios Médicos",
        },
        {
            id: 2,
            name: "Gana un lugar privilegiado en nuestra APP",
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

    function renderSearch() {
        return (
            <FormInput
                placeholder={"Buscar paciente por nombre, Consultas"}
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
        );
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
                    backgroundColor: Colors.light,
                    borderRadius: 15,
                    height: 50,
                    paddingHorizontal: 10,
                }}
                onPress={() =>
                    navigation.navigate("Especialidades", { especialidades })
                }
            >
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={icons.graduado}
                        style={{ width: 35, height: 35 }}
                    />
                    <View>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontSize: 17,
                                fontFamily: "Quicksand-SemiBold",
                            }}
                        >
                            Ocupación:
                        </Text>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontSize: 14,
                                fontFamily: "Quicksand-Regular",
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
                            height: 60,
                            alignItems: "center",
                            backgroundColor: COLORS.white,
                            marginBottom: 7,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.0,
                            elevation: 2,
                        }}
                        onPress={() => {
                            if (item.name === "Pacientes") {
                                navigation.navigate("Pacientes");
                            }
                        }}
                    >
                        <Text style={styles.textMenu}>{item.name}</Text>
                        <Image
                            source={icons.adelante}
                            style={{ width: 20, height: 20 }}
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
                            height: 60,
                            alignItems: "center",
                            backgroundColor: COLORS.white,
                            marginBottom: 7,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.0,
                            elevation: 2,
                        }}
                        onPress={() => {
                            if (item.name === "Agregar nueva publicación (+)") {
                                navigation.navigate("Nueva Publicación");
                            }
                            if (item.name === "Ver mis ofertas de servicio") {
                                navigation.navigate("Mis Ofertas de Servicio");
                            }
                        }}
                    >
                        <Text style={styles.textMenu}>{item.name}</Text>
                        <Image
                            source={icons.adelante}
                            style={{ width: 20, height: 20 }}
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
                        <View
                            style={{
                                borderColor: "#DCDCDC",
                                borderWidth: 1,
                                marginVertical: 5,
                            }}
                        />

                        <Text
                            style={{
                                fontFamily: "Quicksand-Medium",
                                fontSize: 16,
                                marginVertical: 7,
                            }}
                        >
                            SERVICIOS PROFESIONALES DE SALUD
                        </Text>

                        {renderCupones()}
                        <View
                            style={{
                                borderColor: "#DCDCDC",
                                borderWidth: 1,
                                marginVertical: 5,
                            }}
                        />

                        <Text
                            style={{
                                fontFamily: "Quicksand-SemiBold",
                                fontSize: 16,
                                marginVertical: 7,
                            }}
                        >
                            PROMOCIONES
                        </Text>
                    </>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: 60,
                            alignItems: "center",
                            backgroundColor: COLORS.white,
                            marginBottom: 7,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.0,
                            elevation: 2,
                        }}
                    >
                        <Text style={styles.textMenu}>{item.name}</Text>
                        <Image
                            source={icons.adelante}
                            style={{ width: 20, height: 20 }}
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
                                height: 60,
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
                                style={{ width: 20, height: 20 }}
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
                            Versión 1.0.5
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
            <Text
                style={{
                    marginTop: 10,
                    marginBottom: -10,
                    fontSize: 16,
                    fontFamily: "Quicksand-SemiBold",
                    color: Colors.darkGray,
                }}
            >
                Hola, {user.nameUser}
            </Text>
            {/* Barra Búsqueda */}
            {/* {renderSearch()} */}

            {/* Ramas de Especialidad */}
            {renderRamasEspecialidades()}

            <View
                style={{
                    borderColor: "#DCDCDC",
                    borderWidth: 1,
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
