import { connect } from "react-redux";
import styles from './counterAndInputStyles.module.css';


const InputResult = (props) => {
    return (
        <div className = {styles.parts}>
            <h2>Input</h2>
            <div>
                <input
                    className = {styles.myInput}
                    type="text"
                    name="myText"
                    placeholder="Insert text"
                    onChange={(e) => props.setInputValue(e.target.value)}
                    value={props.inputValue}
                />
                <button className={styles.inputButton} onClick={props.clearInput}>Clear</button>
            </div>
            <div>
                <p> {props.inputValue} </p>
            </div>
        </div>
    );
}

// for passing useful state elements to InputWithRedux
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue
    }
}//

// for passing useful methods to InputWithRedux
const mapDispatchToProps = (dispatch) => {
    return {
        setInputValue: (inputValue) => {
            dispatch({ type: "setInputValue", inputValue })
        },
        clearInput: () => dispatch({ type: "clearInput" })
    }
}//

const InputWithRedux = connect(mapStateToProps, mapDispatchToProps)(InputResult);  //passing useful state elements and methods to Input component as props


export default InputWithRedux;