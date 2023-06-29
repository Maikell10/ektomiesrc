import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";

const EspecialidadesScreen = ({ route }) => {
    const especialidades = route.params.especialidades;

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FlatList
                style={{ marginTop: 15, width: "90%" }}
                data={especialidades}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            height: 50,
                            backgroundColor: Colors.light,
                            marginBottom: 10,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontFamily: "Quicksand-SemiBold",
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default EspecialidadesScreen;

const styles = StyleSheet.create({});
