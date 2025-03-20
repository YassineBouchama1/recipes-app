"use client"

import { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Alert, Image } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { deleteRecipe, fetchRecipeById } from "../../services/api"
import type { Recipe } from "../../types"
import { Button } from "../../components/button"

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true)
        const data = await fetchRecipeById(id)
        setRecipe(data)
      } catch (error) {
        console.error("Failed to fetch recipe:", error)
        Alert.alert("Error", "Failed to load recipe details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadRecipe()
    }
  }, [id])

  const handleEdit = () => {
    router.push(`/recipe/edit/${id}`)
  }

  const handleDelete = async () => {
    if (recipe?.isSystem) {
      Alert.alert("Cannot Delete", "System recipes cannot be deleted")
      return
    }

    Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteRecipe(id)
            router.replace("/")
          } catch (error) {
            console.error("Failed to delete recipe:", error)
            Alert.alert("Error", "Failed to delete recipe")
          }
        },
      },
    ])
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>Recipe not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.category}>{recipe.category}</Text>
            <Text style={styles.time}>{recipe.cookingTime} minutes</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{recipe.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.items.map((item, index) => (
            <Text key={index} style={styles.ingredient}>
              • {item}
            </Text>
          ))}
        </View>

        {recipe.isSystem ? (
          <View style={styles.systemBadge}>
            <Text style={styles.systemText}>System Recipe</Text>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={handleEdit} style={styles.editButton} />
            <Button title="Delete" onPress={handleDelete} style={styles.deleteButton} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  imagePlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 18,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    fontSize: 16,
    color: "#f4511e",
  },
  time: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    flex: 1,
    marginLeft: 8,
  },
  systemBadge: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  systemText: {
    color: "#666",
    fontWeight: "bold",
  },
})

