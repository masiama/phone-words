import { fireEvent, render } from '@testing-library/react';
import Key from './Key';

it('renders empty key', () => {
  const { getByTestId } = render(<Key />);
  expect(getByTestId('key')).toHaveClass('key', 'key--empty');
});

it('renders delete key', () => {
  const { queryByTestId } = render(<Key value="delete" />);
  expect(queryByTestId('key-icon')).toBeInTheDocument();
});

it('renders number key without sub', () => {
  const { queryByTestId } = render(<Key value="1" />);
  expect(queryByTestId('key-sub')).not.toBeInTheDocument();
});

it('renders number key with sub', () => {
  const { queryByTestId } = render(<Key value="2" />);
  expect(queryByTestId('key-sub')).toBeInTheDocument();
});

it('handles on click', () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(<Key onClick={handleClick} />);
  fireEvent.click(getByTestId('key'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
