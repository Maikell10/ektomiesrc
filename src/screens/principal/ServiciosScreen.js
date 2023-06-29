import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import COLORS from "../../constants/Colors";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../context/redux";

const ServiciosScreen = ({ navigation }) => {
    const [subPathologies, setSubPathologies] = useState([]);
    const [loading, setLoading] = useState(false);

    const item = navigation.getState().routes[7].params.item;
    //console.log(item);

    const getSubPathologies = async () => {
        const colRef = collection(db, "sub_pathology_ek");
        const result = await getDocs(colRef);

        let subPathologies = [];
        result.forEach((doc, index) => {
            subPathologies[index] = { id: doc.id, ...doc.data() };
        });

        //console.log('SUB PATHOLOGY: ' + subPathologies[0].name)

        setSubPathologies(subPathologies);
        setLoading(false);
    };

    useEffect(() => {
        getSubPathologies();
    }, []);

    const servicios = [
        {
            id: 1,
            name: "Consultas / Revisiones",
            price: "Gratis",
        },
        {
            id: 2,
            name: "Lectura Diagnósticos",
            price: "$10.00",
        },
        {
            id: 3,
            name: "Tratamientos",
            price: "$20.00",
        },
        {
            id: 4,
            name: "Operaciones",
            price: "$200.00",
        },
    ];

    function renderServices() {
        return (
            <View style={{ padding: 5 }}>
                <Text
                    style={{
                        fontSize: 17,
                        textAlign: "center",
                        fontWeight: "700",
                        marginBottom: 10,
                    }}
                >
                    Servicios Disponibles
                </Text>

                <FlatList
                    data={servicios}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                height: 70,
                                backgroundColor: "#EAEAEA",
                                justifyContent: "center",
                                marginBottom: 8,
                                borderRadius: 15,
                                paddingHorizontal: 7,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{ fontSize: 16, fontWeight: "600" }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "700",
                                        color: COLORS.green2,
                                    }}
                                >
                                    {item.price}
                                </Text>
                            </View>
                            <Text style={{ color: "gray", fontWeight: "500" }}>
                                Profesionales disponibles: 2
                            </Text>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={() => <View style={{ height: 80 }} />}
                />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <MyHeader
                menu
                onPressMenu={() => navigation.goBack()}
                title={"Ektomie"}
                right="more-vertical"
                onRightPress={() => console.log("right")}
            />

            <ScrollView style={{ paddingHorizontal: 10 }}>
                <View
                    style={{
                        borderWidth: 0.4,
                        borderColor: "lightgrey",
                        marginTop: 5,
                        marginHorizontal: 10,
                    }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                        marginTop: 10,
                    }}
                >
                    {item.ramas.name}
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 15,
                        marginTop: 5,
                        color: "gray",
                        marginBottom: 5,
                    }}
                >
                    {item.nombre_especialidad}
                </Text>

                <View
                    style={{
                        borderWidth: 0.4,
                        borderColor: "lightgrey",
                        marginTop: 5,
                        marginHorizontal: 10,
                    }}
                />

                <Image
                    source={{ uri: item.ramas.image }}
                    style={{
                        width: "100%",
                        height: 150,
                        marginTop: 10,
                        borderRadius: 10,
                    }}
                    resizeMode="cover"
                />

                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "400",
                        textAlign: "justify",
                        marginVertical: 8,
                        paddingHorizontal: 5,
                    }}
                >
                    {item.ramas.long_desc}
                </Text>

                <View
                    style={{
                        borderWidth: 0.4,
                        borderColor: "lightgrey",
                        marginTop: 10,
                        marginHorizontal: 10,
                    }}
                />

                {/* Lista de Servicios */}
                {renderServices()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ServiciosScreen;

const styles = StyleSheet.create({});
