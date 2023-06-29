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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import FormInput from "../../components/FormInput";
import Colors from "../../constants/Colors";
import { store } from "../../context/redux";

function HistorialScreen({ bgColor }) {
    const [buscar, setBuscar] = useState("");

    const user = store.getState().user?.payload;

    useEffect(() => {
        getFireData();
    }, []);

    const getFireData = async () => {
        //console.log(user);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textTitle}>
                    Hola!{"\n"}
                    {user.nameUser}
                </Text>

                <Image
                    source={{ uri: user.picture }}
                    style={{ width: 70, height: 70, borderRadius: 40 }}
                    resizeMode="contain"
                />

                <View style={styles.separator} />

                <Text style={{ fontFamily: "Quicksand-Regular", fontSize: 15 }}>
                    Primera compra con Ektomie: 30/06/2023
                </Text>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "90%",
                    }}
                >
                    <Text style={styles.textTitle2}>Datos del paciente:</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Apellidos: </Text>
                        <Text style={styles.textDesc}>Pérez Pérez</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Nombres: </Text>
                        <Text style={styles.textDesc}>Juan</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Identificación: </Text>
                        <Text style={styles.textDesc}>V.20.456.896</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <View style={{ flexDirection: "row", marginRight: 30 }}>
                            <Text style={styles.textTitle3}>Edad: </Text>
                            <Text style={styles.textDesc}>35</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textTitle3}>Sexo: </Text>
                            <Text style={styles.textDesc}>M</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>
                            Fecha de Nacimiento:{" "}
                        </Text>
                        <Text style={styles.textDesc}>15/04/1988</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Estado Civil: </Text>
                        <Text style={styles.textDesc}>Soltero</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Nacionalidad: </Text>
                        <Text style={styles.textDesc}>Venezolana</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Dirección: </Text>
                        <Text style={styles.textDesc}>Caracas, Venezuela</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Tipo de Sangre: </Text>
                        <Text style={styles.textDesc}>ORH+</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Usa Lentes: </Text>
                        <Text style={styles.textDesc}>Sí</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Alergias: </Text>
                        <Text style={styles.textDesc}>Ninguna</Text>
                    </View>
                </View>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "90%",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.textTitle2}>ANAMNESIS</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Fecha: </Text>
                        <Text style={styles.textDesc}>30/06/2023</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>
                            Número de Historia:{" "}
                        </Text>
                        <Text style={styles.textDesc}>20265</Text>
                    </View>
                </View>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "90%",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.textTitle2}>
                        Motivo de Consulta / Internación
                    </Text>
                    <Text style={styles.textDesc}>
                        Dolor Abdominal, vómitos, nauseas.
                    </Text>
                </View>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "90%",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.textTitle2}>Enfermedad Actual:</Text>
                    <Text style={styles.textDesc}>
                        Paciente sexo masculino, 35 años de edad, con
                        antecedentes de Hipertensión artetial, desde 2012
                        tratado con Enalapril 10mg/día
                    </Text>
                </View>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "90%",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.textTitle2}>
                        Antecedentes de Enfermedad Actual:
                    </Text>
                    <Text style={styles.textDesc}>
                        Paciente relata que hace 6 meses comenzó una molestia en
                        el abdomen, de tipo cólico, de menor intensidada (4/10),
                        sin irradiación, que duró algunas horas, no se acompañó
                        de vómitos o nauseas. El paciente relata haber tomado
                        antiespasmódicos (Buscapina) que con el cual cedió el
                        dolor.
                    </Text>
                </View>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "90%",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.textTitle2}>
                        Antecedentes Personales:
                    </Text>
                    <Text style={styles.textTitle4}>Hábitos Tóxicos:</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Alcohol: </Text>
                        <Text style={styles.textDesc}>
                            Ocasionalmente toma una copa de vino con las comidas
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Tabaco: </Text>
                        <Text style={styles.textDesc}>No</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Drogas: </Text>
                        <Text style={styles.textDesc}>No</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Infusiones: </Text>
                        <Text style={styles.textDesc}>No</Text>
                    </View>

                    <Text style={styles.textTitle4}>Hábitos Fisiológicos:</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Alimentación: </Text>
                        <Text style={styles.textDesc}>
                            Realiza 3 refecciones durante el día, en las cuales
                            come alimentos sin reestricciones.
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Diuresis: </Text>
                        <Text style={styles.textDesc}>
                            Normal, poco oscura, no despierta por la noche para
                            orinar.
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Catarsis: </Text>
                        <Text style={styles.textDesc}>Normal</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Sueño: </Text>
                        <Text style={styles.textDesc}>Normal</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Sexualidad: </Text>
                        <Text style={styles.textDesc}>casado, un hijo</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textTitle3}>Otros: </Text>
                        <Text style={styles.textDesc}>No</Text>
                    </View>
                </View>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "90%",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.textTitle2}>
                        Enfermedades de la Infancia
                    </Text>
                    <Text style={styles.textTitle3}>Sin antecedentes</Text>
                </View>

                <View style={{ marginBottom: 150 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
    },
    separator: {
        height: 1,
        width: "90%",
        backgroundColor: Colors.gray,
        opacity: 0.3,
        marginVertical: 10,
    },
    textTitle: {
        fontFamily: "Quicksand-Medium",
        fontSize: 18,
        textAlign: "center",
    },
    textTitle2: {
        fontFamily: "Quicksand-SemiBold",
        marginVertical: 5,
        fontSize: 17,
    },
    textTitle3: { fontFamily: "Quicksand-Medium" },
    textTitle4: {
        fontFamily: "Quicksand-Medium",
        marginVertical: 3,
        fontSize: 15,
    },
    textDesc: { fontFamily: "Quicksand-Regular" },
});

export default HistorialScreen;
