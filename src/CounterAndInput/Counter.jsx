import { connect } from "react-redux";
import styles from './counterAndInputStyles.module.css';


const Counter = (props) => {
    return (
        <div className = {styles.parts}>
            <h2>Counter</h2>
            <p className = {styles.counterValue}>
                {props.counter}
            </p>
            <div>
                <button className={styles.counterButtons} onClick={props.minus}>-</button>
                <button className={styles.counterButtons}onClick={props.plus}>+</button>
                <button className={styles.counterButtons}onClick={props.reset}>Reset</button>
            </div>
        </div>

    );
}

// for passing useful state elements to CounterWithRedux
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}//

// for passing useful methods to CounterWithRedux
const mapDispatchToProps = (dispatch) => {
    return {
        plus: () => dispatch({ type: "plus" }),
        minus: () => dispatch({ type: "minus" }),
        reset: () => dispatch({ type: "reset" })
    }
}//

const CounterWithRedux = connect(mapStateToProps, mapDispatchToProps)(Counter);  //passing useful state elements and methods to Counter component as props


export default CounterWithRedux;