const Actions = ({handlePlusCount, handleMinusCount}) =>{
    return(
        <div>
            <button
                className="myButtons"
                onClick= {handlePlusCount}
            >+</button>
            <button
                className="myButtons"
                onClick= {handleMinusCount}
            >-</button>
        </div>
    )
}

export default Actions;

