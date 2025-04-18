//change to receiving an item if using id

//Return the index of the item if found
export const hasItem = (name, list) => {
    const index = list.findIndex((pair) => {
      return (pair.title === name);
    }) 
    return index;
};