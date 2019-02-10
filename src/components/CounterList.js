import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class CounterList extends React.Component {
    constructor(props) {
       super(props);
    }

    render() {
        const style = {
            visibilityStyle: {
                display: this.props.counterData.length ? 'none' : 'block',
            },
            buttonMinWidth: {
                minWidth: '60px',
            }
        };

        const listItems = this.props.counterData.map((listItem, index) => {
            return (
                <li key={index} className="list-group-item justify-content-between align-items-center d-flex">
                    <h5 className="m-0">{listItem.title}</h5>
                    <div className="btn-group">
                        <button onClick={() => this.props.incrementCounter(listItem.id)} className="btn btn-increment btn-outline-dark">
                            <i className="fas fa-plus"></i>
                        </button>
                        <button className="btn itemCount btn-outline-secondary" style={style.buttonMinWidth} disabled>
                            {listItem.count}
                        </button>
                        <button onClick={() => this.props.decrementCounter(listItem.id)} className="btn btn-decrement btn-outline-dark">
                            <i className="fas fa-minus"></i>
                        </button>
                        <OverlayTrigger placement="top" overlay={ <Tooltip>Delete {listItem.title} <i className="fas fa-question"></i></Tooltip> }>
                            <button onClick={() => this.props.deleteCounter(listItem.id)} className="btn btn-delete btn-outline-danger">
                                <i className="fas fa-trash"></i>
                            </button>
                        </OverlayTrigger>
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
                            <li className="empty list-group-item text-center" style={style.visibilityStyle}>No Counter</li>
                            {listItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CounterList;
