import React, { useState } from 'react';

const SearchComponent = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-center max-w-lg mx-auto mt-10">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for recipes..."
                className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-r-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
                Search
            </button>
        </form>
    );
};

export default SearchComponent;
