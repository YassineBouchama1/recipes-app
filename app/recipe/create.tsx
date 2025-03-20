"use client"

import { useState } from "react"
import { StyleSheet, ScrollView, Alert } from "react-native"
import { useRouter } from "expo-router"
import { createRecipe } from "../../services/api"
import { RecipeForm } from "../../components/recipe-form"
import type { NewRecipe } from "../../types"

export default function CreateRecipeScreen() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (recipe: NewRecipe) => {
    try {
      setLoading(true)
      await createRecipe(recipe)
      Alert.alert("Success", "Recipe created successfully", [{ text: "OK", onPress: () => router.replace("/") }])
    } catch (error) {
      console.error("Failed to create recipe:", error)
      Alert.alert("Error", "Failed to create recipe")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <RecipeForm onSubmit={handleSubmit} loading={loading} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
})

