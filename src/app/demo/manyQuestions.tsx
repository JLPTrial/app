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
        const results: Question[] = await questionsDB.selectByTypeMany(types[type], limit);
        setQuestions(results);
    }

    async function getAnswered() {
        const dayToday: Date = new Date();
        const weekAgo: Date = new Date(dayToday.getTime() - 7 * (24 * 60 * 60 * 1000));
        const results: Question[] = await questionsDB.selectAnsweredByDateMany(weekAgo);
        setQuestions(results);
    }

    if (!questions) return null;
    return (
        <View style={styles.container}>
            <Text>Tipo: {types[type]} </Text>

            <Button onPress={() => { load() }}> Buscar mais questões</Button>

             <Button onPress={() => { getAnswered() }}> Buscar questões respondidas</Button>

            <TextInput
                onChangeText={(limit) => setLimit(Number(limit))}
                value={String(limit)}
                placeholder="limit"
                keyboardType="numeric"
                style={styles.input}
            />
            <Button onPress={() => { setType((type + 1) % types.length); load() }}> Mudar tipo</Button>

            <FlatList
                data={questions}
                keyExtractor={(question) => String(question.id)}
                renderItem={({ item: question }) => (
                    <View style={styles.flatlistItem}>
                        {question.image != null && (
                            <Image
                                source={assetsMap[`${question.image}`]}
                                style={styles.questionImage}
                                contentFit="contain"
                            />
                        )}
                        <Text>{question.text}</Text>
                        {question.alternatives.map((alternative: string, i: number) => (
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
    },
    input: {
        height: 40,
        width: 100,
        margin: 12,
        textAlign: 'center',
        borderWidth: 1,
        padding: 10,
    },
});