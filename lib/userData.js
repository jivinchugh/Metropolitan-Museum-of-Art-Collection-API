import { getToken } from "./authenticate";
async function sendRequest(url, method, data = null) {
    const token = await getToken();
    const headers = {
        'Authorization': `JWT ${token}`
    };

    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null
        });

        if (response.ok) {
            return await response.json(); // Return the data
        } else {
            return []; // Operation not successful, return an empty array
        }
    } catch (error) {
        console.error('Error sending request:', error);
        return []; // Operation not successful, return an empty array
    }
}

async function addToFavourites(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
    return await sendRequest(url, 'PUT');
}

async function removeFromFavourites(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
    return await sendRequest(url, 'DELETE');
}

async function getFavourites() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
    return await sendRequest(url, 'GET');
}

async function addToHistory(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    return await sendRequest(url, 'PUT');
}

async function removeFromHistory(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    return await sendRequest(url, 'DELETE');
}

async function getHistory() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
    return await sendRequest(url, 'GET');
}

export { addToFavourites, removeFromFavourites, getFavourites, addToHistory, removeFromHistory, getHistory };
