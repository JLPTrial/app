import Screen from '@/components/Screen';
import { AppText } from '../texts/AppText';
import { useEffect, useState } from 'react';
import { useQuestions } from '@/db/queries';
import { Dropdown } from 'react-native-element-dropdown';
import AppRadarGraph from '../graphs/AppRadarGraph';
import { StyleSheet } from 'react-native';

export default function TopicStats() {
  const [statsTypes, setStatsTypes] = useState<number[] | null>(null);
  const [type, setType] = useState<string>('kanji');
  const [statsTag, setStatsTag] = useState<number[] | null>(null);
  const [labelTag, setLabelTag] = useState<string[] | null>(null);
  const selectorData = [
    {label: 'Kanji', value: 'kanji'},
    {label: 'Audição',value: 'listening'},
    {label:  'Leitura',value: 'reading'},
    {label: 'Vocabulário',value: 'vocabulary'},
    {label: 'Gramática', value :'grammar'}
  ];
  const labelTypes = selectorData.map(type => type.label);

  const db = useQuestions('N5');

  useEffect(() => {
    (async () => {
      const data = await db.getTypeStats();
      setStatsTypes(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const [tags, stats] = await db.getTagStats(type);
      setStatsTag(stats);
      setLabelTag(tags);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (!statsTypes || statsTypes.length === 0) return null;
  return (
    <Screen internal>
      <AppText>Tópicos</AppText>
      <AppRadarGraph values={statsTypes} labels={labelTypes}/>

      <Dropdown
        style={styles.selector}
        labelField="label"
        data={selectorData}
        valueField="value"
        value={type}
        selectedTextStyle={{textAlign:'center'}}
        itemTextStyle={{textAlign:'center'}}
        onChange={item => {
          setType(item.value);
        }}
      />


      <AppRadarGraph values={statsTag} labels={labelTag}/>

    </Screen>
  );
}

const styles = StyleSheet.create({
  selector: {
    flex:1, width: '60%',borderWidth: 1, borderColor: 'gray', paddingHorizontal: 8,
    borderRadius: 99,
    padding:20,
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center'
  }
});
