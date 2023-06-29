import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "../../../../constants/Colors";
import { icons } from "../../../../constants";

const InfoDuplicarScreen = () => {
    return (
        <View
            style={{
                backgroundColor: Colors.light,
                flex: 1,
            }}
        >
            <View style={{ alignItems: "center" }}>
                <Image
                    source={icons.comentario}
                    style={{ width: 600, height: 400, marginTop: -50 }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        position: "absolute",
                        marginTop: 100,
                        width: 230,
                    }}
                >
                    <Image
                        source={icons.copiar}
                        style={{ width: 35, height: 35, marginRight: 10 }}
                    />
                    <Text
                        numberOfLines={3}
                        style={{
                            fontFamily: "Quicksand-SemiBold",
                            fontSize: 17,
                        }}
                    >
                        Con que finalidad se {"\n"}utiliza la opción de {"\n"}
                        DUPLICAR una Oferta {"\n"}de Servicio
                    </Text>
                </View>

                <Text
                    style={{
                        width: "80%",
                        textAlign: "left",
                        fontFamily: "Quicksand-Regular",
                        fontSize: 14.5,
                    }}
                >
                    Ahorra tiempo DUPLICANDO una Oferta de Servicio existente
                    para crear y publicar una nueva Oferta de Servicio (+) con
                    características similares. {"\n"}
                    {"\n"}Ejemplo. Los lunes y martes ofreces prestar un
                    servicio de Consulta Médica en un Centro de Salud ubicado en
                    Altamira en horas de la mañana y ese mismo servicio lo
                    quieres ofrecer los jueves y viernes en horas de la tarde en
                    un lugar distinto. Entonces duplicas la Oferta de Servicio
                    que ya contiene la información y sólo cambias la dirección,
                    horario, precio e imágen. Es todo. También tienes la opción
                    de modificar cualquier campo.
                </Text>
            </View>
        </View>
    );
};

export default InfoDuplicarScreen;

const styles = StyleSheet.create({});
