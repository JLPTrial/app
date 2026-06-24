import { useTheme } from '@/hooks/useTheme';
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from '../texts/AppText';

type FloatingButtonProps = {
  options: any[];
  defaultValue: any;
  onPress: Function;
};

export default function FloatingButton({ options, defaultValue, onPress} : FloatingButtonProps){
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(defaultValue);

  return (
    <View style={styles.overlay}>
      <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => setOpen(!open)}>
        <AppText variant="subtitle">{ option }</AppText>
      </Pressable>

      {open && (
        <View style={[styles.menu, { backgroundColor: colors.floatingMenu, borderColor: colors.border }]}>
          {options.map((item) => (
            <Pressable
              key={item}
              style={[styles.option, { backgroundColor: colors.floatingOption }]}
              onPress={() => {
                setOpen(false);
                setOption(item);
                onPress(item);
              }}>
              <AppText variant="subtitle">{item}</AppText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 999,
    alignItems: 'flex-end',
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu: {
    borderRadius: 30,
    borderWidth: 1,
    elevation: 4,
  },
  option: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
