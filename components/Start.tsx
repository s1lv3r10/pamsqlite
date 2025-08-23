import { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, Alert } from "react-native";
import {
  Text,
  useTheme,
  Card,
  Button,
  TextInput,
  IconButton,
  Portal,
  Modal,
} from "react-native-paper";
import { ContainerStyles, ThemeType } from "../utils/styles";
import {
  Conexao,
  createTable,
  inserirUsuario,
  selectUsuario,
  updateUsuario,
  deleteUsuario,
} from "../Conf/Banco";

export default function Start() {
  const theme = useTheme<ThemeType>();
  const back = require("../img/fundo.jpg");

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

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

  // cadastrar ou atualizar
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
        <View style={{ flex: 1, padding: 16 }}>
          {/* Botão para cadastrar se não tiver usuário */}
          {usuarios.length === 0 && (
            <Button
              mode="contained"
              style={{ borderRadius: 8, paddingVertical: 6 }}
              textColor="#fff"
              onPress={openModal}
            >
              Cadastrar Usuário
            </Button>
          )}

          {/* Lista de Usuários */}
          <ScrollView style={{ marginTop: 16 }}>
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
                      iconColor={theme.colors.primary}
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
          </ScrollView>

          {/* Modal de Cadastro/Edição */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={closeModal}
              contentContainerStyle={{
                margin: 20,
                borderRadius: 16,
                backgroundColor: "#fff",
                padding: 20,
              }}
            >
              <Card style={{ borderRadius: 16 }}>
                <Card.Title
                  title={editId ? "Editar Usuário" : "Cadastrar Usuário"}
                  titleStyle={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: theme.colors.primary,
                  }}
                />
                <Card.Content>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={ContainerStyles.cardTitle2}>Nome</Text>
                    <TextInput
                      label="Nome"
                      mode="outlined"
                      style={ContainerStyles.input}
                      outlineColor={theme.colors.primary}
                      activeOutlineColor={theme.colors.primary}
                      value={nome}
                      onChangeText={setNome}
                    />
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={ContainerStyles.cardTitle2}>Email</Text>
                    <TextInput
                      label="Email"
                      mode="outlined"
                      style={ContainerStyles.input}
                      outlineColor={theme.colors.primary}
                      activeOutlineColor={theme.colors.primary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                    />
                  </View>

                  <Button
                    mode="contained"
                    style={{ marginTop: 8, borderRadius: 8, paddingVertical: 6 }}
                    textColor="#fff"
                    icon="check"
                    onPress={handleSalvar}
                  >
                    Salvar
                  </Button>
                </Card.Content>
              </Card>
            </Modal>
          </Portal>
        </View>
      </ImageBackground>
    </View>
  );
}