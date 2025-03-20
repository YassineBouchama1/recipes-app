import type { Recipe, NewRecipe } from "../types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/recipes"

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `API error: ${response.status}`)
  }
  return response.json() as Promise<T>
}

// Fetch all recipes
export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch(API_URL)
  return handleResponse<Recipe[]>(response)
}

// Fetch a single recipe by ID
export async function fetchRecipeById(id: string): Promise<Recipe> {
  const response = await fetch(`${API_URL}/${id}`)
  return handleResponse<Recipe>(response)
}

// Create a new recipe
export async function createRecipe(recipe: NewRecipe): Promise<Recipe> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
  return handleResponse<Recipe>(response)
}

// Update an existing recipe
export async function updateRecipe(id: string, recipe: Partial<NewRecipe>): Promise<Recipe> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
  return handleResponse<Recipe>(response)
}

// Delete a recipe
export async function deleteRecipe(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `API error: ${response.status}`)
  }
}

// Filter recipes by name
export async function filterRecipesByName(query: string): Promise<Recipe[]> {
  const response = await fetch(`${API_URL}/filter?name=${encodeURIComponent(query)}`)
  return handleResponse<Recipe[]>(response)
}

