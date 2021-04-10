import { Dropdown, DropdownButton, Form, Button, } from 'react-bootstrap';
import styles from './search.module.css';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';
import { uppercaseFirstLetter } from '../../helpers/actionsWithStrings';
import { searchAndSortTasks } from '../../Redux/actions';
import isoDate from '../../helpers/IsoDate';


const Search = (props) => {
    const {
        //functions
        setDropDownValues,
        changeSearch,
        setDate,
        resetSearch,
        submitSearchThunk,
        ...state
    } = props

    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state

    const submitSearch = () => {
        const backendData = {};
        for (let key in state) {
            if (state[key]) {
                backendData[key] = typeof state[key] === "object" ? isoDate(state[key]) : state[key];
            }
        }
        submitSearchThunk(backendData);
    }

    return (
        <>
            <div className={styles.container}>
                <h3>Search</h3>
                <div className={styles.drops}>

                    <div className={styles.inputContainer}>
                        <Form.Control
                            name="tytle"
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => changeSearch(e.target.value)}
                        />
                    </div>

                    <div className={styles.sortButtonsContainer}>
                        <div className={styles.sortButtons}>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={!!!status ? "Status" : uppercaseFirstLetter(status)}
                            >
                                <Dropdown.Item onClick={(e) => setDropDownValues("done", "status")}>Done</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("active", "status")}>Active</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("", "status")}>Reset</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <div className={styles.sortButtons}>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={!!!sort ? "Sort" : sort.toUpperCase().replaceAll("_", " ")}
                            >
                                <Dropdown.Item onClick={(e) => setDropDownValues("a-z", "sort")}>A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("z-a", "sort")}>Z-A</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("creation_date_oldest", "sort")}>Creation date oldest</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("creation_date_newest", "sort")}>Creation date newest</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("Completion_date_oldest", "sort")}>Completion date oldest</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("completion_date_newest", "sort")}>Completion date newest</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setDropDownValues("", "sort")}>Reset</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>

                </div>

                <div className={styles.datePickerContainer}>
                    <div>
                        <div className={styles.datePicker}>
                            Create lte: <DatePicker
                                selected={create_lte}
                                onChange={date => setDate("create_lte", date)}
                            />
                        </div>
                        <div className={styles.datePicker}>
                            Create gte: <DatePicker
                                selected={create_gte}
                                onChange={date => setDate("create_gte", date)}
                            />
                        </div>
                        <div className={styles.datePicker}>
                            Complete lte: <DatePicker
                                selected={complete_lte}
                                onChange={date => setDate("complete_lte", date)}
                            />
                        </div>
                        <div className={styles.datePicker}>
                            Complete gte: <DatePicker
                                selected={complete_gte ? complete_gte : null}
                                onChange={date => setDate("complete_gte", date)}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            variant="info"
                            onClick={submitSearch}
                        >
                            Search
                        </Button>
                        <Button
                            variant="info ml-4"
                            onClick={resetSearch}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {

    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state.searchState

    return {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setDropDownValues: (value, dropDown) => dispatch({ type: actionTypes.SET_DROPDOWN_VALUE, value, dropDown }),
        changeSearch: (value) => dispatch({ type: actionTypes.CHANGE_SEARCH, value }),
        setDate: (dateType, date) => dispatch({ type: actionTypes.SET_DATE, dateType, date }),
        resetSearch: () => dispatch({ type: actionTypes.RESET_SEARCH }),
        //thunks
        submitSearchThunk: (backendData) => dispatch(searchAndSortTasks(backendData))
    }
}

const SearchRedux = connect(mapStateToProps, mapDispatchToProps)(Search);


export default SearchRedux;