import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CategoryBooks = () => {
    const books = useLoaderData();
    return (
        <div>
            <h3>All {books[0]?.category} Category Books Here</h3>
        </div>
    );
};

export default CategoryBooks;