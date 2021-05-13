import { Component } from 'react';
import './App.scss';
import Key from './Key/Key';

interface AppState {
  value: string;
}

class App extends Component<{}, AppState> {
  state = { value: '' };

  handleClick = (key?: string) => {
    let value = this.state.value;
    if (key === 'delete') {
      value = value.slice(0, -1);
    } else if (key) {
      value += key;
    }

    this.setState({ value });
  };

  render() {
    const keys = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      void 0,
      '0',
      'delete',
    ];
    return (
      <div className="app">
        <div className="app__output" data-testid="app-output">
          {this.state.value}
        </div>
        <div className="app__keyboard">
          {keys.map((key, i) => (
            <Key value={key} key={i} onClick={() => this.handleClick(key)} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
