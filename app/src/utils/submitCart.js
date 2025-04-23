const submitCart = async (id, cart) => {
    const url = `${import.meta.env.VITE_API_URL}/orders`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({id: id, items: cart})
    });

    console.log(response);
    const json = await response.json();
    console.log(json);
    
    
}

export default submitCart;