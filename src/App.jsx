import React, { useState, useEffect } from 'react';
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
    const [item, setItem] = useState(null);

    useEffect(() => {
        // Fetch the existing item from the server
        fetch(`${API_URI}/1`)
            .then(response => response.json())
            .then(data => setItem(data))
            .catch(error => console.error('Error fetching item:', error));
    }, []);

    if (!item) return <div>Loading...</div>;

    return <UpdateItem itemId={item.id} />;
}

export default App;
