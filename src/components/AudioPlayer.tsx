import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { AudioSource, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/globals';

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ source }: { source: AudioSource }) {
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  const [isSliding, setIsSliding] = useState(false);
  const [sliderTime, setSliderTime] = useState(0);

  useEffect(() => {
    if (status?.didJustFinish) {
      player.seekTo(0);
      player.pause();
    }
  }, [status?.didJustFinish]);

  return (
    <View style={styles.container}>
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
          color={colors.textDark}
        />
      </Pressable>

      <Slider
        style={styles.slider}
        value={status.currentTime}
        onSlidingStart={(value: number) => {
          setIsSliding(true);
          player.pause();
        }
        }
        onValueChange={(value: number) => {
          setSliderTime(value);
        }
        }
        onSlidingComplete={(value: number) => {
          setIsSliding(false);
          player.seekTo(value);
          player.play();
        }
        }
        minimumValue={0}
        maximumValue={status.duration}
        minimumTrackTintColor={colors.textDark}
        maximumTrackTintColor={colors.textDark}
        thumbTintColor={colors.textDark}
      />

      <Text>{formatTime(isSliding ? sliderTime : status.currentTime)}/{formatTime(status.duration)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 0,
    backgroundColor: colors.audioPlayer,
    borderRadius: 30,
    maxWidth: '90%',
  },
  slider: {
    flex: 1,
    height: 30,
  }
});
