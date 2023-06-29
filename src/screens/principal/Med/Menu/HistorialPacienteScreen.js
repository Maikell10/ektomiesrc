import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import FormInput from "../../../../components/FormInput";
import Colors from "../../../../constants/Colors";

const HistorialPacienteScreen = ({ navigation }) => {
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

            <View style={{ width: "90%" }}>
                <Text
                    style={{
                        fontWeight: "800",
                        fontSize: 20,
                        marginBottom: 10,
                    }}
                >
                    Historia Clínica Digital
                </Text>
                <Text style={{ fontWeight: "800", fontSize: 18 }}>
                    Maria Perdomo
                </Text>
                <Text style={{ fontSize: 14 }}>Género: Femenino</Text>
                <Text style={{ fontSize: 14 }}>
                    Fecha de Nacimiento: 23 de Noviembre del 1947
                </Text>
                <Text style={{ fontSize: 14 }}>C.I: 7.356.597</Text>
                <Text style={{ fontSize: 14 }}>Grupo Sanguíneo: ORH+</Text>
                <Text style={{ fontSize: 14 }}>Alérgias: Yodo, Potásio</Text>

                <Text style={{ fontSize: 14 }}>Ocupación u Oficio: Sastre</Text>
                <Text style={{ fontSize: 14 }}>Edad: 43 años</Text>
            </View>

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
                <Text>Información de Contacto (Paciente)</Text>
                <Text>Persona(s) de Contacto en caso de emergencia</Text>
                <Text>Antecedentes Médicos</Text>
                <Text>Información sobre Tratamientos Médicos</Text>
                <Text>Datos, Exámenes y Pruebas Médicas</Text>
                <Text>Anotaciones sobre la evolución del Paciente</Text>
                <Text>Información sobre la salud mental</Text>
            </View>
        </View>
    );
};

export default HistorialPacienteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        //justifyContent: "center",
    },
});
