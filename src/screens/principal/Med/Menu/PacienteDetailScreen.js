import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FormInput from "../../../../components/FormInput";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";

const PacienteDetailScreen = ({ navigation, route }) => {
    const [buscar, setBuscar] = useState("");

    const { id_paciente } = route.params;

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

            <View style={{ width: "90%" }}>
                <Text style={{ fontWeight: "800", fontSize: 19 }}>
                    Maria Perdomo
                </Text>
                <Text style={{ fontSize: 15 }}>C.I. 7.356.597</Text>
            </View>

            <View
                style={{
                    borderColor: "#DCDCDC",
                    borderWidth: 1,
                    marginVertical: 10,
                    marginBottom: 15,
                    width: "90%",
                    borderStyle: "dashed",
                }}
            />

            <View style={{ width: "90%" }}>
                <Text style={{ fontWeight: "800", fontSize: 19 }}>CUPON</Text>
                <Text style={{ fontSize: 14 }}>
                    Tipo: Compra de Servicio Médico
                </Text>
                <Text style={{ fontSize: 14 }}>
                    Descripción: Consulta Médica (Presencial)
                </Text>
                <Text style={{ fontSize: 14 }}>
                    Especialidad: Traumatología
                </Text>
                <Text style={{ fontSize: 14 }}>
                    Código de Validación: 089GH45
                </Text>
                <Text style={{ fontSize: 14 }}>Estado: Activo</Text>
            </View>

            <View
                style={{
                    borderColor: "#DCDCDC",
                    borderWidth: 1,
                    marginVertical: 10,
                    marginBottom: 15,
                    width: "90%",
                    borderStyle: "dashed",
                }}
            />

            <View style={{ width: "90%" }}>
                <Text style={{ fontSize: 15 }}>
                    CITA: Viernes 26 de Mayo del 2023 / Hora: 14:30
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 15 }}>Lugar de Consulta: </Text>
                    <Text style={{ fontWeight: "700", fontSize: 15 }}>
                        CLINICA AVILA
                    </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 15 }}>Status: </Text>
                    <Text style={{ color: Colors.greeEk, fontWeight: "700" }}>
                        ASISTENCIA CONFIRMADA
                    </Text>
                </View>
            </View>

            <View
                style={{
                    borderColor: "#DCDCDC",
                    borderWidth: 1,
                    marginVertical: 10,
                    marginBottom: 15,
                    width: "90%",
                }}
            />

            <View style={{ width: "90%" }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Historial Paciente")}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            marginBottom: 10,
                        }}
                    >
                        Historial Clínica Digital
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            marginBottom: 10,
                        }}
                    >
                        Consultas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            marginBottom: 10,
                        }}
                    >
                        Reportar Consulta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PacienteDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        //justifyContent: "center",
    },
});
