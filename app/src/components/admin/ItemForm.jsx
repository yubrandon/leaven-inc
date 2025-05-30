import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getStoreItems from "../../utils/getStoreItems";

const ItemForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const name = data.itemName;
        const file = data.itemImage;
        if(file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
            setError([]);
        } else {
            setError(["Make sure your files have the correct format!"]);
        }
        
        //console.log(name, file);
        if(!error.length) {
            const items = await getStoreItems();
            var newItem = true;
            items.map((item) => {
                if(name === item.name) newItem = false;
            });

            //console.log(itemStatus);
            if(newItem) {
                var imageData;
                const uploadImage = async () => {
                    //FormData needed to make File object serializable
                    //https://stackoverflow.com/questions/74824013/how-to-upload-an-image-to-cloudinary-with-fetch
                    const data = new FormData();
                    data.append('file', file);
                    data.append('upload_preset', 'default');
                    const response = await fetch(`${import.meta.env.VITE_IMAGE_URL}/upload`, {
                        method:"POST",
                        body: data,
                    });
                    //console.log(response);
                    const json = await response.json();
                    console.log(json);
                    imageData = {url: json.url, assetId: json.asset_id};
                }
                await uploadImage();
                //console.log(imageData);
                const url = `${import.meta.env.VITE_API_URL}/items`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        itemName: name,
                        image: imageData
                    }),
                })
                //console.log(response);
                const json = await response.json();
                //console.log(json);
                if(response.ok) {
                    //navigate("/store");
                } else {
                    //alert(`${json.msg}`);
                }
            } else {
                const json = await itemStatus.json();
                alert(json.msg);
            }
            
        }
    }
    return (
        <div className="container-fluid d-flex justify-content-center border-start">
            <div className="container-fluid d-flex flex-column align-items-center">
                <form onSubmit={handleSubmit} method="POST" className="d-flex flex-column">
                    <label htmlFor="itemName" className="form-label mb-3">
                        Item Name
                        <input  type="text" 
                                name="itemName"
                                className="form-control"
                                id="itemName"
                                required
                        ></input>
                    </label>
                    <label htmlFor="formFileNultiple" className="form-label mb-4">
                        Image
                        <input  type="file"
                                name="itemImage"
                                className="form-control"
                                id="formFileNultiple"
                                multiple
                        ></input>
                        <div id="passwordHelpBlock" className="form-text">
                            Upload an image (.png, .jpg)
                        </div>
                    </label>
                    <div className="d-flex justify-content-center">
                        <button    
                            type="submit"
                            className="btn btn-primary"
                        >Add Item</button>
                    </div>
                </form>
                {
                    error ? (
                        error.map((err) => {
                            return <p className="pt-4" style={{color:'red'}}>{err}</p>
                        })
                    ) 
                    
                    : ({})
                }
                
            </div>
            
        </div>
    )
}

export default ItemForm;