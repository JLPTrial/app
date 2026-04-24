import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Question, useQuestions } from '@/db/queries';
import { assetsMap } from '@/constants/assetsMap';
import { Button } from '@react-navigation/elements';

export default function QuestionScreen() {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [type, setType] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [offset, setOffset] = useState<number>(0);
    const questionsDB = useQuestions("N5");
    useEffect(() => { load(); }, [type]);
    const types = [
        'grammar',
        'vocabulary',
        'kanji',
        'reading',
        'listening'
    ]
    async function load() {
        const results = await questionsDB.selectManyByType(types[type],limit,offset);
        setQuestions(results);
    }

    if (!questions) return null;
    return (
        <View style={styles.container}>
            <Text>Tipo: {types[type]} </Text>

            <Button onPress={() => { load() }}> Buscar mais questões</Button>
            <TextInput
                onChangeText={(limit) => setLimit(Number(limit))}
                value={String(limit)}
                placeholder="limit"
                keyboardType="numeric"
            />
            <TextInput
                onChangeText={(offset) => setOffset(Number(offset))}
                value={String(offset)}
                placeholder="offset"
                keyboardType="numeric"
            />
            <Button onPress={() => { setType((type + 1) % types.length); load() }}> Mudar tipo</Button>

            <FlatList
                data={questions}
                keyExtractor={(question) => String(question.id)}
                renderItem={({ item : question }) => (
                    <View style={styles.flatlistItem}>
                    {question.image != null && (
                    <Image
                        source={assetsMap[`${question.image}`]}
                        style={styles.questionImage}
                        contentFit="contain"
                    />
                    )}
                    <Text>{question.text}</Text>
                    {question.alternatives.alternatives.map((alternative: string, i : number) => (
                        <Text key={i}>{alternative}</Text>
                    ))}
                    </View>
                )}
            />
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
    flatlistItem: {
        backgroundColor: '#c0c0c0',
        margin: 10,
    }
});
