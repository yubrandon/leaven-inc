const deleteItemById = async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/items/${id}/delete`;
    const response = fetch(url, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        
    })
    return response;
}

export default deleteItemById;