const uploadCloudImage = async (file) => {
    //FormData needed to make File object serializable
    //https://stackoverflow.com/questions/74824013/how-to-upload-an-image-to-cloudinary-with-fetch
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'default');
    const response = await fetch(`${import.meta.env.VITE_IMAGE_URL}/upload`, {
        method: "POST",
        body: data,
    });
    const json = await response.json();
    const imageData = {url: json.url, assetId: json.asset_id};
    return imageData;
}

export default uploadCloudImage;