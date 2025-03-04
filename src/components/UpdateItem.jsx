import React, { useState, useEffect } from 'react';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ itemId }) => {
    const [item, setItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch existing item when component mounts
        fetch(`${API_URI}/${itemId}`)
            .then(response => response.json())
            .then(data => setItem(data))
            .catch(error => console.error('Error fetching item:', error));
    }, [itemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem({ ...updatedItem, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update item via API
        fetch(`${API_URI}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
            .then(response => response.json())
            .then(data => {
                setMessage('Item updated successfully!');
                setItem(data);
            })
            .catch(error => {
                console.error('Error updating item:', error);
                setMessage('Error updating item.');
            });
    };

    if (!item) return <div>Loading...</div>;

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={item.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        defaultValue={item.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateItem;

