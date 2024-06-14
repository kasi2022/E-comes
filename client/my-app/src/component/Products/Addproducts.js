import React, { useState } from 'react';

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', parseFloat(price));
            formData.append('rating', parseInt(rating));
            formData.append('image', image);

            const response = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            setMessage(data.message);
            // Clear form fields after successful submission
            setName('');
            setPrice('');
            setRating('');
            setImage('');
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProductForm;
