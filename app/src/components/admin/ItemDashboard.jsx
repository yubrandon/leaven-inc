import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getStoreItems from "../../utils/getStoreItems";
import ItemDashboardCard from "../ItemDashboardCard";
import uploadCloudImage from "../../utils/uploadCloudImage";
import checkItemName from "../../utils/checkItemName";
import updateItem from "../../utils/updateItem";
import toggleHideItem from "../../utils/toggleHideItem";

const ItemDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    //Form will set current name as the placeholder, and will function similar to the add item form
    //On click, retrieve id and name of the item, set modal data, and display modal
    //modalData: {item_id: integer, item_name: string (current name)}
    const [originalName, setOriginalName] = useState('');
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [image, setImage] = useState('');
    const [hidden, setHidden] = useState(false);
    const editModal = (id, name, hidden) => {
        setItemId(id);
        setItemName(name);
        setOriginalName(name);
        setHidden(hidden);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Retrieve data from form
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const file = data.itemImage;
        //Check valid file if file is being changed
        if(itemName === originalName && !file.size) {
            alert('No changes have been made!');
        }
        else {
            if(file.size){
                if(!file.name.endsWith(".jpg") && !file.name.endsWith(".png")) {
                    console.log(file.name);
                    alert("Make sure your files have the correct format!");
                }
            }
            
            //Get asset_id for original item
            const item = await checkItemName(originalName);
    
            //Upload new image to the cloud if file is uploaded
            var imageData = false;
            if(file.size) {
                imageData = await uploadCloudImage(file);
            }
            const itemData = {}
            itemData.id = itemId;
            itemData.name = itemName;
            itemData.asset_id = item.asset_id;
            itemData.image = imageData;
            const update = await updateItem(itemData);
            console.log(update);
            if(update.ok) {

                navigate("/store");
            } 
            else {
                alert(`Failed to update item!`);
            }
        }  
        
    }
    const handleHide = async (e) => {
        e.preventDefault();
        const response = await toggleHideItem(itemId);
        if(response.ok) {
            const json = await response.json();
            navigate("..");
            alert(json.msg);
        }
        else {
            alert(`Failed to hide item!`);
        }

    }
    useEffect(() => {
        const getItems = async () => {
            const items = await getStoreItems()
               .catch((error) => setError(error));
            items ? setData(items) : setData(false);
            setIsLoading(false);
        }
        getItems();
    }, []);

    return (
    <>
        <div className="modal fade" id="itemModal" tabIndex="-1" aria-labelledby="itemModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="itemModalLabel">Edit Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={e => (setImage(''))}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} method="POST" className="d-flex flex-column">
                            <label htmlFor="itemName" className="form-label mb-3">
                                Item Name
                                <input  type="text" 
                                        name="itemName"
                                        className="form-control"
                                        id="itemName"
                                        value={itemName}
                                        onChange={e => (setItemName(e.target.value))}
                                ></input>
                            </label>
                            <label htmlFor="formFileMultiple" className="form-label mb-4">
                                Image
                                <input  type="file"
                                        name="itemImage"
                                        className="form-control"
                                        id="formFileMultiple"
                                        value={image}
                                        onChange={e => (setImage(e.target.value))}
                                ></input>
                                <div id="passwordHelpBlock" className="form-text">
                                    Upload an image (.png, .jpg)
                                </div>
                                
                            </label>
                            <div className="d-flex justify-content-between">
                            {
                                hidden ? 
                                <button
                                    className="btn btn-success"
                                    onClick={handleHide}
                                    data-bs-target="itemModal"
                                    data-bs-toggle="modal"
                                >Show Item</button>
                                : 
                                <button
                                    className="btn btn-danger"
                                    onClick={handleHide}
                                    data-bs-target="itemModal"
                                    data-bs-toggle="modal"
                                >Hide Item</button>
                            }
                                
                                <button    
                                    type="submit"
                                    className="btn btn-primary"
                                    data-bs-target="itemModal"
                                    data-bs-toggle="modal"
                                >Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid d-flex justify-content-center border-start">
            {isLoading ? 
                (<h1 className="text-center pt-3">Loading...</h1>)
                :
                (error ? (<h1 className="text-center pt-3">Error! {error}</h1>)
                    :
                    (
                        <div className="d-flex flex-column col-12 align-items-center">
                            <h3 className="mb-3">Listed Items</h3>
                            { data ? 
                                data.map((item) => {
                                        return <ItemDashboardCard 
                                                    key={item.id}
                                                    item={item}
                                                    handleClick={editModal}
                                                ></ItemDashboardCard>
                                    })
                            :  <h1>No items uploaded!</h1>
                            }
                            
                        </div>
                    )
                )
            }
            
        </div>
    </>
    )
}

export default ItemDashboard;
