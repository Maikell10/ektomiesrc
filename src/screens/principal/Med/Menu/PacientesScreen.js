import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import FormInput from "../../../../components/FormInput";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

const PacientesScreen = ({ navigation }) => {
    const [buscar, setBuscar] = useState("");

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

    return (
        <View style={styles.container}>
            {/* Barra Búsqueda */}
            {renderSearch()}

            <View
                style={{
                    borderColor: "#DCDCDC",
                    borderWidth: 1,
                    marginVertical: 5,
                    marginBottom: 15,
                    width: "90%",
                }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: Colors.light2,
                    width: "90%",
                    padding: 8,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.84,
                    elevation: 1,
                }}
                onPress={() =>
                    navigation.navigate("Paciente", { id_paciente: "123456h" })
                }
            >
                <View>
                    <Text
                        style={{
                            fontFamily: "Quicksand-Bold",
                            fontSize: 17,
                        }}
                    >
                        Maria Perdomo
                    </Text>
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: "Quicksand-Regular",
                        }}
                    >
                        C.I. 7.356.597 / Especialidad: Traumatología
                    </Text>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderStyle: "dashed",
                            marginVertical: 5,
                        }}
                    />

                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: "Quicksand-Regular",
                        }}
                    >
                        CITA: 25 de Mayo del 2023 / Hora: 14:30
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: "Quicksand-Regular",
                            }}
                        >
                            Lugar de Consulta:{" "}
                        </Text>
                        <Text style={{ fontFamily: "Quicksand-Bold" }}>
                            CLINICA AVILA
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: "Quicksand-Regular",
                            }}
                        >
                            Status:{" "}
                        </Text>
                        <Text
                            style={{
                                color: "green",
                                fontFamily: "Quicksand-SemiBold",
                            }}
                        >
                            Asistencia Confirmada
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: Colors.light2,
                    width: "90%",
                    padding: 8,
                    borderRadius: 10,
                    marginTop: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.84,
                    elevation: 1,
                }}
            >
                <View>
                    <Text style={{ fontWeight: "800", fontSize: 17 }}>
                        Juan Bautista
                    </Text>
                    <Text style={{ fontSize: 13 }}>
                        C.I. 17.156.597 / Especialidad: Cirugía
                    </Text>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderStyle: "dashed",
                            marginVertical: 5,
                        }}
                    />

                    <Text style={{ fontSize: 13 }}>
                        CITA: 26 de Mayo del 2023 / Hora: 15:30
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 13 }}>
                            Lugar de Consulta:{" "}
                        </Text>
                        <Text style={{ fontWeight: "800" }}>
                            CENTRO M. D. LA TRINIDAD
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 13 }}>Status: </Text>
                        <Text style={{ color: "red", fontWeight: "600" }}>
                            Asistencia sin Confirmar
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PacientesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        //justifyContent: "center",
    },
});
