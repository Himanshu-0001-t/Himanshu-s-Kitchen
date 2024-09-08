import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './search';

const Header = () => {
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [regions, setRegions] = useState<string[]>([]);
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const toggleRegionDropdown = () => setIsRegionDropdownOpen(!isRegionDropdownOpen);

    const handleSearch = (query: string) => {
        close()
        navigate(`/search-result/${query}`);
    };
    const close = () => {
        setIsRegionDropdownOpen(false)
        setIsMobileMenuOpen(false)
    }

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
                const data = await response.json();
                setRegions(data.meals.map((meal: any) => meal.strArea));
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };

        fetchRegions();
    }, []);

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-3xl font-bold text-gray-800">
                    <Link to="/" className="hover:text-orange-500">Himanshu's Kitchen</Link>
                </div>

                <nav className="hidden md:flex gap-10">
                    <Link to="/" className="text-gray-600 hover:text-orange-500 transition duration-300">Home</Link>
                    <Link to="/random-recips" className="text-gray-600 hover:text-orange-500 transition duration-300">Random</Link>
                    <Link to="/categories" className="text-gray-600 hover:text-orange-500 transition duration-300">Categories</Link>

                    <div className="relative w-full">
                        <button onClick={toggleRegionDropdown} className="text-gray-600 hover:text-orange-500 transition duration-300 flex items-center">
                            Regions
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isRegionDropdownOpen && (
                            <div className="absolute mt-2 flex w-96 flex-wrap bg-white border rounded-md shadow-lg">
                                {regions.map((region) => (
                                    <Link
                                        onClick={close}
                                        key={region}
                                        to={`/area-result/${region}`}
                                        className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-500"
                                    >
                                        {region}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 shadow-inner">
                    <SearchComponent onSearch={handleSearch} />
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
                        {isMobileMenuOpen ? (

                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (

                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <nav className={`md:hidden bg-white shadow-lg ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Home</Link>
                <Link to="/random-recips" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Random Recipes</Link>
                <Link to="/categories" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Categories</Link>

                <div className="relative">
                    <button onClick={toggleRegionDropdown} className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-500 flex items-center justify-between">
                        Regions
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isRegionDropdownOpen && (
                        <div className="mt-2 bg-white border rounded-md shadow-lg flex flex-wrap gap-2">
                            {regions.map((region) => (
                                <Link
                                    key={region}
                                    onClick={close}
                                    to={`/area-result/${region}`}
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-500"
                                >
                                    {region}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <SearchComponent onSearch={handleSearch} />
            </nav>
        </header>

    );
};

export default Header;
