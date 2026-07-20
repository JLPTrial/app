import Loading from '@/app/loading';
import BottomButton from '@/components/pressable/BottomButton';
import TimerToggle from '@/components/pressable/TimerToggle';
import Screen from '@/components/Screen';
import { AppText } from '@/components/texts/AppText';
import { useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import { useColors } from '@/hooks/useTheme';
import { vh } from '@/styles/globals';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

const QUESTION_COUNTS = [5, 10, 15, 20];

export default function SessionLobby() {
  const { type, label } = useLocalSearchParams<{ type: string; label: string }>();
  const { data, setValue } = useStorage();
  const colors = useColors();
  const db = useQuestions(data.jlptLevel);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxQuestions, setMaxQuestions] = useState(10);
  const [loadingTags, setLoadingTags] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    setLoadingTags(true);
    db.selectTagsByType(type).then(tags => {
      setAvailableTags(tags);
      setLoadingTags(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, data.jlptLevel]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTags(availableTags);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = availableTags.filter(tag =>
        tag.toLowerCase().includes(lowerQuery)
      );
      setFilteredTags(filtered);
    }
  }, [searchQuery, availableTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const startSession = async () => {
    setStarting(true);
    const questions = await db.searchQuestionsFilters(type, selectedTags, 'unanswered', maxQuestions);

    if (questions.length === 0) {
      let feedback = "Você já respondeu todas as questões desse tipo!";
      if (selectedTags.length > 0) {
        feedback = "Você já respondeu todas as questões com essas tags!";
      }

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

  if (loadingTags || starting) return <Loading />;

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant='title'>{label}</AppText>
        <View style={[styles.levelBadge, { backgroundColor: colors.primary }]}>
          <AppText variant='tag'>{data.jlptLevel}</AppText>
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant='subtitle'>Quantidade Máxima de Questões</AppText>
        <View style={styles.chipRow}>
          {QUESTION_COUNTS.map(n => (
            <Pressable
              key={n}
              style={[
                styles.chip,
                { backgroundColor: colors.surface, borderColor: colors.border },
                maxQuestions === n && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
              onPress={() => setMaxQuestions(n)}
            >
              <AppText style={maxQuestions === n && { color: colors.textLight }}>
                {n}
              </AppText>
            </Pressable>
          ))}
        </View>
      </View>

      {
        availableTags.length > 0 && (
          <View style={styles.section}>
            <AppText variant='subtitle'>Tags</AppText>
            <TextInput
              style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.textDark }]}
              placeholder="Pesquisar tag..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {filteredTags.length > 0 && (
              <View>
                <ScrollView nestedScrollEnabled={true} style={[styles.tagsBoxContainer, { borderColor: colors.border, backgroundColor: colors.background }]}>
                  <View style={styles.chipRow}>
                    {filteredTags.map(tag => (
                      <Pressable
                        key={tag}
                        style={[
                          styles.chip,
                          { backgroundColor: colors.surface, borderColor: colors.border },
                          selectedTags.includes(tag) && { backgroundColor: colors.primary, borderColor: colors.primary },
                        ]}
                        onPress={() => toggleTag(tag)}
                      >
                        <AppText style={[selectedTags.includes(tag) && { color: colors.textLight }]}>
                          {tag}
                        </AppText>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        )
      }

      <View style={{alignSelf: 'flex-start'}}>
        <TimerToggle/>
      </View>

      <BottomButton onPress={startSession} text="Iniciar" />
    </Screen >
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'stretch',
  },

  tagsBoxContainer: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 12,
    maxHeight: 55 * vh,
  },

  levelBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  section: {
    alignSelf: 'stretch',
    gap: 12,
  },

  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
});
