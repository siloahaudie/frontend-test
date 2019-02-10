import React from 'react';

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

export default CounterTotal;
