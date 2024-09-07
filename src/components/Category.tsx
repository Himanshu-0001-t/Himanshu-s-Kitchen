import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import Loader from "./loader";

const getAllCategorys = async (): Promise<category[] | null> => {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.categories) {
            throw new Error("No data returned from the API.");
        }

        return data.categories;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

interface category {
    idCategory: string,
    strCategory: string,
    strCategoryDescription: string,
    strCategoryThumb: string
}

const Category = () => {
    const { data: categories, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategorys
    })

    if (isLoading) return <Loader />
    if (error) return <div>Error: {error.message}</div>

    if (!categories) return <div className="text-center text-2xl my-10 font-bold">No data.</div>

    return (
        <section>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category: category) => (
                        <Link
                            to="/category"
                            state={{ name: category.strCategory }}
                            key={category.idCategory}
                            className="group relative rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={category.strCategoryThumb}
                                alt={category.strCategory}
                                className="w-full h-40 object-cover"
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span>{category.strCategory}</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Category