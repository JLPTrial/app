import { vh, vw } from "@/styles/globals";
import { Ionicons } from '@expo/vector-icons';
import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

function Blank(){

    return (
        <View
        style={{
            width: 10*vw,
            marginHorizontal: 4,
        }}
        />
    )
}

function UnderlineBlank(){

    return (
        <View
        style={{
            width: 10*vw,
            borderBottomWidth: 0.15*vh,
            borderBottomColor: "#000",
            marginHorizontal: 4
        }}
        />
    )
}

function StarUnderlineBlank(){

    return (
    <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
        <Ionicons name="star" color="#000"/>
        <UnderlineBlank/>
    </View>
        
    )
}

function Underlined({ children } : PropsWithChildren){
    return (
        <Text 
        style={{
            textDecorationLine: "underline",
        }}>{children}</Text>
    )
}

type FuriganaProps = {
    kanji: string,
    furigana: string
};

function Furigana({kanji, furigana} : FuriganaProps){
    return (
        <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={{fontSize: 7}}>{furigana}</Text>
            <Text>{kanji}</Text>
        </View>
    )
}

export default function parser(statement : string){
    const tokens =
        statement.split(
            /(\s+|\{[^}]+\}|\[(?:blank|underline_blank|star_underline_blank)\]|(?<=\]))/g
        ).filter(Boolean);

    return (
    <View
        style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-end",
        }}
    >
        {tokens.map((token, index) => {
            if (token == "[blank]")
                return <Blank key={index}/>
            if (token == "[underline_blank]")
                return <UnderlineBlank key={index}/>
            if (token == "[star_underline_blank]")
                return <StarUnderlineBlank key={index}/>
            if (token.startsWith("{"))
                return <Underlined>{token.slice(1, -1)}</Underlined>
            if (token.includes("[")){
                const bracketIndex = token.indexOf("[");

                const prefix = token.slice(0, bracketIndex);

                const bracket = token.slice(bracketIndex);

                return <Furigana key={index} kanji={prefix} furigana={bracket.slice(1, -1)}/>
            }

            

            return <Text key={index}>{token}</Text>
            
        })}
    </View>
    )
}