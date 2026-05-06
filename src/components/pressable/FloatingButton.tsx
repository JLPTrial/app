import { textStyles } from '@/styles/texts';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FloatingButtonProps = {
  options: any[];
  onPress: Function;
};

export default function FloatingButton({ options, onPress} : FloatingButtonProps){
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(options[0]);

    return (
        <View style={styles.overlay}>
            <Pressable style={styles.button} onPress={() => setOpen(!open)}>
                <Text style={textStyles.subtitle}>{ option }</Text>
            </Pressable>

            {open && (
                <View style={styles.menu}>
                    {options.map((item) => (
                    <Pressable
                        key={item}
                        style={styles.option}
                        onPress={() => {
                            setOpen(false);
                            setOption(item);
                            onPress(item);
                        }}>
                        <Text style={textStyles.subtitle}>{item}</Text>
                    </Pressable>
                    ))}
                </View>
            )}
        </View>
    )
    
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 30,
    zIndex: 999,
    alignItems: 'flex-end',
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 30, 
    backgroundColor: 'rgba(238, 36, 36, 1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu: {
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    elevation: 4,
  },
  option: {
    height: 50,
    width: 50,
    borderRadius: 30, 
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  }
});