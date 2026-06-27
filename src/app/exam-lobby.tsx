import Loading from '@/app/loading';
import ExamLobbyHeader from '@/components/ExamLobbyHeader';
import LastAttemptCard from '@/components/LastAttemptCard';
import BottomButton from '@/components/pressable/BottomButton';
import Screen from '@/components/Screen';
import { questionsDistribution } from '@/constants/questionsDistribution';
import { statements } from '@/constants/statements';
import { useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import { Question } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function ExamLobby() {
  const { data, setValue } = useStorage();
  const db = useQuestions(data.jlptLevel);
  const { label } = useLocalSearchParams<{ label: string }>();

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  const [useTimer, setUseTimer] = useState(true);

  const [mockInfo, setMockInfo] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // TODO:
      // Buscar configuração do JLPT atual
      // {
      //   timeLimit: number,
      //   sections: [
      //   { type: 'grammar', amount: 20 },
      //   ...
      //   ]
      // }

      // TODO:
      // Buscar último simulado salvo no banco

      setLoading(false);
    }

    load();
  }, [data.jlptLevel]);

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

      if (currentQuestions.length !== amount) console.log(i + "(" + currentQuestions.length + "/" + amount + ")");

      questions.push(...currentQuestions);
    }

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

  if (loading || starting) {
    return <Loading />;
  }

  return (
    <Screen>
      <ExamLobbyHeader
      />

      <LastAttemptCard
      />

      <BottomButton
        text="Iniciar Simulado"
        onPress={startSession}
      />
    </Screen>
  );
}