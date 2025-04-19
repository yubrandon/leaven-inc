import { useState, useEffect, useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import ItemCard from "../components/ItemCard";
import fetchItems from "../utils/fetchItems";
import { ShopContext } from "../utils/ShopContext";

const StorePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const { addItem } = useContext(ShopContext);

    useEffect(() => {
        //link to real db when set up
        const getItems = async () => {
            const items = await fetchItems()
               .catch((error) => setError(error));
            setData(items);
            setIsLoading(false);
        }
        getItems();
    }, []);
    return (
        <>
            <NavigationBar />
            {isLoading ?
                (
                    <h1>Loading...</h1>
                ) : (error ? 
                        (<h1>Error!</h1>
                        ) : (
                            <div className="container-fluid py-2 px-3 d-flex flex-column align-items-center">
                                <h1 className="mb-3">Check out the current items!</h1>
                                <div className="container-fluid d-flex flex-row flex-wrap justify-content-center pt-3" style={{gap:'50px'}}>
                                    {   data.map((item) => {
                                            return <ItemCard 
                                                key={item.id}
                                                item={item}
                                                onClick={(item, qty) => {
                                                    addItem(item,qty);
                                                }}
                                            ></ItemCard>
                                        })
                                    }                                
                                </div>
                            </div>
                        
                        )
                )
            }
        </>
    );
};

export default StorePage;