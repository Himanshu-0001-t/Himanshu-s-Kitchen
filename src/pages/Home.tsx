import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loader from '../components/loader';


const homeRecipes = async (letter: string = "a") => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.meals) {
            throw new Error("No data returned from the API.");
        }

        return data.meals;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

interface recipes {
    strMealThumb: string
    idMeal: string
    strCategory: string
    strMeal: string
}
let recipesLetter: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', ' r', 'p', 'v', 'w']
let num = Math.floor(Math.random() * recipesLetter.length - 1)
let letter = recipesLetter[num]
const Home = () => {
    const { data: recipes, isLoading, error } = useQuery({
        queryKey: ['home'],
        queryFn: () => homeRecipes(letter)
    })

    if (isLoading) return <Loader />
    if (error) return <div>Error: {error.message}</div>

    if (!recipes) return <div className="text-center text-2xl my-10 font-bold">No data.</div>

    return (
        <div>
            <section className="bg-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Discover Delicious Recipes</h1>
                    <p className="text-xl mb-8">Find your favorite recipes and explore new ones with our easy-to-follow guides and tips.</p>
                    <Link to="/categories" className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300">
                        Explore Recipes
                    </Link>
                </div>
            </section>


            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Recipes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                        {recipes.map((item: recipes) => (
                            <div key={item.idMeal} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src={item.strMealThumb}
                                    alt={`Recipe ${item.strMeal}`}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">Recipe Title {item.strMeal}</h3>
                                    <p className="text-gray-600 mb-4">Recipe Category: {item.strCategory}</p>
                                    <Link to="/meal" state={{ id: item.idMeal }} className="text-orange-500 hover:text-orange-600">View Recipe</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="bg-orange-500 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Our Recipe Community</h2>
                    <p className="text-lg mb-8">
                        Discover new recipes, cooking tips, and the latest updates on our blog.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Home;
