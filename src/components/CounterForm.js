import React from 'react';

class CounterForm extends React.Component {
    constructor(props) {
        super(props);
        this.resetState = {
            title: '',
            isValid: true,
        };
        this.state = this.resetState;
    }

    setForm = event => {
        event.preventDefault();
        const { value } = event.target;

        this.setState({
            title: value,
            isValid: true,
        });
    }

    pressEnter = event => {
        event.preventDefault();
        if ( event.keyCode === 13 ) {
            this.submitForm();
        };
    }

    submitForm = () => {
        const { title } = this.state;

        if ( title.trim().length ) {
            this.props.addCounter(this.state.title);
            this.setState(this.resetState);
        } else {
            this.setState({
               isValid: false,
            });
        }
    }

    render() {
        const { title } = this.state;

        const buttonStyle = {
            maxHeight: '38px',
        };

        let inputClass = this.state.isValid ? 'form-control' : 'form-control is-invalid';

        return (
            <div className="row my-1 justify-content-between">
                <div className="col-12 p-0">
                    <small className="form-text text-muted">Add a counter.</small>
                </div>
                <div className="col-10 p-0">
                    <input value={title} onChange={this.setForm} onKeyUp={this.pressEnter} className={inputClass} placeholder="Title" type="text" />
                    <div className="invalid-feedback">
                        Provide a title!
                    </div>
                </div>
                <button onClick={this.submitForm} className="btn btn-outline-dark col-2" style={buttonStyle}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        );
    }
}

export default CounterForm;
