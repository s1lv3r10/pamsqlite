import { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, Alert } from "react-native";
import { Text, useTheme, Card, Button, TextInput, IconButton, Portal, Modal } from "react-native-paper";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { Conexao, createTableLivros, inserirLivro, selectLivros, updateLivro, deleteLivro } from "../Conf/Banco";

export default function Home() {
    const theme = useTheme<ThemeType>();
    const back = require("../img/fundo.jpg");
    const [livros, setLivros] = useState<any[]>([]);
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [editora, setEditora] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [visible, setVisible] = useState(false);
    // abrir e fechar modal
    const openModal = () => setVisible(true);
    const closeModal = () => {
        setVisible(false);
        setTitulo("");
        setAutor("");
        setGenero("");
        setEditora("");
        setEditId(null);
    };
    // carregar livros
    const carregarLivros = async () => {
        const db = await Conexao();
        if (!db) return;
        await createTableLivros(db);
        const lista = await selectLivros(db);
        setLivros(lista);
    };
    useEffect(() => {
        carregarLivros();
    }, []);
    // salvar ou atualizar
    const handleSalvar = async () => {
        if (!titulo || !autor || !genero || !editora) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }
        const db = await Conexao();
        if (!db) return;

        if (editId) {
            await updateLivro(db, editId, titulo, autor, genero, editora);
            Alert.alert("Sucesso", "Livro atualizado!");
        } else {
            await inserirLivro(db, titulo, autor, genero, editora);
            Alert.alert("Sucesso", "Livro cadastrado!");
        }

        closeModal();
        carregarLivros();
    };
    // editar
    const handleEditar = (livro: any) => {
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setGenero(livro.genero);
        setEditora(livro.editora);
        setEditId(livro.id);
        openModal();
    };
    // excluir
    const handleExcluir = async (id: number) => {
        const db = await Conexao();
        if (!db) return;
        await deleteLivro(db, id);
        Alert.alert("Sucesso", "Livro excluído!");
        carregarLivros();
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
                        {/* Se não tem livros, só mostra botão */}
                        {livros.length === 0 ? (
                            <Button
                                mode="contained"
                                style={ContainerStyles.homeButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={openModal}
                            >
                                Cadastrar Livro
                            </Button>
                        ) : (
                            <>
                                {/* Lista de Livros */}
                                <View style={{ marginTop: 20 }}>
                                    {livros.map((livro) => (
                                        <Card
                                            key={livro.id}
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
                                                        {livro.titulo}
                                                    </Text>
                                                    <Text>{livro.autor}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <IconButton
                                                        icon="pencil"
                                                        iconColor="#02047eff"
                                                        onPress={() => handleEditar(livro)}
                                                    />
                                                    <IconButton
                                                        icon="delete"
                                                        iconColor="red"
                                                        onPress={() => handleExcluir(livro.id)}
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
                                    Novo Livro
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
                        <ScrollView>
                            <Text style={ContainerStyles.cardTitle}>
                                {editId ? "Editar Livro" : "Cadastrar Livro"}
                            </Text>
                            <TextInput
                                label="Título"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#02047eff"
                                activeOutlineColor="#02047eff"
                                value={titulo}
                                onChangeText={setTitulo}
                            />
                            <TextInput
                                label="Autor"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#02047eff"
                                activeOutlineColor="#02047eff"
                                value={autor}
                                onChangeText={setAutor}
                            />
                            <TextInput
                                label="Gênero"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#02047eff"
                                activeOutlineColor="#02047eff"
                                value={genero}
                                onChangeText={setGenero}
                            />
                            <TextInput
                                label="Editora"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#02047eff"
                                activeOutlineColor="#02047eff"
                                value={editora}
                                onChangeText={setEditora}
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
                        </ScrollView>
                    </Modal>
                </Portal>
            </ImageBackground>
        </View>
    );
}
