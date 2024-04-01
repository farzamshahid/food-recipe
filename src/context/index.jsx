import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);
export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState('')
    const [loading, setLoading] = useState(false)
    const [recipeList, setRecipeList] = useState([])
    const [recipeDetailsData, setRecipeDetailsData] = useState(null)
    const [favoritesList, setFavoritesList] = useState([])
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await res.json()
            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes)
                setLoading(false)
                setSearchParam('')
                navigate('/')
            }
            console.log(data)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setSearchParam('')
        }
    }
    function handleToFavorite(getCurrentItem) {
        console.log(getCurrentItem)
        let cpyFavoritesLitst = [...favoritesList];
        const index = cpyFavoritesLitst.findIndex((item) => item.id === getCurrentItem.id)
        if (index === -1) {
            cpyFavoritesLitst.push(getCurrentItem)
        }
        else {
            cpyFavoritesLitst.splice(index)
        }
        setFavoritesList(cpyFavoritesLitst)
    }
    console.log(favoritesList, recipeList)
    return <GlobalContext.Provider value={{
        favoritesList, searchParam, setSearchParam, loading, recipeList, handleSubmit, recipeDetailsData,
        setRecipeDetailsData, handleToFavorite
    }}>{children}</GlobalContext.Provider>;
}