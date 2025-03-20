export interface Recipe {
  _id: string
  title: string
  description: string
  items: string[]
  cookingTime: number
  category: string
  image: string
  userId: string
  isSystem: boolean
}

export type NewRecipe = Omit<Recipe, "_id" | "userId" | "isSystem">

