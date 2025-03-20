import { StyleSheet, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"

interface FABProps {
  onPress: () => void
  icon: string
}

export function FAB({ onPress, icon }: FABProps) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <AntDesign name={icon} size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#f4511e",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

