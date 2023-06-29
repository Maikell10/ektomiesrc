import {
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Pressable,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "../../constants/Colors";
import { icons } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";
import EspecialidadSelect from "../../components/EspecialidadSelect";

const Especialidades = ({ modalVisible, setModalVisible, especialidadesM }) => {
    const [profesion, setProfesion] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        if (especialidadesM === undefined || especialidadesM.length <= 0) {
            console.log("no hay profesión seleccionada");
        } else {
            setProfesion(especialidadesM);

            const especialidadesF = especialidadesM?.especialidad?.map(
                (item) => {
                    let reg = item;
                    reg = {
                        ["selected"]: false,
                        ...item,
                    };
                    return reg;
                }
            );
            setEspecialidades(especialidadesF);
        }
    }, [modalVisible]);

    if (especialidadesM === undefined) {
        AsyncStorage.removeItem("especialidades");
        return <Text>Esta profesión no tiene especialidad</Text>;
    }

    function renderEspecialidades() {
        return (
            <FlatList
                style={{
                    width: "90%",
                    marginTop: 10,
                    marginLeft: 20,
                }}
                data={profesion.especialidad}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <EspecialidadSelect
                        name={item.name}
                        value={especialidades[index].selected}
                        onValueChange={() => {
                            especialidades[index].selected =
                                !especialidades[index].selected;
                            setChecked(!isChecked);
                        }}
                    />
                )}
            />
        );
    }

    const handleGuardar = async () => {
        let espSend = especialidades.filter((item) => item.selected);

        await AsyncStorage.setItem("especialidades", JSON.stringify(espSend));
        setModalVisible(!modalVisible);
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={async () => {
                await AsyncStorage.removeItem("especialidades");
                setModalVisible(!modalVisible);
            }}
        >
            {/* Header */}
            <View
                style={{
                    alignItems: "center",
                    marginTop: 55,
                    marginBottom: 10,
                }}
            >
                <Pressable
                    style={{ alignSelf: "flex-end", position: "absolute" }}
                    onPress={async () => {
                        await AsyncStorage.removeItem("especialidades");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Image
                        source={icons.cancel}
                        style={{ width: 40, height: 40, marginRight: 5 }}
                    />
                </Pressable>
                <Image
                    source={icons.logoEk}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 25,
                        marginTop: 20,
                    }}
                />
                <Text style={{ fontSize: 18, fontFamily: "Quicksand-Bold" }}>
                    ¡Ya casi trabajas con nosotros!
                </Text>
            </View>

            <View
                style={{
                    borderWidth: 0.7,
                    borderColor: "lightgrey",
                    marginVertical: 5,
                    width: "90%",
                    alignSelf: "center",
                }}
            />

            <View
                style={{
                    marginVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ fontFamily: "Quicksand-Regular" }}>
                    Tu profesión seleccionada es:
                </Text>
                <Text style={{ fontSize: 20, fontFamily: "Quicksand-Bold" }}>
                    {profesion.name}
                </Text>
            </View>

            <View
                style={{
                    borderWidth: 0.7,
                    borderColor: "lightgrey",
                    marginVertical: 5,
                    width: "90%",
                    alignSelf: "center",
                }}
            />

            <Text
                style={{
                    width: "90%",
                    textAlign: "center",
                    marginLeft: 20,
                    fontSize: 15,
                    color: Colors.darkGray,
                    fontFamily: "Quicksand-SemiBold",
                }}
                numberOfLines={2}
            >
                Seleccione una o más de las siguientes Opciones
            </Text>

            {renderEspecialidades()}

            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleGuardar()}
                >
                    <Text style={styles.textSaveButton}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default Especialidades;

const styles = StyleSheet.create({
    saveButton: {
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: Colors.greeEk,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        borderRadius: 15,
    },
    textSaveButton: {
        color: "white",
        fontSize: 17,
        fontFamily: "Quicksand-Bold",
    },
});
