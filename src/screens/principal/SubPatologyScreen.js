import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import SubPathologyCard from "../../components/SubPathologyCard";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../context/redux";

const SubPatologyScreen = ({ navigation }) => {
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

  function renderSubPathology(item) {
    return (
      <SubPathologyCard
        containerStyle={{
          height: 100,
          width: 250,
          marginLeft: 10,
          marginRight: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
        imageStyle={{
          height: 70,
          width: 70,
          marginLeft: 10,
          borderRadius: 12,
        }}
        item={item}
        onPress={() => navigation.navigate("SubPatologyScreen", { item: item })}
      />
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

      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "700" }}>
          {item.name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            marginTop: 5,
            color: "gray",
            marginBottom: 10,
          }}
        >
          {item.descripcion}
        </Text>

        <View
          style={{
            borderWidth: 0.4,
            borderColor: "lightgrey",
            marginTop: 5,
            marginHorizontal: 10,
          }}
        ></View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
            marginVertical: 8,
          }}
        >
          Sub-Patologías
        </Text>
        <Text
          style={{ textAlign: "right", marginHorizontal: 10, color: "grey" }}
        >
          Cant. {subPathologies.length}
        </Text>

        {/* Lista de Patologias */}
        <FlatList
          data={subPathologies}
          horizontal={true}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
              {/* {!loading && renderSubPathology(item)}
              {loading && renderLoading()} */}
              {renderSubPathology(item)}
            </TouchableOpacity>
          )}
        />

        <View
          style={{
            borderWidth: 0.4,
            borderColor: "lightgrey",
            marginTop: 10,
            marginHorizontal: 10,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

export default SubPatologyScreen;

const styles = StyleSheet.create({});
