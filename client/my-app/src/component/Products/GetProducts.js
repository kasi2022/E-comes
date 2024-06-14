import React, { useState, useEffect } from 'react';
import '../Products/addview.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                if (data.status === 'ok') {
                    setProducts(data.products);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProducts();
    }, []);

    const addcart = (productId) => {
        console.log(productId);
        const userId = localStorage.getItem('userid');
        console.log(userId);
    };

    return (
        <div>
            <h1>Product</h1>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product._id} className="card" style={{ width: '18rem', margin: '10px' }}>
                        <img src={product.image} className="card-img-top" alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">Price: {product.price}</p>
                            <p className="card-text">Rating: {product.rating}</p>
                            <button onClick={() => addcart(product._id)}>By Product</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
