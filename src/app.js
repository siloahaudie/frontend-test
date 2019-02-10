import React from 'react';
import AppService from './services/app-service';
import CounterTotal from './components/CounterTotal';
import CounterForm from './components/CounterForm';
import CounterList from './components/CounterList';

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

        AppService.add(title)
          .then((data) => {
              this.setState({
                  counters: data,
              });
          });
    };

    // increment handler
    incrementCounter = (id) => {
        const { counters } = this.state;

        AppService.increment(id)
          .then((data) => {
              this.setState({
                  counters: data,
              });
          });
    };

    // decrement handler
    decrementCounter = (id) => {
        const { counters } = this.state;

        AppService.decrement(id)
          .then((data) => {
              this.setState({
                  counters: data,
              });
          });
    };

    // delete handler
    deleteCounter = (id) => {
        const { counters } = this.state;
        const _this = this;

        AppService.delete(id)
          .then((data) => {
              this.setState({
                  counters: data,
              });
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
        AppService.get()
          .then((data) => {
              this.setState({
                  counters: data,
              });
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

export default CounterApp;
