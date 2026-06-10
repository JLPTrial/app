import QuestionsSession from '@/components/QuestionsSession';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import EndScreen from '../components/EndScreen';

// Esse arquivo faz a integração entre session-lobby, QuestionsSession e end-screen.

type SessionResult = {
  right: number;
  total: number;
};

export default function SessionHandler() {
  const { label } = useLocalSearchParams<{ label: string }>();
  const [result, setResult] = useState<SessionResult | null>(null);

  if (result) {
    return (<EndScreen result={result} />);
  }

  return (
    <QuestionsSession
      sessionType={label}
      onFinish={(right: number, total: number) => setResult({ right, total })}
    />
  );
}

