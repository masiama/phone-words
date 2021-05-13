import { fireEvent, render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders 12 keys', () => {
  const { queryAllByTestId } = render(<App />);
  expect(queryAllByTestId('key')).toHaveLength(12);
});

it('updates output if click on key', () => {
  const { queryAllByTestId, getByTestId } = render(<App />);
  const key = queryAllByTestId('key')[0];
  const value = key.textContent;

  fireEvent.click(key);
  expect(getByTestId('app-output')).toHaveTextContent(value);
});
