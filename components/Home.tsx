import { View, ScrollView, ImageBackground } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple, IconButton } from "react-native-paper";
import { ContainerStyles, ThemeType } from '../utils/styles';
import { HomeNavProps } from "../utils/types";

export default function Home({ navigation }: HomeNavProps) {
    const theme = useTheme<ThemeType>();
    const back = require('../img/fundo.jpg')

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={back}
                resizeMode="cover"
                style={ContainerStyles.background}
            >
                <ScrollView contentContainerStyle={{ padding: 16, zIndex: 1 }}>
                    {/* Card de notícia */}
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                            <Text variant="titleLarge" style={ContainerStyles.cardTitle}>
                                Lorem Ipsum
                            </Text>
                            <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                Lorem Ipsum
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <IconButton
                                    icon="pencil"
                                    iconColor="#02047eff"
                                    //onPress={{}}
                                />
                                <IconButton
                                    icon="delete"
                                    iconColor="red"
                                    //onPress={{}}
                                />
                            </View>
                        </Card.Content>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions style={{ justifyContent: 'center' }}>
                            <Button
                                mode="outlined"
                                textColor={theme.colors.azulPrincipal}
                                style={{
                                    borderColor: theme.colors.azulPrincipal,
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                }}
                            >
                                Veja Mais
                            </Button>
                        </Card.Actions>
                    </Card>

                    <Button
                        mode="contained"
                        style={ContainerStyles.homeButton}
                        textColor="#fff"
                        labelStyle={{ fontSize: 16 }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        Adicionar Livros
                    </Button>

                    <View style={ContainerStyles.horizontalRule} />
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
