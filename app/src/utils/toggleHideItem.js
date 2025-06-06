const toggleHideItem = async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/items/${id}/hide`;
    const response = fetch(url, {
        method:"POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}
export default toggleHideItem;