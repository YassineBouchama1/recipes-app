"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import type { Recipe, NewRecipe } from "../types"
import { Button } from "./button"
import { Picker } from "@react-native-picker/picker"

interface RecipeFormProps {
  onSubmit: (recipe: NewRecipe) => void
  loading: boolean
  initialValues?: Recipe
}

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appetizer",
  "Dessert",
  "Snack",
  "Drink",
  "Main Course",
  "Side Dish",
  "Salad",
  "Soup",
  "Other",
]

export function RecipeForm({ onSubmit, loading, initialValues }: RecipeFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [items, setItems] = useState("")
  const [category, setCategory] = useState("Main Course")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title)
      setDescription(initialValues.description)
      setCookingTime(initialValues.cookingTime.toString())
      setItems(initialValues.items.join("\n"))
      setCategory(initialValues.category)
      setImage(initialValues.image)
    }
  }, [initialValues])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!cookingTime.trim()) {
      newErrors.cookingTime = "Cooking time is required"
    } else if (isNaN(Number(cookingTime)) || Number(cookingTime) <= 0) {
      newErrors.cookingTime = "Cooking time must be a positive number"
    }

    if (!items.trim()) {
      newErrors.items = "At least one item is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      const itemsList = items
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)

      const recipe: NewRecipe = {
        title: title.trim(),
        description: description.trim(),
        cookingTime: Number(cookingTime),
        items: itemsList,
        category: category,
        image: image.trim(),
      }

      onSubmit(recipe)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Recipe title" />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Brief description of the recipe"
          multiline
          numberOfLines={3}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cooking Time (minutes)</Text>
        <TextInput
          style={styles.input}
          value={cookingTime}
          onChangeText={setCookingTime}
          placeholder="30"
          keyboardType="numeric"
        />
        {errors.cookingTime && <Text style={styles.errorText}>{errors.cookingTime}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} style={styles.picker}>
            {CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Items (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={items}
          onChangeText={setItems}
          placeholder="1 cup flour\n2 eggs\n1/2 cup sugar"
          multiline
          numberOfLines={5}
        />
        {errors.items && <Text style={styles.errorText}>{errors.items}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Image URL (optional)</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="https://example.com/image.jpg"
        />
      </View>

      <Button
        title={initialValues ? "Update Recipe" : "Create Recipe"}
        onPress={handleSubmit}
        disabled={loading}
        loading={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
})

