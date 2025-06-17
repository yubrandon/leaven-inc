const getStoreItemsAdmin = async() => {
    const url = `${import.meta.env.VITE_API_URL}/items`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if(response.ok) {
        const json = await response.json();
        if(json.items.length) {
            const items = json.items;
            const images = json.images;
            
            const itemData = [];
            items.map((item) => {
                let found = false;
                images.map((image) => {
                    if(!found && image.item_id == item.id) {
                        found = true;
                        itemData.push({id: item.id, name: item.name, 
                            desc:item.desc, url:image.url, 
                            aid: image.asset_id, hidden: (item.hidden ? true : false)});
                    }
                });
                
            });
            return itemData;
        }
        else {
            return false;
        }
        
    } else {
        return 'error';
    }
   
}

export default getStoreItemsAdmin;

