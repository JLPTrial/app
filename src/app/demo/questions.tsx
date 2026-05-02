import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Question, useQuestions } from '@/db/queries';
import { assetsMap } from '@/constants/assetsMap';
import { Button } from '@react-navigation/elements';

export default function QuestionScreen() {
    const [question, setQuestion] = useState<Question | null>(null);
    const [answer, setAnswer] = useState<number | null>(null);
    const [type, setType] = useState<number>(0);
    const level = "N5";
    const questionsDB = useQuestions(level);
    useEffect(() => { load(); }, [type]);
    const types = [
        'grammar',
        'vocabulary',
        'kanji',
        'reading',
        'listening'
    ]
    async function load() {
        const result = await questionsDB.selectByType(types[type]);
        setAnswer(null);
        setQuestion(result);
    }

    async function save(chosenAlternative: number) {
        if(question === null) return;
        const result = await questionsDB.insertAnswer(question, level, chosenAlternative);
        alert ("Questão salva");
        load();
    }

    async function sendAnswer(chosenAlternative : number){
        setAnswer(chosenAlternative);
    }
    const buttonStyle = (chosenAlternative:number) => {
        if (answer === null || question === null || answer !== chosenAlternative)
            return styles.default;
        return chosenAlternative === question.correctAlternative ? styles.rightAnswer : styles.wrongAnswer;
    };
    if (!question) return null;

    return (
        <View style={styles.container}>
            <Text>Tipo: {types[type]} </Text>
            {(question.image != null) ?
                <Image
                    source={assetsMap[`${question.image}`]}
                    style={styles.questionImage}
                    contentFit="contain"
                /> : null}
            <Text>{question.text}</Text>
            {question.alternatives.map((alternative: string, i: number) => {
                return <Button
                    key={i+1}
                    style={[buttonStyle(i+1)]}
                    onPress={() => { sendAnswer(i+1); }
                    }>{alternative}</Button>;
            })}
            <Button onPress={() => {  if(answer !== null) save(answer+1);}}> Salvar Questão </Button>
            <Button onPress={() => {  load() }}> Nova Questão </Button>
            <Button onPress={() => { setType((type + 1) % types.length); }}> Mudar tipo </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        gap: 20,
    },
    questionImage: {
        width: 180,
        height: 180,
    },
    default: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  } ,
    rightAnswer: {
        backgroundColor: "green",
    },
    wrongAnswer: {
        backgroundColor: "red",
    }
});
