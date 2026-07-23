import Loading from '@/app/loading';
import ExamLobbyHeader from '@/components/ExamLobbyHeader';
import LastAttemptCard from '@/components/LastAttemptCard';
import BottomButton from '@/components/pressable/BottomButton';
import TimerToggle from '@/components/pressable/TimerToggle';
import Screen from '@/components/Screen';
import { questionsDistribution } from '@/constants/questionsDistribution';
import { statements } from '@/constants/statements';
import { useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import { Question } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

export default function ExamLobby() {
  const { data, setValue } = useStorage();
  const db = useQuestions(data.jlptLevel);
  const { label } = useLocalSearchParams<{ label: string }>();

  const [starting, setStarting] = useState(false);

  const startSession = async () => {
    setStarting(true);

    const distribution = questionsDistribution.find(
      d => d.level === data.jlptLevel
    );

    if (!distribution) return;

    const questions: Question[] = [];

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const amount = distribution.distribution[i];

      const currentQuestions = await db.searchQuestionsByStatement(
        statement.statement_text,
        "all",
        amount,
      );

      questions.push(...currentQuestions);
    }

    questions.sort((a, b) => a.type.localeCompare(b.type));

    if (questions.length === 0) {
      let feedback = "Você já respondeu todas as questões desse tipo!";

      Alert.alert(
        "Nenhuma questão encontrada",
        feedback,
        [{ text: 'Voltar', style: 'cancel' }]
      );

      setStarting(false);
      return;
    }

    setValue('questionsSession', questions);
    setValue('questionIndexSession', 0);
    router.replace({ pathname: '/session-handler', params: { label } });
  };

  if (starting) {
    return <Loading />;
  }

  return (
    <Screen >
      <ExamLobbyHeader/>

      <LastAttemptCard/>

      <View style={{alignSelf: 'flex-start'}}>
        <TimerToggle/>
      </View>

      <BottomButton
        text="Iniciar Simulado"
        onPress={startSession}
      />
    </Screen>
  );
}