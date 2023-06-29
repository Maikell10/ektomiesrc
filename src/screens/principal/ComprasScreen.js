import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";

import moment from "moment";

import { getCompras, getPublicacion } from "../../config/services";
import { icons } from "../../constants";

const windowW = Dimensions.get("window").width;

const ComprasScreen = ({ navigation, route }) => {
    const user = route.params.usuario;

    const [userUid, setUserUid] = useState("");

    const [compras, setCompras] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        const jsonValue = await AsyncStorage.getItem("@currentUser");
        setUserUid(JSON.parse(jsonValue).uid);

        const compras = await getCompras(JSON.parse(jsonValue).uid);

        let comprasF = [];

        for (let i = 0; i < compras.length; i++) {
            const pub = await getPublicacion(compras[i].id_publicacion);

            let reg = compras[i];
            reg = {
                ["publicacion"]: pub,
                ...compras[i],
            };

            comprasF.push(reg);
        }
        setCompras(comprasF);
        setIsLoading(false);
    };

    function renderCompras() {
        if (compras.length === 0) {
            return (
                <Text
                    style={{
                        fontFamily: "Quicksand-Medium",
                        fontSize: 19,
                        textAlign: "center",
                        marginTop: 30,
                    }}
                >
                    No tiene Compras
                </Text>
            );
        }
        return (
            <FlatList
                data={compras}
                style={{ marginTop: 10 }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            minHeight: 60,
                            alignItems: "center",
                            backgroundColor: Colors.light2,
                            marginBottom: 7,
                            padding: 5,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            marginTop: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 2.84,
                            elevation: 1,
                            width: windowW - 20,
                            marginHorizontal: 10,
                        }}
                        onPress={() =>
                            navigation.navigate("PublicacionScreen", {
                                item: item.publicacion,
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
                                    {item.publicacion.titulo}
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
                                {item.publicacion.centroS}
                            </Text>

                            <View style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        color: Colors.darkGray,
                                        fontFamily: "Quicksand-Medium",
                                        fontSize: 12,
                                    }}
                                >
                                    Comprado:{" "}
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

                            <View style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        fontFamily: "Quicksand-Regular",
                                        fontSize: 12,
                                    }}
                                >
                                    Status:{" "}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Quicksand-Medium",
                                        fontSize: 12,
                                        color: Colors.green2,
                                    }}
                                >
                                    Asistencia Confirmada
                                </Text>
                            </View>
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

    if (isLoading) {
        return (
            <ActivityIndicator
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                size={60}
                color={Colors.greenEkLight}
            />
        );
    }

    return <View style={styles.container}>{renderCompras()}</View>;
};

export default ComprasScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
});
