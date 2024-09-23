import { create } from 'zustand'

interface FavoriteStore {
    favorites: string[]
    addFavorite: (album: string) => void
    removeFavorite: (album: string) => void
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favorites: [],
    addFavorite: (album) => set((state) => ({ favorites: [...state.favorites, album] })),
    removeFavorite: (album) => set((state) => ({
        favorites: state.favorites.filter(fav => fav !== album)
    }))
}))
