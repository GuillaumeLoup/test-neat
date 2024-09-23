const fetchAlbums = async (searchTerm: string) => {
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=album`)
    const data = await response.json()
    return data.results
}

export default fetchAlbums
