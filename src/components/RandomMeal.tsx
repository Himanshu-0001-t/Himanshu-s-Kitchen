import { useQuery } from '@tanstack/react-query';
import Loader from './loader';

const getrandomMeal = async (): Promise<any> => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
            throw new Error("No data returned from the API.");
        }

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}


const RandomMeal = () => {
    const { data: meal, error, isLoading } = useQuery({
        queryKey: ['random-meal'],
        queryFn: getrandomMeal,
    });

    if (isLoading) return <Loader />
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="max-w-7xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{meal.meals[0].strMeal}</h1>

            <div className="flex flex-col items-start md:flex-row gap-8">

                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={meal.meals[0].strMealThumb}
                        alt={meal.meals[0].strMeal}
                        className="w-full h-auto max-w-sm rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                </div>


                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Category: <span className="text-gray-900">{meal.meals[0].strCategory}</span></h2>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Cuisine: <span className="text-gray-900">{meal.meals[0].strArea}</span></h2>
                    {meal.strTags && (
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tags: <span className="text-gray-900">{meal.meals[0].strTags}</span></h2>
                    )}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Instructions:</h3>
                        <p className="text-lg leading-relaxed text-gray-600">{meal.meals[0].strInstructions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomMeal;
