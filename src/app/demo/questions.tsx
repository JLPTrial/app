import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Question, useQuestions } from '@/db/queries';
import { assetsMap } from '@/constants/assetsMap';
import { Button } from '@react-navigation/elements';

export default function QuestionScreen() {
    const [question, setQuestion] = useState<Question | null>(null);
    const [type, setType] = useState<number>(0);
    const questionsDB = useQuestions("N5");
    useEffect(() => { load(); }, []);
    const types = [
        'grammar',
        'vocabulary',
        'kanji',
        'reading',
        'listening'
    ]
    async function load() {
        const result = await questionsDB.selectByType(types[type]);
        setQuestion(result);
    }

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
            {question.alternatives.map((alternative: string, i) => {
                return <Text key={i}>{alternative}</Text>;
            })}
            <Button onPress={() => { load() }}> Nova Questão</Button>
            <Button onPress={() => { setType((type + 1) % types.length); load() }}> Mudar tipo</Button>
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
