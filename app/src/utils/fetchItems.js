const fetchItems = async () => {
    const indexes = [...Array(21).keys()].slice(1);   //array of values 1-20
    const data = await Promise.all(
        indexes.map(async (id) => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`)
                if(!res.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                return res.json();
            } catch (error) {
                console.log(error.message);
                return error;
            }
        })
    );
    return data;
}

export default fetchItems;