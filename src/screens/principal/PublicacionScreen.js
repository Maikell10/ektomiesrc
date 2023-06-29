import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { icons } from "../../constants";

import {
    getFavoritos,
    saveFavoritos,
    updateFavoritos,
    saveCompra,
} from "../../config/services";

const PublicacionScreen = ({ route, navigation }) => {
    const oferta = route.params.item;
    const fav = route.params.fav;

    const [favoritosPub, setFavoritosPub] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async (oferta) => {
        setIsLoading(true);
        const jsonValue = await AsyncStorage.getItem("@currentUser");

        const fav = [{ id_objeto: oferta.key, tipo: "Publicacion" }];

        const favs = await getFavoritos(JSON.parse(jsonValue).uid);

        if (favs.length > 0) {
            const favsF = favs.map((item) => item.favoritos);
            const favsFF = favsF[0].filter(
                (item) => item.id_objeto == oferta.key
            );

            if (favsFF.length > 0) {
                let reg = "";

                const favG = favs[0].favoritos.filter((item) => {
                    if (item.id_objeto !== oferta.key) {
                        return (reg = [...reg, item]);
                    }
                });

                setFavoritosPub(favG);

                await updateFavoritos(favs[0].uid, favG);
            } else {
                favs[0].favoritos.push(fav[0]);
                setFavoritosPub(favs[0].favoritos);
                await updateFavoritos(favs[0].uid, favs[0].favoritos);
            }
        } else {
            setFavoritosPub(fav[0].favoritos);
            await saveFavoritos(JSON.parse(jsonValue).uid, fav);
        }

        setIsLoading(false);
    };

    function renderPrincipal() {
        return (
            <ScrollView style={{ backgroundColor: Colors.white, flex: 1 }}>
                <View style={styles.viewContain}>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.darkGray,
                                fontFamily: "Quicksand-Regular",
                            }}
                        >
                            Creado:{" "}
                            {moment
                                .unix(oferta.created_at.seconds)
                                .utc()
                                .subtract(4, "hours")
                                .format("DD/MM/YYYY HH:mm a")}
                        </Text>
                        <TouchableOpacity
                            style={{
                                zIndex: 10000,
                                shadowColor: Colors.white,
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 2.5,
                                elevation: 4,
                                marginLeft: 30,
                            }}
                            onPress={() => {
                                handleLike(oferta);
                            }}
                        >
                            <Image
                                source={
                                    favoritosPub.filter(
                                        (fav) => fav.id_objeto === oferta.key
                                    ).length > 0
                                        ? icons.love
                                        : icons.favourite
                                }
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor:
                                        favoritosPub.filter(
                                            (fav) =>
                                                fav.id_objeto === oferta.key
                                        ).length > 0
                                            ? "red"
                                            : "black",
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <Image
                        source={{ uri: oferta.image }}
                        style={{
                            width: "100%",
                            height: 250,
                            marginTop: 5,
                            resizeMode: "contain",
                        }}
                    />

                    <Text style={styles.textTitulo}>{oferta.titulo}</Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "90%",
                        }}
                    >
                        <Text
                            style={[
                                styles.textSubtitle,
                                {
                                    alignSelf: "center",
                                    fontFamily: "Quicksand-Medium",
                                },
                            ]}
                        >
                            {oferta.especialidad}
                        </Text>
                        <TouchableOpacity
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

                    <Text
                        style={[
                            styles.textSubtitle,
                            {
                                alignSelf: "flex-end",
                                marginRight: 15,
                                fontFamily: "Quicksand-Medium",
                            },
                        ]}
                    >
                        {oferta.centroS}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignSelf: "flex-end",
                            marginRight: 15,
                        }}
                    >
                        <Text
                            style={[
                                styles.textSubtitle,
                                {
                                    fontFamily: "Quicksand-Medium",
                                },
                            ]}
                        >
                            Valoración{" "}
                        </Text>
                        <Text
                            style={[
                                styles.textSubtitle,
                                {
                                    color: Colors.skyBlue,
                                },
                            ]}
                        >
                            4.6 ⭐⭐⭐⭐⭐
                        </Text>
                    </View>

                    <View
                        style={{
                            width: "95%",
                            borderWidth: 1,
                            borderColor: Colors.light,
                            marginVertical: 10,
                        }}
                    />

                    <Text
                        style={[
                            styles.textSubtitle,
                            {
                                marginLeft: 10,
                                fontFamily: "Quicksand-Medium",
                                marginTop: 5,
                            },
                        ]}
                    >
                        Descripción del servicio
                    </Text>
                    <Text style={styles.textDesc}>{oferta.desc}</Text>

                    <View style={styles.viewPrecio}>
                        <Text style={styles.textSubtitle}>Precio:</Text>
                        <Text style={styles.textPrecio}>{oferta.precio}</Text>
                    </View>
                </View>

                <View style={styles.viewContain}>
                    <Text style={styles.textSubtitle}>
                        Que Incluye la compra de esta Oferta de Servicio:
                    </Text>
                    <Text style={styles.textSubText}>{oferta.incluye}</Text>

                    <Text style={[styles.textSubtitle, { marginTop: 5 }]}>
                        Beneficios:
                    </Text>
                    <Text style={styles.textSubText}>*{oferta.benef1}</Text>
                    <Text style={styles.textSubText}>*{oferta.benef2}</Text>
                    <Text style={styles.textSubText}>*{oferta.benef3}</Text>

                    <Text style={[styles.textSubtitle, { marginTop: 5 }]}>
                        📍Ubicación:
                    </Text>
                    <Text style={styles.textSubText}>{oferta.centroS}</Text>
                    <Text style={styles.textSubText}>{oferta.direccion}</Text>

                    {oferta.adicional && (
                        <>
                            <Text
                                style={[styles.textSubtitle, { marginTop: 5 }]}
                            >
                                ❗Información Adicional:
                            </Text>
                            <Text style={styles.textSubText}>
                                {oferta.adicional}
                            </Text>
                        </>
                    )}
                </View>

                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }

    function renderFooter() {
        return (
            <View
                style={{
                    backgroundColor: Colors.white,
                    height: 50,
                    padding: 8,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.skyBlue,
                        height: 40,
                        width: "90%",
                        padding: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        elevation: 3,
                        marginBottom: 20,
                    }}
                    onPress={() => {
                        Alert.alert(
                            "Comprar",
                            "¿Desea adquirir la oferta?",
                            [
                                {
                                    text: "No",
                                    //onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel",
                                },
                                { text: "Sí", onPress: () => handleComprar() },
                            ],
                            { cancelable: false }
                        );
                    }}
                >
                    <Text
                        style={{
                            color: Colors.white,
                            fontSize: 17,
                            fontFamily: "Quicksand-Bold",
                        }}
                    >
                        Comprar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleComprar = async () => {
        const jsonValue = await AsyncStorage.getItem("@currentUser");

        saveCompra(oferta.key, JSON.parse(jsonValue).uid);

        Alert.alert(
            "Éxito",
            "Compra realizada!",
            [{ text: "Ok", onPress: () => navigation.navigate("Home") }],
            { cancelable: false }
        );
    };

    if (isLoading) {
        return (
            <ActivityIndicator
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                size={60}
            />
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {renderPrincipal()}

            {renderFooter()}
        </View>
    );
};

export default PublicacionScreen;

const styles = StyleSheet.create({
    viewContain: {
        backgroundColor: Colors.light2,
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        marginTop: 10,
        width: "95%",
        borderRadius: 10,
        elevation: 3,
    },
    textTitulo: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: "Quicksand-SemiBold",
        marginLeft: 15,
        alignSelf: "flex-start",
    },
    textSubtitle: {
        alignSelf: "flex-start",
        marginBottom: 5,
        fontFamily: "Quicksand-Bold",
        textTransform: "uppercase",
    },
    textSubText: {
        alignSelf: "flex-start",
        marginHorizontal: 10,
        fontFamily: "Quicksand-Regular",
        marginBottom: 5,
    },
    textDesc: {
        fontFamily: "Quicksand-Light",
        marginTop: 5,
        textAlign: "justify",
        width: "95%",
    },
    viewPrecio: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        backgroundColor: Colors.light,
        padding: 7,
        borderRadius: 10,
        marginTop: 5,
    },
    textPrecio: {
        alignSelf: "flex-start",
        marginBottom: 5,
        fontFamily: "Quicksand-Bold",
        color: Colors.red,
        fontSize: 16,
    },
});
