"use client"

import { useEffect, useState } from "react"
import { StyleSheet, View, ScrollView, ActivityIndicator, Alert, Text } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { fetchRecipeById, updateRecipe } from "../../../services/api"
import type { Recipe, NewRecipe } from "../../../types"
import { RecipeForm } from "../../../components/recipe-form"

export default function EditRecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true)
        const data = await fetchRecipeById(id)
        setRecipe(data)

        if (data.isSystem) {
          Alert.alert("Cannot Edit", "System recipes cannot be edited", [{ text: "OK", onPress: () => router.back() }])
        }
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

  const handleSubmit = async (updatedRecipe: Omit<NewRecipe, "id">) => {
    try {
      setSubmitting(true)
      await updateRecipe(id, updatedRecipe)
      Alert.alert("Success", "Recipe updated successfully", [
        { text: "OK", onPress: () => router.replace(`/recipe/${id}`) },
      ])
    } catch (error) {
      console.error("Failed to update recipe:", error)
      Alert.alert("Error", "Failed to update recipe")
    } finally {
      setSubmitting(false)
    }
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

  if (recipe.isSystem) {
    return (
      <View style={styles.centered}>
        <Text>System recipes cannot be edited</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <RecipeForm onSubmit={handleSubmit} loading={submitting} initialValues={recipe} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

