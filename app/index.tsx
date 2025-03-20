"use client"

import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View, ActivityIndicator, TextInput, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { RecipeCard } from "../components/recipe-card"
import { fetchRecipes, filterRecipesByName } from "../services/api"
import type { Recipe } from "../types"
import { FAB } from "../components/fab"
import { Ionicons } from "@expo/vector-icons"

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const loadRecipes = async () => {
    try {
      setLoading(true)
      const data = await fetchRecipes()
      setRecipes(data)
    } catch (error) {
      console.error("Failed to fetch recipes:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    loadRecipes()
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadRecipes()
      return
    }

    try {
      setIsSearching(true)
      const results = await filterRecipesByName(searchQuery)
      setRecipes(results)
    } catch (error) {
      console.error("Failed to search recipes:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    loadRecipes()
  }

  const navigateToRecipe = (id: string) => {
    router.push(`/recipe/${id}`)
  }

  const navigateToCreateRecipe = () => {
    router.push("/recipe/create")
  }

  if (loading && !refreshing && !isSearching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearch} style={styles.searchIcon}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
            <Ionicons name="search" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {isSearching ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeCard recipe={item} onPress={() => navigateToRecipe(item._id)} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <FAB onPress={navigateToCreateRecipe} icon="plus" />
    </View>
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
  list: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchIcon: {
    padding: 8,
    marginLeft: 8,
  },
})

