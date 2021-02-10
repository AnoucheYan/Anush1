import React from 'react'; 
import B from './B';
import C from './C';

class A extends React.Component{
    state = {
        inputValue:''
    }

    hendleCatchValue = (inputValue) => {
        this.setState ({
            inputValue
        });
    }

    render () {
        const {inputValue} = this.state;
        return (
            <div>
                <div>
                    <h1>A Component</h1>
                </div>
                <div>
                    <B onSubmit = {this.hendleCatchValue} />
                </div>
                <div>
                    <C inputValue = {inputValue} />
                </div>
            </div>
        )
    }
}

export default A;