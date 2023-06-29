import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import FormInput from "../../components/FormInput";
import Colors from "../../constants/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    getFavoritos,
    getPublicacion,
    saveFavoritos,
    updateFavoritos,
} from "../../config/services";
import { ActivityIndicator } from "react-native";
import { icons } from "../../constants";

function GuardadoScreen({ bgColor }) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [buscar, setBuscar] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [ofertas, setOfertas] = useState("");

    const [favoritosPub, setFavoritosPub] = useState([]);

    useEffect(() => {
        getFireData();
    }, [isFocused]);

    const getFireData = async () => {
        setIsLoading(true);
        const jsonValue = await AsyncStorage.getItem("@currentUser");
        const favs = await getFavoritos(JSON.parse(jsonValue).uid);

        let ofs = [];
        for (let i = 0; i < favs[0].favoritos.length; i++) {
            const pub = await getPublicacion(favs[0].favoritos[i].id_objeto);
            ofs.push(pub);
        }
        setOfertas(ofs);

        setFavoritosPub(favs[0].favoritos);

        setIsLoading(false);
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

    function renderSearch() {
        return (
            <FormInput
                placeholder={"Búsqueda"}
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

    function renderFavoritos() {
        return (
            <FlatList
                data={ofertas}
                style={{ marginTop: 15 }}
                keyExtractor={(item) => item.key}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.light2,
                            padding: 5,
                            width: "45%",
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
                            marginLeft: "3%",
                        }}
                        onPress={() =>
                            navigation.navigate("PublicacionScreen", {
                                item: item,
                            })
                        }
                    >
                        <Image
                            source={{ uri: item.image }}
                            resizeMode="contain"
                            style={{
                                width: "100%",
                                height: 150,
                                borderRadius: 10,
                            }}
                        />
                        <Text style={styles.titleText}>{item.titulo}</Text>

                        <Text style={styles.textEsp}>
                            Especialidad: {item.especialidad}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
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
                                        tintColor: "red",
                                    }}
                                />
                            </TouchableOpacity>

                            <Text
                                style={{
                                    color: Colors.red,
                                }}
                            >
                                Ver Oferta
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

    return (
        <View style={styles.container}>
            {/* Barra Búsqueda */}
            {/* {renderSearch()} */}

            {/* Lista de Guardados */}
            {renderFavoritos()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        //alignItems: "center",
        justifyContent: "space-between",
    },
    titleText: {
        marginTop: 10,
        fontFamily: "Quicksand-Medium",
        fontSize: 14,
        marginBottom: 5,
    },
    titleImg: {
        width: 40,
        height: 40,
        marginTop: 10,
    },
    textEsp: {
        fontFamily: "Quicksand-Regular",
        fontSize: 13,
        marginBottom: 5,
    },
});

export default GuardadoScreen;
