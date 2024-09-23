'use client'

import '@/style/index.css'
import fetchAlbums from '@/services/fetchAlbums'
import { AlbumPayload } from '@/types/types'
import { useFavoriteStore } from '@/zustand/store'
import Image from 'next/image'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Button from './ui/Button'
import InputField from './ui/Input'

const MusicSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [albums, setAlbums] = useState<AlbumPayload[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { favorites, addFavorite, removeFavorite } = useFavoriteStore()

    const handleSearch = async () => {
        setIsLoading(true)
        const results = await fetchAlbums(searchTerm)
        setAlbums(results)
        setHasSearched(true)
        setIsLoading(false)
    }

    const handleAddFavorite = (albumName: string) => {
        if (!favorites.includes(albumName)) {
            addFavorite(albumName)
        } else {
            alert("Cet album est déjà dans vos favoris !")
        }
    }

    return (
        <div className="flex flex-col gap-10 mb-10">
            <h1 className="font-semibold text-[#44F485] text-lg md:text-3xl text-center">Ma playlist</h1>
            <div className="flex flex-col md:flex-row gap-6 md:items-end">
                <InputField
                    variant="filled"
                    color="gray"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    label="Rechercher un album"
                    icon={<FaSearch />}
                />
                <Button variant="outlined" color="green" onClick={handleSearch}>
                    {isLoading ? 'Recherche en cours...' : 'Rechercher'}
                </Button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center mt-4">
                    <div className="loader border-t-[#44F485]"></div>
                </div>
            ) : (
                albums.length !== 0 ? (
                    <div>
                        <ul className="flex flex-wrap justify-center md:justify-start items-center gap-6">
                            {albums.map((album) => (
                                <li className="w-[250px] h-[280px] bg-white rounded-lg shadow-lg p-4 m-2 flex flex-col justify-between" key={album.collectionId}>
                                    <div className="flex justify-center mb-2">
                                        <Image src={album.artworkUrl100} alt={album.collectionName} width={100} height={100} />
                                    </div>
                                    <p className="text-center text-gray-800 line-clamp-3">{album.collectionName}</p>
                                    <Button variant="outlined" color="green" onClick={() => handleAddFavorite(album.collectionName)}>
                                        Ajouter aux favoris
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (

                    hasSearched && <p className="text-white">Pas de résultats avec ce(s) mot clé(s) ! Rééssayez !</p>
                ))}

            {favorites.length !== 0 &&
                <div className="flex flex-col gap-10">
                    <h2 className="font-semibold text-[#44F485] text-md md:text-2xl text-left">Mes Favoris :</h2>
                    <ul className="flex flex-col justify-center gap-4">
                        {favorites.map((album) => (
                            <li key={album} className="flex justify-between items-center gap-2 w-full md:max-w-[600px] bg-white px-6 py-2">
                                <p className="w-2/3">{album}</p>
                                <Button variant="outlined" color="green" onClick={() => removeFavorite(album)}>
                                    Retirer des favoris
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>}
        </div>
    )
}

export default MusicSearchPage
