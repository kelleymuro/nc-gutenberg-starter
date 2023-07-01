import { useEffect } from 'react';
import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import axios from 'axios';


export default function CategorySelector({ category, onChangeCategory }) {
    const [ categories, setCategories ] = useState([]);
    const [ currentValue, setCurrentValue ] = useState(category ?? null);
    const baseURL = window.location.origin;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/wp-json/nc-data/v1/categories`);
                const { data } = response.data;
                const configureCategories = data.map(c => ({
                    label: c.name,
                    value: `product_categories.category_id:eq:${c.id}`
                }));
                configureCategories.unshift({
                    label: 'All products',
                    value: true
                  });
                setCategories(configureCategories);
            } catch (err) {
                console.error('Error fetching categories', error);
            }
        }
        fetchData();
    }, [baseURL]);

    
        const handleCategoryChange = value => {
            setCurrentValue(value);
            onChangeCategory(value)
        }
    
   
    return(
            <SelectControl
                label="Select a category"
                options={categories}
                value={currentValue}
                onChange={handleCategoryChange}
            />
    )
}