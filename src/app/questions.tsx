import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Question, useQuestions } from '@/db/queries';
import { assetsMap } from '@/constants/assetsMap';
import { Button } from '@react-navigation/elements';

export default function QuestionScreen() {
    const [question, setQuestion] = useState<Question | null>(null);
    const [type, setType] = useState<number>(0);
    const questionsDB = useQuestions("n5");
    useEffect(() => { load(); }, []);
    const types = ['grammar', 'vocabulary', 'kanji', 'reading', 'listening']
    if (!question) return null; 
    async function load() {
        const result = await questionsDB.selectByTypeRandom(types[type]);
        setQuestion(result);
    }

    return (
        <View style={styles.container}>
             <Text>Tipo: {types[type]} </Text>
            {question.media?.imageFilePath && (
            <Image
                source={assetsMap[`${question.media.imageFilePath}`]}
                style={styles.questionImage}
                contentFit="contain"
                />)}
            <Text>{question.questionText}</Text>
            {question.alternatives.alternatives.map((alternative : string, i) => {
                return <Text key={i}>{alternative}</Text>;
            })}
            <Button onPress={() => {load()}}> Nova Questão</Button>
            <Button onPress={() => {setType((type + 1) % 5); load()}}> Mudar tipo</Button>
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
    }
});
