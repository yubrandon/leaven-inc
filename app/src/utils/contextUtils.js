//change to receiving an item if using id

//Return the index of the item if found
export const hasItem = (item, list) => {
    const index = list.findIndex((val) => {
      return (val.name === item.name);
    }) 
    return index;
};