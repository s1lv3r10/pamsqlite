import { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, Alert } from "react-native";
import { Text, useTheme, Card, Button, TextInput, IconButton, Portal, Modal } from "react-native-paper";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { Conexao, createTable, inserirUsuario, selectUsuario, updateUsuario, deleteUsuario } from "../Conf/Banco";

export default function Start() {
  const theme = useTheme<ThemeType>();
  const back = require("../img/fundo.jpg");

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  // abrir e fechar modal
  const openModal = () => setVisible(true);
  const closeModal = () => {
    setVisible(false);
    setNome("");
    setEmail("");
    setEditId(null);
  };

  // carregar usuários
  const carregarUsuarios = async () => {
    const db = await Conexao();
    if (!db) return;
    await createTable(db);
    const lista = await selectUsuario(db);
    setUsuarios(lista);
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // salvar ou atualizar
  const handleSalvar = async () => {
    if (!nome || !email) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const db = await Conexao();
    if (!db) return;

    if (editId) {
      await updateUsuario(db, editId, nome, email);
      Alert.alert("Sucesso", "Usuário atualizado!");
    } else {
      await inserirUsuario(db, nome, email);
      Alert.alert("Sucesso", "Usuário cadastrado!");
    }

    closeModal();
    carregarUsuarios();
  };

  // editar
  const handleEditar = (usuario: any) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditId(usuario.id);
    openModal();
  };

  // excluir
  const handleExcluir = async (id: number) => {
    const db = await Conexao();
    if (!db) return;
    await deleteUsuario(db, id);
    Alert.alert("Sucesso", "Usuário excluído!");
    carregarUsuarios();
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
            {/* Se não tem usuários, só mostra botão */}
            {usuarios.length === 0 ? (
              <Button
                mode="contained"
                style={ContainerStyles.homeButton}
                textColor="#fff"
                labelStyle={{ fontSize: 16 }}
                onPress={openModal}
              >
                Cadastrar Usuário
              </Button>
            ) : (
              <>
                {/* Lista de Usuários */}
                <View style={{ marginTop: 20 }}>
                  {usuarios.map((usuario) => (
                    <Card
                      key={usuario.id}
                      style={{
                        marginBottom: 10,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            {usuario.nome}
                          </Text>
                          <Text>{usuario.email}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <IconButton
                            icon="pencil"
                            iconColor="#02047eff"
                            onPress={() => handleEditar(usuario)}
                          />
                          <IconButton
                            icon="delete"
                            iconColor="red"
                            onPress={() => handleExcluir(usuario.id)}
                          />
                        </View>
                      </View>
                    </Card>
                  ))}
                </View>

                {/* Botão de adicionar mais */}
                <Button
                  mode="contained"
                  style={ContainerStyles.homeButton}
                  textColor="#fff"
                  labelStyle={{ fontSize: 16 }}
                  onPress={openModal}
                >
                  Novo Usuário
                </Button>
              </>
            )}
          </View>
        </ScrollView>

        {/* Modal para cadastrar/editar */}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={closeModal}
            contentContainerStyle={{
              backgroundColor: "#fff",
              padding: 20,
              margin: 20,
              borderRadius: 10,
            }}
          >
            <Text style={ContainerStyles.cardTitle}>
              {editId ? "Editar Usuário" : "Cadastrar Usuário"}
            </Text>

            <TextInput
              label="Nome"
              mode="outlined"
              style={ContainerStyles.input}
              outlineColor="#02047eff"
              activeOutlineColor="#02047eff"
              value={nome}
              onChangeText={setNome}
            />

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
              textColor="#fff"
              labelStyle={{ fontSize: 16 }}
              onPress={handleSalvar}
            >
              {editId ? "Atualizar" : "Cadastrar"}
            </Button>
          </Modal>
        </Portal>
      </ImageBackground>
    </View>
  );
}
