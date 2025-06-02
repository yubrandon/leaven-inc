const uploadDbImage = async (name, imageData) => {
    const url = `${import.meta.env.VITE_API_URL}/items`;
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
            itemName: name,
            image: imageData
        }),
    });
    const json = await response.json();
    console.log(json);
    return json;
}

export default uploadDbImage;