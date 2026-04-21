import { StyleSheet, Pressable, Text, View } from 'react-native';
import { AudioSource, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

function formatTime(seconds: number) : string {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ source }: { source: AudioSource }) {
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    if (status?.didJustFinish) {
      player.seekTo(0);
      player.pause();
    }
  }, [status?.didJustFinish]);

  return (
  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
    <Pressable
      onPress={() => {
        if (status.playing) {
          player.pause();
        } else {
          player.play();
        }
      }}
    >
      <Ionicons
        name={status.playing ? 'pause' : 'play'}
        size={32}
        color="#000"
      />
    </Pressable>

    <Slider
      style={{width: 200, height: 40}}
      value={status.currentTime}
      onSlidingComplete={(value : number) => {
              player.seekTo(value);
          }
      }
      minimumValue={0}
      maximumValue={status.duration}
      minimumTrackTintColor="#000000"
      maximumTrackTintColor="#000000"
      thumbTintColor="#000000"
      thumbSize={32}
    />
    <Text>{formatTime(status.currentTime)}/{formatTime(status.duration)}</Text>
  </View>
  );
}
