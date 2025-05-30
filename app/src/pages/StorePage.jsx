import { useState, useEffect, useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import ItemCard from "../components/ItemCard";
import { ShopContext } from "../utils/ShopContext";
import getStoreItems from "../utils/getStoreItems";

const StorePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { addItem } = useContext(ShopContext);

    useEffect(() => {
        const getItems = async () => {
            const items = await getStoreItems()
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
                    <h1 className="text-center pt-3">Loading...</h1>
                ) : (error ? 
                        (   <h1 className="text-center pt-3">Error! {error}</h1>
                        ) : (
                            <div className="container-fluid py-2 px-3 d-flex flex-column align-items-center">
                                <h1 className="mb-3"></h1>
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