const getStoreItems = async() => {
    const url = `${import.meta.env.VITE_API_URL}/items`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if(response.ok) {
        const json = await response.json();
        console.log(json);
        const items = json.items;
        const images = json.images;
    
        const itemData = [];
        items.map((item) => {
            let found = false;
            images.map((image) => {
                if(!found && image.item_id == item.id) {
                    found = true;
                    itemData.push({id: item.id, name: item.name, url: 'http://res.cloudinary.com/dlm75mx0p/image/upload/v1745389752/Starry_Nebula_pa9tbl.png'});
                }
            });
    
        });
        console.log(itemData);
        return itemData;
    } else {
        return 'error';
    }
   
}

export default getStoreItems;

