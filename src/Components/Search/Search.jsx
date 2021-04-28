import { Dropdown, DropdownButton, Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './search.module.css';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import actionTypes from '../../Redux/actionTypes';
import { uppercaseFirstLetter } from '../../helpers/actionsWithStrings';
import { searchAndSortTasks, searchTasks } from '../../Redux/actions';
import isoDate from '../../helpers/IsoDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';


const Search = (props) => {
    const {
        //functions
        setDropDownValues,
        changeSearch,
        setDate,
        resetSearch,
        submitSearchThunk,
        submitSearchAndFilterThunk,
        showFilter,
        ...state
    } = props

    const {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,
        filter
    } = state

    const submitSearchAndFilter = () => {
        const backendData = {};
        for (let key in state) {
            if (state[key]) {
                backendData[key] = typeof state[key] === "object" ? isoDate(state[key]) : state[key];
            }
        }
        submitSearchAndFilterThunk(backendData);
    }

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
            <Container className={styles.container1}>

                <Row className="align-items-center">
                    <Col className="my-2">
                        <div className="d-flex">
                            <Form.Control
                                name="tytle"
                                type="text"
                                placeholder="Search task..."
                                value={search}
                                onChange={(e) => changeSearch(e.target.value)}
                            />
                            <Button
                                onClick={submitSearch}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </Col>
                    <Col className="my-1">
                        <div >

                            <Button
                                onClick={showFilter}
                                variant="success"
                                className="m-1"
                            >
                                <FontAwesomeIcon icon={faFilter} />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {
                filter && <Container className={styles.container2}>
                    <Row>
                        <Col>
                            <div className = "d-flex justify-content-center">
                                <DropdownButton
                                    className="m-2"
                                    id="dropdown-basic-button"
                                    title={!!!status ? "Status" : uppercaseFirstLetter(status)}
                                >
                                    <Dropdown.Item onClick={(e) => setDropDownValues("done", "status")}>Done</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setDropDownValues("active", "status")}>Active</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setDropDownValues("", "status")}>Reset</Dropdown.Item>
                                </DropdownButton>
                                <DropdownButton
                                    className="m-2"
                                    id="dropdown-basic-button"
                                    title={!!!sort ? "SORT" : sort.toUpperCase().replaceAll("_", " ")}
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
                        </Col>
                    </Row>

                    <Row className="my-2">
                        <Col>
                            <span>Create lte:</span>
                        </Col>
                        <Col>
                            <DatePicker
                                selected={create_lte}
                                onChange={date => setDate("create_lte", date)}
                            />
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col>
                            <span>Create gte:</span>
                        </Col>
                        <Col>
                            <DatePicker
                                selected={create_gte}
                                onChange={date => setDate("create_gte", date)}
                            />
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col>
                            <span>Complete lte:</span>
                        </Col>
                        <Col>
                            <DatePicker
                                selected={complete_lte}
                                onChange={date => setDate("complete_lte", date)}
                            />
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col>
                            <span>Complete gte:</span>
                        </Col>
                        <Col>
                            <DatePicker
                                selected={complete_gte ? complete_gte : null}
                                onChange={date => setDate("complete_gte", date)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button
                                variant="info"
                                className="m-1"
                                onClick={submitSearchAndFilter}
                            >
                                Search And/Or Filter
                            </Button>

                            <Button
                                variant="info"
                                onClick={resetSearch}
                                className="m-1"
                            >
                                RESET
                            </Button>
                        </Col>
                    </Row>

                </Container>
            }
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
        complete_gte,
        filter
    } = state.searchState

    return {
        search,
        status,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,
        filter
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setDropDownValues: (value, dropDown) => dispatch({ type: actionTypes.SET_DROPDOWN_VALUE, value, dropDown }),
        changeSearch: (value) => dispatch({ type: actionTypes.CHANGE_SEARCH, value }),
        setDate: (dateType, date) => dispatch({ type: actionTypes.SET_DATE, dateType, date }),
        resetSearch: () => dispatch({ type: actionTypes.RESET_SEARCH }),
        showFilter: () => dispatch({ type: actionTypes.SHOW_FILTER }),
        //thunks
        submitSearchThunk: (backendData) => dispatch(searchTasks(backendData)),
        submitSearchAndFilterThunk: (backendData) => dispatch(searchAndSortTasks(backendData))
    }
}

const SearchRedux = connect(mapStateToProps, mapDispatchToProps)(Search);


export default SearchRedux;