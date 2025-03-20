import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import type { Recipe } from "../types"

interface RecipeCardProps {
  recipe: Recipe
  onPress: () => void
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.category}>{recipe.category}</Text>
        <Text style={styles.time}>{recipe.cookingTime} minutes</Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: "100%",
    height: 150,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#f4511e",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
})

