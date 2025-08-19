import { useState } from "react";
import { View, ScrollView, ImageBackground, Image, Alert } from "react-native";
import { Text, useTheme, Card, Button, TextInput } from "react-native-paper";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { Conexao, createTable, inserirUsuario } from "../Conf/Banco";

export default function Start() {
  const theme = useTheme<ThemeType>();
  const back = require("../img/fundo.jpg");
  const logo = require("../img/logo.png");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleCadastrar = async () => {
    if (!nome || !email) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const db = await Conexao();
    if (!db) return;

    await createTable(db); // garante que a tabela exista
    await inserirUsuario(db, nome, email);
    Alert.alert("Sucesso", "Livro Cadastrado com Sucesso!");
    setNome("");
    setEmail("");
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={back}
        resizeMode="cover"
        style={ContainerStyles.background}
      >
        <ScrollView>
          <View style={{ flex: 1, padding: 16 }}>
            <Card style={ContainerStyles.CardLogin}>
              <Card.Content style={{ backgroundColor: "#fff", borderRadius: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                  <Image source={logo} style={ContainerStyles.logo} />
                  <Text style={ContainerStyles.textLogo}>Entre Folhas</Text>
                </View>

                <Text style={ContainerStyles.cardTitle2}>Nome de Usuário</Text>
                <TextInput
                  label="Nome de Usuário"
                  mode="outlined"
                  style={ContainerStyles.input}
                  outlineColor="#02047eff"
                  activeOutlineColor="#02047eff"
                  value={nome}
                  onChangeText={setNome}
                />

                <Text style={ContainerStyles.cardTitle2}>Email</Text>
                <TextInput
                  label="Email"
                  mode="outlined"
                  style={ContainerStyles.input}
                  outlineColor="#02047eff"
                  activeOutlineColor="#02047eff"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <Button
                  mode="contained"
                  style={ContainerStyles.homeButton}
                  labelStyle={{ fontSize: 16, color: "#fff" }}
                  onPress={handleCadastrar}
                >
                  Cadastrar
                </Button>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
