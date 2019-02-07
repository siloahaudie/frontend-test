/*
 * counter app
 */

const CounterList = props => {
    const visibilityStyle = {
        display: props.counterData.length ? 'none' : 'block',
    };

    const listItems = props.counterData.map((listItem, index) => {
        return (
            <li key={index} data-id={listItem.id} className="list-group-item justify-content-between align-items-center d-flex">
                <h5 className="m-0">{listItem.title}</h5>
                <div className="btn-group">
                    <button onClick={() => props.incrementCounter(index, listItem.id)} className="btn btn-increment btn-outline-secondary">
                        <i className="fas fa-plus"></i>
                    </button>
                    <button className="btn itemCount btn-outline-secondary" disabled>
                        {listItem.count}
                    </button>
                    <button onClick={() => props.decrementCounter(index, listItem.id)} className="btn btn-decrement btn-outline-secondary">
                        <i className="fas fa-minus"></i>
                    </button>
                    <button onClick={() => props.deleteCounter(listItem.id)} className="btn btn-delete btn-outline-danger">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        );
    });

    return (
        <div className="row my-4">
            <div className="card col-12 p-0">
                <div className="card-header text-center text-white bg-dark">
                    Counters
                </div>
                <div className="card-body p-0">
                    <ul className="list-group list-group-flush col-sm-12 p-0">
                        <li className="empty list-group-item text-center" style={visibilityStyle}>No Counter</li>
                        {listItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const CounterTotal = props => {
    return (
        <div className="row my-2">
            <div className="card col-12 p-0">
                <div className="card-header text-center text-white bg-dark">
                    Total
                </div>
                <div className="card-body text-center">
                    <h2 className="card-text">{props.totalCount}</h2>
                </div>
            </div>
        </div>
    );
}

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
        const {value} = event.target;

        this.setState({
            title: value,
            isValid: true,
        });
    }

    submitForm = () => {
        const { title } = this.state;

        if ( title === '' ) {
            this.setState({
               isValid: false,
            });
        } else {
            this.props.addCounter(this.state.title);
            this.setState(this.resetState);
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
                    <input value={title} onChange={this.setForm} className={inputClass} placeholder="Title" type="text" />
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

class CounterApp extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           counters: [],
       };
    }

    // add counter
    addCounter = (title) => {
        const { counters } = this.state;
        const _this = this;

        atomic('/api/v1/counter', {
            method: 'POST',
            data : {
              title: title
            }
        })
            .then(function (response) {
                // console.log(response.data); // xhr.responseText
                _this.setState({
                    counters: response.data,
                });
            })
            .catch(function (error) {
                console.log(error.status);
            });
    };

    // increment handler
    incrementCounter = (index, id) => {
        const { counters } = this.state;
        const _this = this;

        atomic('/api/v1/counter/inc', {
            method: 'POST',
            data : {
              id: id
            }
        })
            .then(function (response) {
                // console.log(response.data); // xhr.responseText
                _this.setState({
                    counters: response.data,
                });
            })
            .catch(function (error) {
                console.log(error.status);
            });
    };

    // decrement handler
    decrementCounter = (index, id) => {
        const { counters } = this.state;
        const _this = this;

        atomic('/api/v1/counter/dec', {
            method: 'POST',
            data : {
              id: id
            }
        })
            .then(function (response) {
                // console.log(response.data); // xhr.responseText
                _this.setState({
                    counters: response.data,
                });
            })
            .catch(function (error) {
                console.log(error.status);
            });
    };

    // delete handler
    deleteCounter = (id) => {
        const { counters } = this.state;
        const _this = this;

        atomic('/api/v1/counter', {
            method: 'DELETE',
            data : {
              id: id
            }
        })
            .then(function (response) {
                // console.log(response.data); // xhr.responseText
                _this.setState({
                    counters: response.data,
                });
            })
            .catch(function (error) {
                console.log(error.status);
            });
    };

    // Get Total Count
    totalCount = () => {
        const { counters } = this.state;
        let count = 0;

        const rows = counters.map((counter, index) => {
            count += counter.count;
        });

        return count;
    };

    componentDidMount() {
        const _this = this;

        atomic('/api/v1/counters')
            .then(function (response) {
                // console.log(response.data); // xhr.responseText
                _this.setState({
                    counters: response.data,
                });
            })
            .catch(function (error) {
                console.log(error.status); // xhr.status
            });
    }

    render() {
        const containerStyle = {
            maxWidth: '500px',
        };

        const { counters } = this.state;

        return (
            <div className="container" style={containerStyle}>
                {/* add counter */}
                <CounterForm
                    addCounter={this.addCounter}
                />

                {/* counter list */}
                <CounterList
                    counterData={counters}
                    incrementCounter={this.incrementCounter}
                    decrementCounter={this.decrementCounter}
                    deleteCounter={this.deleteCounter}
                />

                {/* counter total */}
                <CounterTotal
                    totalCount={this.totalCount()}
                />
            </div>
        );
    }
}

ReactDOM.render(
  <CounterApp />,
  document.getElementById('counterApp')
);
