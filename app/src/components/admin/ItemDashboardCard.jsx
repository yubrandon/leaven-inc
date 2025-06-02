const ItemDashboardCard = ({item, handleClick}) => {
    const click = () => {
        handleClick(item.id, item.name);
    }
    return (
        <div className="d-flex flex-row border rounded-1 col-9 justify-content-between px-3 mb-2">
            <div className="d-flex flex-row justify-content-between col-5 py-1">
                <h4 className="d-flex flex-row align-items-center">{item.name}</h4>
                <img src={item.url} className="" style={{width:'100px', height:'60px'}}/>
            </div>
            <div className="d-flex align-items-center">
                <button type="button" 
                        className="btn btn-outline-secondary px-3" 
                        style={{height:'40px'}}
                        onClick={click}
                >Edit</button>
            </div>
        </div>
    )
}

export default ItemDashboardCard;