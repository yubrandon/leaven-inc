import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getStoreItems from "../../utils/getStoreItems";
import ItemDashboardCard from "./ItemDashboardCard";

const ItemDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    //Form will set current name as the placeholder, and will function similar to the add item form
    //On click, retrieve id and name of the item, set modal data, and display modal
    //modalData: {item_id: integer, item_name: string (current name)}
    const [modalData, setModalData] = useState(null);
    const editModal = (id, name) => {
        setModalData({item_id: id, item_name: name});
        console.log(modalData);
    }

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
        <div className="container-fluid d-flex justify-content-center border-start">
            {isLoading ? 
                (<h1 className="text-center pt-3">Loading...</h1>)
                :
                (error ? (<h1 className="text-center pt-3">Error! {error}</h1>)
                    :
                    (
                        <div className="d-flex flex-column col-12 align-items-center">
                            <h3 className="mb-3">Listed Items</h3>

                            { data.map((item) => {
                                    return <ItemDashboardCard 
                                                key={item.id}
                                                item={item}
                                                handleClick={editModal}
                                            ></ItemDashboardCard>
                                })}
                        </div>
                    )
                )
            }
            
        </div>
    )
}

export default ItemDashboard;

/**
 * Delete images using asset_id in db
 * https://cloudinary.com/documentation/image_upload_api_reference#destroy_by_asset_id
 */