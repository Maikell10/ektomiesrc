import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { icons } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    getPublicacionesEsp,
    getFavoritos,
    updateFavoritos,
    saveFavoritos,
} from "../../config/services";

const EspecialidadesCScreen = ({ navigation }) => {
    const item = navigation.getState().routes[1]?.params?.item;

    const [publicaciones, setPublicaciones] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [favoritosPub, setFavoritosPub] = useState([]);

    useEffect(() => {
        getPublicacionesFire();
    }, []);

    const getPublicacionesFire = async () => {
        setIsLoading(true);
        if (item?.name !== undefined) {
            const publicaciones = await getPublicacionesEsp(item.name);
            //console.log(publicaciones);

            setPublicaciones(publicaciones);

            const jsonValue = await AsyncStorage.getItem("@currentUser");
            const favs = await getFavoritos(JSON.parse(jsonValue).uid);
            setFavoritosPub(favs[0].favoritos);

            setIsLoading(false);
        } else {
            setPublicaciones([]);
            setIsLoading(false);
        }
    };

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

    function renderServicios() {
        if (publicaciones.length === 0) {
            return (
                <Text
                    style={{
                        fontFamily: "Quicksand-SemiBold",
                        textAlign: "center",
                        marginTop: 30,
                        fontSize: 18,
                    }}
                >
                    No hay ofertas disponibles por los momentos
                </Text>
            );
        }
        return (
            <FlatList
                data={publicaciones}
                style={{ marginTop: 15 }}
                keyExtractor={(item) => item.key}
                //numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.light2,
                            padding: 5,
                            width: "95%",
                            alignSelf: "center",
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 2.5,
                            elevation: 4,
                            marginBottom: 10,
                            //marginLeft: "3%",
                        }}
                        onPress={() =>
                            navigation.navigate("PublicacionScreen", {
                                item: item,
                                fav:
                                    favoritosPub.filter(
                                        (fav) => fav.id_objeto === item.key
                                    ).length > 0
                                        ? true
                                        : false,
                            })
                        }
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: "100%",
                                height: 250,
                                marginTop: 5,
                                //borderRadius: 10,
                                resizeMode: "contain",
                            }}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "90%",
                            }}
                        >
                            <Text style={styles.titleText}>{item.titulo}</Text>
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

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                alignSelf: "center",
                                width: "90%",
                            }}
                        >
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
                                }}
                                onPress={() => {
                                    handleLike(item);
                                }}
                            >
                                <Image
                                    source={
                                        favoritosPub.filter(
                                            (fav) => fav.id_objeto === item.key
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
                                                    fav.id_objeto === item.key
                                            ).length > 0
                                                ? "red"
                                                : "black",
                                    }}
                                />
                            </TouchableOpacity>

                            <Text
                                style={{
                                    color: Colors.red,
                                }}
                            >
                                Ver Detalles
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }

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

    return <View style={styles.container}>{renderServicios()}</View>;
};

export default EspecialidadesCScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        justifyContent: "space-between",
    },
});
