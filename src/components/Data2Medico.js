import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { icons } from "../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    updateMedicoData2,
    getUserData,
    getEspecialidad,
} from "../config/services";

import { store } from "../context/redux";

import ActivityIndicator from "../components/ActivityIndicator";
import RamaSelect from "../components/RamaSelect";

const Data2Medico = ({ navigation, basicoR2Medico }) => {
    const [especialidades, setEspecialidades] = useState([]);

    const [userUID, setUserUID] = useState(null);

    const [loading, setLoading] = useState(false);

    const [especialidad, setEspecialidad] = useState("");
    const [ramas, setRamas] = useState([]);

    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        getFirebaseData();
    }, [userUID]);

    const getFirebaseData = async () => {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem("@currentUser");
        setUserUID(JSON.parse(jsonValue).uid);

        if (userUID !== null) {
            const user = await getUserData(userUID);

            const especialidadFire = await getEspecialidad(
                user.id_especialidad
            );
            setEspecialidad(especialidadFire);

            const ramas = especialidadFire.ramas.map((item) => {
                let reg = item;
                reg = {
                    ["selected"]: false,
                    ...item,
                };
                return reg;
            });
            setRamas(ramas);
        }
        setLoading(false);
    };

    function renderRamas() {
        return (
            <FlatList
                style={{
                    width: "90%",
                    marginTop: 10,
                    marginLeft: 20,
                }}
                data={ramas}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <RamaSelect
                        name={item.name}
                        value={ramas[index].selected}
                        onValueChange={() => {
                            ramas[index].selected = !ramas[index].selected;
                            setChecked(!isChecked);
                        }}
                    />
                )}
            />
        );
    }

    function handleSubmitForm() {
        let ramasSend = ramas.filter((item) => item.selected);

        ramasSend = ramasSend.map((item) => {
            let reg = item;
            reg = {
                ["id"]: item.id,
                //["label"]: item.data().region,
                //["value"]: item.data().id,
            };
            return reg;
        });

        if (ramasSend.length === 0) {
            Alert.alert("Debe seleccionar una opción");
        } else {
            updateMedicoData2(userUID, ramasSend);
            Alert.alert(
                "Éxito",
                "Bienvenido a Ektomie, próximamente será contactado por nuestro staff.",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("Login"),
                        style: "cancel",
                    },
                ],
                { cancelable: false }
            );
        }
    }

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView
            style={[
                Platform.OS === "android" ? { marginTop: 40 } : "",
                { flex: 1 },
            ]}
        >
            {/* Header */}
            <View
                style={{
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            >
                <Image
                    source={icons.logoEk}
                    style={{ width: 80, height: 80, borderRadius: 25 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                    ¡Ya casi trabajas con nosotros!
                </Text>
            </View>

            <View
                style={{
                    borderWidth: 0.7,
                    borderColor: "lightgrey",
                    marginVertical: 5,
                }}
            />

            <View
                style={{
                    marginVertical: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Tu especialidad seleccionada es:</Text>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    {especialidad.name}
                </Text>
            </View>

            <View
                style={{
                    borderWidth: 0.7,
                    borderColor: "lightgrey",
                    marginBottom: 10,
                }}
            />

            <Text
                style={{
                    width: "90%",
                    textAlign: "center",
                    marginLeft: 20,
                    fontSize: 15,
                    color: Colors.darkGray,
                    fontWeight: "700",
                }}
                numberOfLines={2}
            >
                Seleccione una o más de las siguientes Opciones
            </Text>
            {renderRamas()}

            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleSubmitForm()}
                >
                    <Text style={styles.textSaveButton}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Data2Medico;

const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        color: "grey",
        width: "90%",
        color: "gray",
        fontSize: 15,
    },
    saveButton: {
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: Colors.skyBlue,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        borderRadius: 15,
    },
    textSaveButton: {
        color: "white",
        fontSize: 17,
        fontWeight: "700",
    },
});
