# Recipe App

A React Native mobile application for managing recipes. This app allows users to browse, search, create, edit, and delete recipes using a RESTful API.

## Features

- **Browse Recipes**: View a list of all available recipes with images and categories
- **Search Functionality**: Search recipes by name
- **Recipe Details**: View detailed information about each recipe
- **Create Recipes**: Add new recipes with title, description, ingredients, cooking time, category, and image
- **Edit Recipes**: Update existing recipes (except system recipes)
- **Delete Recipes**: Remove recipes from the collection (except system recipes)
- **Responsive Design**: Works on various screen sizes
- **Form Validation**: Ensures all required fields are filled correctly
- **Pull-to-Refresh**: Easily refresh the recipe list

## Screenshots

*Add your screenshots here*

## Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform for React Native
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based routing for navigation
- **React Navigation**: Navigation library for React Native
- **Expo Vector Icons**: Icon library
- **React Native Picker**: Component for selecting categories

## API Integration

This app integrates with a recipe API at `https://recipes-api-green.vercel.app/api`. The API provides endpoints for:

- Fetching all recipes
- Fetching a single recipe by ID
- Creating new recipes
- Updating existing recipes
- Deleting recipes
- Filtering recipes by name

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your physical device (optional)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yassisnebouchama1/recipe-app.git
   cd recipe-app