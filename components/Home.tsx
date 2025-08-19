import { View, ScrollView, ImageBackground } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple } from "react-native-paper";
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
                        </Card.Content>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions style={{ justifyContent: 'center' }}>
                            <Button
                                mode="outlined"
                                textColor={theme.colors.vermelhoPrincipal}
                                style={{
                                    borderColor: theme.colors.vermelhoPrincipal,
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
                        Veja todos os livros
                    </Button>

                    <View style={ContainerStyles.horizontalRule} />

                    {/* Últimos Eventos */}
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={ContainerStyles.Topo}>
                            <Text style={ContainerStyles.Title}>Lorem Ipsum</Text>
                            <Text style={ContainerStyles.subTitle}>
                                "Lorem ipsum dolor sit amet
                            </Text>
                        </View>
                        <TouchableRipple onPress={() => navigation.navigate('Home')} borderless>
                            <Card style={ContainerStyles.cardNews}>
                                <Card.Content>
                                    <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                         consectetur adipiscing elit
                                    </Text>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>

                        <TouchableRipple onPress={() => navigation.navigate('Home')} borderless>
                            <Card style={ContainerStyles.cardNews}>
                                <Card.Content>
                                    <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                         consectetur adipiscing elit
                                    </Text>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>

                        <TouchableRipple onPress={() => navigation.navigate('Home')} borderless>
                            <Card style={ContainerStyles.cardNews}>
                                <Card.Content>
                                    <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                         consectetur adipiscing elit
                                    </Text>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
