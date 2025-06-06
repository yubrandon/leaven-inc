const updateOrderComplete = async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/orders/${id}`;
    const response = await fetch(url, {
        method:"POST",
        credentials:"include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}

export default updateOrderComplete;