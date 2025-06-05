import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadCloudImage from "../../utils/uploadCloudImage";
import uploadDbImage from "../../utils/uploadDbImage";
import checkItemName from "../../utils/checkItemName";

const ItemForm = () => {
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Retrieve data from form
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const name = data.itemName;
        const file = data.itemImage;
        //Check valid file
        if(file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
            setError([]);
        } else {
            setError(["Make sure your files have the correct format!"]);
        }
        
        //console.log(name, file);
        if(!error.length) {
            //Check if item with same name already
            const item = await checkItemName();

            if(!item.exists) {
                const imageData = await uploadCloudImage(file);
                const dbImage = await uploadDbImage(name, imageData);
                if(dbImage.ok) {
                    navigate("/store");
                } 
                else {
                    alert(`${json.msg}`);
                }
            } 
            else {
                alert('An item with the same name already exists!');
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
                    <label htmlFor="formFileMultiple" className="form-label mb-4">
                        Image
                        <input  type="file"
                                name="itemImage"
                                className="form-control"
                                id="formFileMultiple"
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