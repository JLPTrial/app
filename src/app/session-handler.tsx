import ExamEndScreen from '@/components/ExamEndScreen';
import QuestionsSession from '@/components/QuestionsSession';
import { SessionResult } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import EndScreen from '../components/EndScreen';
// Esse arquivo faz a integração entre session-lobby, QuestionsSession e end-screen.

export default function SessionHandler() {
  const { label } = useLocalSearchParams<{ label: string }>();
  const [result, setResult] = useState<SessionResult | null>(null);

  if (result) {
    if (label == 'Simulado') return (<ExamEndScreen result={result}/>)


    return (<EndScreen result={result} />);
  }

  return (
    <QuestionsSession
      sessionType={label}
      onFinish={(res : SessionResult) => setResult(res)}
    />
  );
}

