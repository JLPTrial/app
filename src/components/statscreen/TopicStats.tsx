import Screen from '@/components/Screen';
import { AppText } from '../texts/AppText';
import { useEffect, useState } from 'react';
import { useQuestions } from '@/db/queries';
import { Dropdown } from 'react-native-element-dropdown';
import AppRadarGraph from '../graphs/AppRadarGraph';
import { useColors } from '@/hooks/useTheme';
import { StyleSheet } from 'react-native';
import { useStorage } from '@/hooks/useStorage';

export default function TopicStats() {
  const { data } = useStorage();
  const level = data.jlptLevel;
  const colors = useColors();

  const [statsTypes, setStatsTypes] = useState<number[] | null>(null);
  const [type, setType] = useState<string>('kanji');
  const [statsTag, setStatsTag] = useState<number[] | null>(null);
  const [labelTag, setLabelTag] = useState<string[] | null>(null);
  const selectorData = [
    {label: 'Kanji', value: 'kanji'},
    {label: 'Audição',value: 'listening'},
    {label: 'Leitura',value: 'reading'},
    {label: 'Vocabulário',value: 'vocabulary'},
    {label: 'Gramática', value :'grammar'}
  ];
  const labelTypes = selectorData.map(type => type.label);

  const db = useQuestions(level);

  useEffect(() => {
    (async () => {
      const data = await db.getTypeStats();
      setStatsTypes(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    (async () => {
      const [tags, stats] = await db.getTagStats(type);
      setStatsTag(stats);
      setLabelTag(tags);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, level]);

  if (!statsTypes || statsTypes.length === 0) return null;
  return (
    <Screen internal>
      <AppText variant='title'>Tópicos do {level}</AppText>
      <AppRadarGraph values={statsTypes} labels={labelTypes} areaColor={colors.primaryLight}/>

      <AppText>Veja as questões resolvidas por tipo</AppText>
      <Dropdown
        style={[styles.selector, {backgroundColor: colors[type as keyof typeof colors], color: colors.textLight }]}
        labelField="label"
        data={selectorData}
        valueField="value"
        value={type}
        selectedTextStyle={[styles.selectorSelected, { color: colors.textLight }]}
        itemTextStyle={styles.selectorItens}
        iconColor={colors.textLight}
        onChange={item => {
          setType(item.value);
        }}
      />

      { (statsTag && labelTag) && <AppRadarGraph values={statsTag} labels={labelTag} areaColor={colors[type as keyof typeof colors]}/>}

    </Screen>
  );
}

const styles = StyleSheet.create({
  selector: {
    flex:1,
    width: '60%',
    borderWidth: 0,
    paddingHorizontal: 8,
    borderRadius: 99,
    padding:20,
    textAlign:'center',
    justifyContent:'center',
  },
  selectorSelected: {
    textAlign:'center',
    fontWeight: 'bold'
  },
  selectorItens: {
    textAlign:'center'
  }
});
