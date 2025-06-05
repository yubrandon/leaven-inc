/**
 * Delete images using asset_id
 * https://cloudinary.com/documentation/image_upload_api_reference#destroy_by_asset_id
 */
const updateItem = async (itemData) => {
    const url = `${import.meta.env.VITE_API_URL}/items/${itemData.id}`;
    const response = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(itemData)
    })
    return response;
    //const json = await response.json();
    //return json;

}

export default updateItem;