import { StyleSheet, Pressable, Button, Text, View } from 'react-native';
import { AudioSource, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function AudioPlayer({ source }: { source: AudioSource }) {
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  return (
    <View>
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
        onSlidingComplete={(value) => {
                player.seekTo(value);
            }
        }
        minimumValue={0}
        maximumValue={status.duration}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbSize={32}
      />
      <Text>{Math.floor(status.currentTime)}s/{Math.floor(status.duration)}s</Text>
    </View>
    </View>
  );
}
