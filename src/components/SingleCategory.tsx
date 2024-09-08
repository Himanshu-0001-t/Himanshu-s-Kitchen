import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import Loader from './loader';

const getCategoryItems = async (name: string): Promise<any> => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);

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

interface meal {
    idMeal: string
    strMealThumb: string
    strMeal: string
}

const SingleCategoryItem = () => {
    const location = useLocation();
    const name = location?.state?.name;

    const { data, error, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategoryItems(name),
    });

    if (isLoading) return <Loader />
    if (error) return <div>Error: {error.message}</div>

    if (!data || !data.meals) return <div className="text-center text-2xl my-10 font-bold">No data.</div>


    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Category meal</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.meals.map((meal: meal) => {
                    const { idMeal, strMealThumb, strMeal } = meal;
                    if (!idMeal || !strMealThumb || !strMeal) return null;

                    return (
                        <Link to="/meal" state={{ id: idMeal }}
                            key={idMeal}
                            className="group relative rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-full"
                        >
                            <img
                                src={strMealThumb}
                                alt={strMeal}
                                className="w-full h-40 object-cover"
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white text-lg font-bold text-center">{strMeal}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SingleCategoryItem;
