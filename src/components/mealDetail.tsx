import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import Loader from "./loader";


const getMealDetail = async (id: number) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.meals) {
            throw new Error("No data returned from the API.");
        }

        return data.meals[0];

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}


const MealDetail = () => {
    const location = useLocation();
    const id = location?.state?.id;

    const { data: meal, isLoading, error } = useQuery({
        queryKey: ["meal", id],
        queryFn: () => getMealDetail(id),
        enabled: !!id
    })

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <h1>{error.message}</h1>
    }


    return (
        <div className="max-w-7xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{meal.strMeal}</h1>

            <div className="flex flex-col items-start md:flex-row gap-8">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-auto max-w-sm rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                </div>

                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Category: <span className="text-gray-900">{meal.strCategory}</span>
                    </h2>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Cuisine: <span className="text-gray-900">{meal.strArea}</span>
                    </h2>
                    {meal.strTags && (
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                            Tags: <span className="text-gray-900">{meal.strTags}</span>
                        </h2>
                    )}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Instructions:</h3>
                        <p className="text-lg leading-relaxed text-gray-600">{meal.strInstructions}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MealDetail;
