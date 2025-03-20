import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, type StyleProp, type ViewStyle } from "react-native"

interface ButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  style?: StyleProp<ViewStyle>
}

export function Button({ title, onPress, disabled, loading, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled || loading ? styles.buttonDisabled : null, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f4511e",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#f4511e80",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

