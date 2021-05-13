import { Component } from 'react';
import { throttle } from 'throttle-debounce';
import './App.scss';
import Key from './Key/Key';

interface AppState {
  value: string;
  results: string[];
}

class App extends Component<{}, AppState> {
  state = { value: '', results: [] };
  updateResults = throttle(100, async value => {
    const response = await fetch('/convert', {
      method: 'post',
      body: JSON.stringify({ value }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { list, truncated } = await response.json();
    const lastElemet = truncated ? ['List truncated'] : [];
    this.setState({ results: [...list, ...lastElemet] });
  });

  handleClick = (key?: string) => {
    let value = this.state.value;
    if (key === 'delete') {
      value = value.slice(0, -1);
    } else if (key) {
      value += key;
    }

    this.setState({ value });
    this.updateResults(value);
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
        <div className="app__results">
          {this.state.results.map(item => (
            <div key={item}>{item}</div>
          ))}
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
