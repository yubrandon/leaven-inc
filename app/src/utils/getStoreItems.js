const getStoreItems = async() => {
    const url = `${import.meta.env.VITE_API_URL}/items`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    //console.log(response);
    if(response.ok) {
        const json = await response.json();
        //console.log(json);
        if(json.items.length) {
            const items = json.items;
            const images = json.images;
            
            const itemData = [];
            items.map((item) => {
                let found = false;
                images.map((image) => {
                    if(!item.hidden) {
                        if(!found && image.item_id == item.id) {
                            found = true;
                            itemData.push({id: item.id, name: item.name, 
                                desc:item.desc, url:image.url, 
                                aid: image.asset_id, hidden: (item.hidden ? true : false)});
                        }
                    }
                });
                
            });
            //console.log(itemData);
            if(itemData.length) return itemData;
            return false;
        }
        else {
            return false;
        }
        
    } else {
        return 'error';
    }
   
}

export default getStoreItems;

