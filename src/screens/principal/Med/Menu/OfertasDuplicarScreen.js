import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { icons } from "../../../../constants";
import Colors from "../../../../constants/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import {
    getPublicacionesAct,
    getPublicacionesInac,
} from "../../../../config/services";
import { LogBox } from "react-native";

const windowW = Dimensions.get("window").width;

const OfertasDuplicarScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    console.log(Constants.statusBarHeight);

    const [isLoading, setIsLoading] = useState(false);
    const [pubActiva, setPubActiva] = useState([]);
    const [pubInactiva, setPubInactiva] = useState([]);

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
        getFireData();
    }, [isFocused]);

    const getFireData = async () => {
        setIsLoading(true);
        const user = await AsyncStorage.getItem("@currentUser");

        const pubAct = await getPublicacionesAct(JSON.parse(user).uid);
        setPubActiva(pubAct);

        const pubInact = await getPublicacionesInac(JSON.parse(user).uid);
        setPubInactiva(pubInact);

        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: -80,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Quicksand-Medium",
                        fontSize: 20,
                        marginBottom: 10,
                    }}
                >
                    Cargando...
                </Text>
                <ActivityIndicator size={50} color={Colors.greeEk} />
            </View>
        );
    }

    function renderOfertasActivas() {
        return (
            <FlatList
                data={pubActiva}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                style={{ alignSelf: "center" }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.buttonServicio}
                        onPress={() =>
                            navigation.navigate("Duplicar Oferta", {
                                oferta: item,
                            })
                        }
                    >
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={[
                                        styles.textServicio,
                                        { maxWidth: windowW - 120 },
                                    ]}
                                    numberOfLines={3}
                                >
                                    {item.titulo}
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.textServicio,
                                    {
                                        maxWidth: windowW - 120,
                                        fontSize: 12,
                                        color: Colors.darkGray,
                                        fontFamily: "Quicksand-Bold",
                                    },
                                ]}
                                numberOfLines={3}
                            >
                                {item.centroS}
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkGray,
                                    fontFamily: "Quicksand-Regular",
                                    fontSize: 12,
                                }}
                            >
                                {moment
                                    .unix(item.created_at.seconds)
                                    .utc()
                                    .subtract(4, "hours")
                                    .format("DD/MM/YYYY HH:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 17, height: 17 }}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }

    function renderOfertasInactivas() {
        return (
            <FlatList
                data={pubInactiva}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                style={{ alignSelf: "center" }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.buttonServicio}
                        onPress={() =>
                            navigation.navigate("Duplicar Oferta", {
                                oferta: item,
                            })
                        }
                    >
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={[
                                        styles.textServicio,
                                        { maxWidth: windowW - 120 },
                                    ]}
                                    numberOfLines={3}
                                >
                                    {item.titulo}
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.textServicio,
                                    {
                                        maxWidth: windowW - 120,
                                        fontSize: 12,
                                        color: Colors.darkGray,
                                        fontFamily: "Quicksand-Bold",
                                    },
                                ]}
                                numberOfLines={3}
                            >
                                {item.centroS}
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkGray,
                                    fontFamily: "Quicksand-Regular",
                                    fontSize: 12,
                                }}
                            >
                                {moment
                                    .unix(item.created_at.seconds)
                                    .utc()
                                    .subtract(4, "hours")
                                    .format("DD/MM/YYYY HH:mm a")}
                            </Text>
                        </View>

                        <Image
                            source={icons.adelante}
                            style={{ width: 17, height: 17 }}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }

    return (
        <ScrollView
            style={{
                backgroundColor: Colors.light,
                flex: 1,
            }}
            nestedScrollEnabled={true}
            scrollEnabled={true}
        >
            <View
                style={{
                    backgroundColor: Colors.light,
                    flex: 1,
                    marginTop: 15,
                }}
            >
                <StatusBar style="dark" />

                <TouchableOpacity
                    style={[
                        styles.buttonServicio,
                        { justifyContent: "flex-start" },
                    ]}
                    onPress={() => navigation.navigate("infoDuplicar")}
                >
                    <Image
                        source={icons.copiar}
                        style={{ width: 25, height: 25, marginRight: 15 }}
                    />
                    <Text
                        style={[
                            styles.textServicio,
                            { maxWidth: windowW - 120 },
                        ]}
                        numberOfLines={3}
                    >
                        Finalidad de DUPLICAR una Oferta de Servicio
                    </Text>
                </TouchableOpacity>

                <Text
                    style={{
                        fontFamily: "Quicksand-Medium",
                        fontSize: 20,
                        marginVertical: 7,
                        marginLeft: 8,
                    }}
                >
                    Ofertas de Servicio {"\n"}que pueden ser Duplicadas
                </Text>

                {/* Activas */}
                {renderOfertasActivas()}

                {/* Inactivas */}
                {renderOfertasInactivas()}

                {pubActiva.length === 0 && pubInactiva.length === 0 && (
                    <Text style={styles.textTituloN}>
                        No tiene Ofertas de Servicio
                    </Text>
                )}
            </View>
        </ScrollView>
    );
};

export default OfertasDuplicarScreen;

const styles = StyleSheet.create({
    separador: {
        width: "90%",
        borderWidth: 1,
        borderColor: Colors.light,
        marginVertical: 10,
    },
    textTituloN: {
        fontFamily: "Quicksand-Bold",
        fontSize: 22,
        textAlign: "center",
        marginTop: 30,
    },
    textTitulo: {
        fontFamily: "Quicksand-Bold",
        fontSize: 18,
        marginRight: 5,
    },
    buttonServicio: {
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 60,
        alignItems: "center",
        backgroundColor: Colors.light2,
        marginBottom: 7,
        borderRadius: 15,
        paddingHorizontal: 10,
        padding: 5,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.84,
        elevation: 2,
        width: windowW - 20,
        marginHorizontal: 10,
    },
    textServicio: {
        maxWidth: "90%",
        fontFamily: "Quicksand-Medium",
    },
});
