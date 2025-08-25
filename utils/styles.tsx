import { MD3LightTheme as BaseTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Background } from "@react-navigation/elements";

export const MainTheme = {
    ...BaseTheme,
    colors: {
        ...BaseTheme.colors,
        // cores cps etc
        azulPrincipal: '#02047eff',
        cinzaPrincipal: '#383636',
    }
}

export type ThemeType = typeof MainTheme;

export const ContainerStyles = StyleSheet.create({

    default: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 30,
        gap: 20,
    },
    logoHome: {
        height: 50,
        width: 50
    },
    logo:{
        height: 65,
        width: 65,
        marginLeft: '20%',
        flexDirection: 'row',
        marginTop: 3,
        marginRight: 5
    },
    textLogo:{
        fontSize: 30,
        marginTop: '5%',
        fontWeight: 'bold', 
    },
    homeButton: { //Botão de todos os eventos da Home
        backgroundColor: '#02047eff',
        margin: 10,
        padding: 5,
        borderRadius: 100
    },
    horizontalRule: { //Linha horizontal
        borderBottomColor: '#010b35ff',
        borderBottomWidth: 2,
        marginVertical: 10,
    },
    cardNews: { //Cards de últimos eventos que fica no final da home
        margin: 5,
        backgroundColor: '#fff'
    },
    cardText: { //Texto padrão do card
        textAlign: 'center'
    },
    cardTitle: { //Título padrão do card
        color: '000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5, 
        flexDirection: "row",
    },
    input: {
        backgroundColor: '#fff',
        marginVertical: 8,
        margin: 15,
        marginTop: 2,
    },
    imagemCard: {
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginVertical: 10,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    Modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    CardLogin: {
        margin: 5,
        backgroundColor: '#02047eff',
        marginTop: '50%',
        padding: 5
    },
    NovaConta: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 4, 
        marginLeft:'17%' 
    },
});
