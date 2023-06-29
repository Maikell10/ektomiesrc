import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../context/redux";
import { getEspecialidadesHome, getProfesiones } from "../../config/services";

import PathologyCard from "../../components/PathologyCard";
import FormInput from "../../components/FormInput";

import { SkeletonContainer, Skeleton } from "@nlazzos/react-native-skeleton";

import { constants, icons } from "../../constants";
import COLORS from "../../constants/Colors";
import RamaCard from "../../components/RamaCard";

import { StatusBar } from "expo-status-bar";
import Colors from "../../constants/Colors";

import oferta_odont from "../../../assets/images/oferta_odont.jpg";

function PrincipalScreen({ bgColor, user }) {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [buscar, setBuscar] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const [pathologies, setPathologies] = useState([]);

    const [especialidades, setEspecialidades] = useState([]);
    const [ramas, setRamas] = useState([]);

    const [profesiones, setProfesiones] = useState([]);

    const [like, setLike] = useState(false);

    const cuponesTitulo = [
        {
            id: 1,
            name: "Consultas Médicas Tratamientos Controles",
            icon: icons.medicoe,
        },
        {
            id: 2,
            name: "Exámenes Médicos Radiología Laboratorio",
            icon: icons.cardiogram,
        },
        {
            id: 3,
            name: "Cirugías Intervenciones Extracciones",
            icon: icons.surgery,
        },
        {
            id: 4,
            name: "Ridery",
            icon: icons.surgery,
        },
    ];

    const esp = [
        {
            id: 1,
            name: "Oftalmología",
            icon: icons.lentes,
        },
        {
            id: 2,
            name: "Pediatra",
            icon: icons.pediatra,
        },
        {
            id: 3,
            name: "Odontología",
            icon: icons.examination,
        },
        {
            id: 4,
            name: "Traumatología",
            icon: icons.trauma,
        },
    ];

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getPathologies();
            getEspecialidadesFire();
            getFireData();
        }, [])
    );

    const getFireData = async () => {
        const prof = await getProfesiones();
        setProfesiones(prof);
    };

    const getEspecialidadesFire = async () => {
        const especialidades = await getEspecialidadesHome();
        setEspecialidades(especialidades);

        const ramasEsp = especialidades.filter((item) => item.ramas);

        let cont = 0;
        let contador = 0;
        let ramas = [];
        ramasEsp.map((item) => {
            cont = item.ramas.length;

            for (let i = 0; i < cont; i++) {
                ramas[contador] = {
                    ["id_especialidad"]: item.uid,
                    ["nombre_especialidad"]: item.name,
                    ["ramas"]: item.ramas[i],
                };
                contador++;
            }
        });
        setRamas(ramas);
    };

    const getPathologies = async () => {
        const colRef = collection(db, "pathology_ek");
        const result = await getDocs(colRef);

        let pathologies = [];
        result.forEach((doc, index) => {
            pathologies[index] = { id: doc.id, ...doc.data() };
        });

        setPathologies(pathologies);
        setLoading(false);
    };

    function renderSearch() {
        return (
            <FormInput
                placeholder={"Búsqueda"}
                value={buscar}
                containerStyle={{
                    width: "90%",
                    alignSelf: "center",
                }}
                inputStyle={{
                    paddingHorizontal: 5,
                    fontFamily: "Quicksand-Medium",
                }}
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

    function renderCupones() {
        return (
            <FlatList
                data={cuponesTitulo}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.buttonCupones,
                            {
                                marginRight:
                                    cuponesTitulo.length === index + 1 ? 50 : 8,
                                marginLeft: index === 0 ? 25 : 3,
                            },
                        ]}
                        onPress={() =>
                            navigation.navigate("ServiciosProfScreen", {
                                item: item,
                            })
                        }
                    >
                        <View
                            style={{
                                //flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={[styles.textoCupon]} numberOfLines={3}>
                                {item.name}
                            </Text>
                            <Image
                                source={item.icon}
                                style={{
                                    width: 35,
                                    height: 35,
                                    alignSelf: "flex-end",
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }

    function renderProfesionales() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    marginLeft: 25,
                    marginBottom: 90,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        padding: 8,
                        marginTop: 10,
                        marginRight: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 4.65,
                        elevation: 8,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={icons.doctor}
                            style={{ width: 40, height: 40 }}
                        />
                        <Text style={styles.titulo}>Dr Olivos</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Especialidad: </Text>
                        <Text
                            style={[
                                styles.titulo,
                                {
                                    color: COLORS.greeEk,
                                    fontSize: 14,
                                },
                            ]}
                        >
                            Odontólogo
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Chat Gratiuto: </Text>
                        <Image
                            source={icons.check}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Atiende en: </Text>
                        <Text style={[styles.titulo, { fontSize: 15 }]}>
                            Clínica
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Cupones disponibles: </Text>
                        <Text style={[styles.titulo, { fontSize: 15 }]}>0</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        padding: 8,
                        marginTop: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 4.65,

                        elevation: 8,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={icons.doctor}
                            style={{ width: 40, height: 40 }}
                        />
                        <Text style={[styles.titulo]}>Dr Quiroz</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Especialidad: </Text>
                        <Text
                            style={[
                                styles.titulo,
                                {
                                    color: COLORS.greeEk,
                                    fontSize: 15,
                                },
                            ]}
                        >
                            Médico Cirujano
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Chat Gratiuto: </Text>
                        <Image
                            source={icons.cancel}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Atiende en: </Text>
                        <Text style={[styles.titulo, { fontSize: 15 }]}>
                            Laboratorio
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.texto}>Cupones disponibles: </Text>
                        <Text style={[styles.titulo, { fontSize: 15 }]}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    function renderEspecialidadesMed() {
        return (
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={esp}
                keyExtractor={(item) => item.id}
                style={{
                    marginBottom: 5,
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.buttonEspMed,
                            {
                                marginRight: esp.length === index + 1 ? 50 : 8,
                                marginLeft: index === 0 ? 25 : 3,
                            },
                        ]}
                        onPress={() =>
                            navigation.navigate("EspecialidadesCScreen", {
                                item: item,
                            })
                        }
                    >
                        <Image
                            source={item.icon}
                            style={{ height: 30, width: 30 }}
                        />
                        <Text style={styles.texto}>{item.name} </Text>
                    </TouchableOpacity>
                )}
            />
        );
    }

    function rederPromociones() {
        return (
            <TouchableOpacity style={styles.buttonPromocionEsp}>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        zIndex: 10000,
                        marginTop: 5,
                        marginLeft: 5,
                    }}
                    onPress={() => setLike(!like)}
                >
                    <Image
                        source={like ? icons.love : icons.favourite}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: "red",
                        }}
                    />
                </TouchableOpacity>
                <Image
                    source={oferta_odont}
                    style={{ width: "100%", height: 150 }}
                />
                <View style={{ padding: 8 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            maxWidth: "90%",
                        }}
                    >
                        <Text style={styles.textoCabecera}>
                            Odontología Rehabilitadora y Estética
                        </Text>
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => Alert.alert("Compartir")}
                        >
                            <Image
                                source={icons.share}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textoTitulo}>
                        Armonización OROFACIAL
                    </Text>
                    <Text style={styles.textoButton}>Ver Detalles </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            {/* Barra Búsqueda */}
            {renderSearch()}

            <ScrollView>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.light2,
                        borderRadius: 5,
                        width: "95%",
                        alignSelf: "center",
                        marginTop: 8,
                        padding: 3,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 2.5,
                        elevation: 2,
                    }}
                    onPress={() => {
                        Alert.alert("Publicidad", "Te llevamos con Ridery");
                    }}
                >
                    <Image
                        source={icons.ridery}
                        style={{
                            width: 200,
                            height: 70,
                            resizeMode: "contain",
                            alignItems: "center",
                            alignSelf: "center",
                        }}
                    />
                </TouchableOpacity>

                {/* cupones */}
                {renderCupones()}

                {/* Especialidades Médicas */}
                <Text
                    style={[
                        styles.titulo,
                        {
                            marginTop: 8,
                            alignSelf: "flex-start",
                            marginLeft: 30,
                            fontSize: 17,
                        },
                    ]}
                >
                    Selección de {"\n"}Especialidades
                </Text>
                {renderEspecialidadesMed()}

                {/* Promociones */}
                <View style={{ flexDirection: "row" }}>
                    <Text
                        style={[
                            styles.titulo,
                            {
                                marginTop: 8,
                                alignSelf: "flex-start",
                                marginLeft: 30,
                                fontSize: 17,
                            },
                        ]}
                    >
                        OFERTAS Exclusivas
                    </Text>
                    <Text
                        style={[
                            styles.titulo,
                            {
                                marginTop: 8,
                                alignSelf: "flex-start",
                                marginLeft: 5,
                                fontSize: 17,
                                color: COLORS.red,
                            },
                        ]}
                    >
                        ¡Descúbrelas!
                    </Text>
                </View>
                {rederPromociones()}

                {renderProfesionales()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    titulo: {
        fontFamily: "Quicksand-Medium",
        fontSize: 16,
    },
    textoCupon: {
        fontFamily: "Quicksand-Regular",
        fontSize: 12,
        maxWidth: 120,
        marginRight: 5,
    },
    texto: { fontFamily: "Quicksand-Regular", fontSize: 12 },
    textoCabecera: {
        fontSize: 15,
        fontFamily: "Quicksand-Regular",
        alignSelf: "flex-start",
        color: Colors.darkGray,
    },
    textoTitulo: {
        fontFamily: "Quicksand-Bold",
        alignSelf: "flex-start",
        fontSize: 17,
    },
    textoButton: {
        fontFamily: "Quicksand-SemiBold",
        color: Colors.red,
        alignSelf: "flex-end",
        padding: 5,
    },
    buttonPromocionEsp: {
        backgroundColor: COLORS.white,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        width: "90%",
        alignSelf: "center",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    buttonCupones: {
        maxWidth: 160,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 8,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    buttonEspMed: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 8,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
});

export default PrincipalScreen;
