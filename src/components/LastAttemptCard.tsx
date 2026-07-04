import { useQuestions } from "@/db/queries";
import { useStorage } from "@/hooks/useStorage";
import { ExamAttempt } from "@/types/types";
import { useEffect, useState } from "react";
import { View } from "react-native";
import ResultCard from "./ResultCard";
import { AppText } from "./texts/AppText";


export default function LastAttemptCard(){
    const { data } = useStorage();
    const level = data.jlptLevel;
    const db = useQuestions(level);
    const [lastExam, setLastExam] = useState<ExamAttempt | null>(null);

    useEffect(() => {
        const loadLastExam = async () => {
        const exam = await db.selectLastExam();
        setLastExam(exam);
        };

        loadLastExam();
    }, []);

    if (!lastExam) return <AppText>Nenhum simulado realizado.</AppText>;
    
    const date = new Date(Number(lastExam.started_at)).toLocaleString();

    return (
        <View>
            <AppText>Dados da Última Tentativa:</AppText>
            <ResultCard label={date} right={lastExam.correct_answers} total={lastExam.total_questions}/>
        </View>
    );
}