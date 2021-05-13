import classNames from 'classnames';
import { Component, Fragment } from 'react';
import { ReactComponent as Delete } from './delete.svg';
import './Key.scss';

const subTexts: { [key: string]: string } = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
  '0': ' ',
};

interface KeyProps {
  value?: string;
  onClick?: () => void;
}

class Key extends Component<KeyProps> {
  render() {
    const { value } = this.props;
    const classes = classNames('key', { 'key--empty': !value });

    let label;
    if (this.props.value === 'delete') {
      label = <Delete className="key__icon" data-testid="key-icon" />;
    } else if (value) {
      const subText = subTexts[value];
      label = (
        <Fragment>
          <div>{value}</div>
          {subText && (
            <div className="key__sub" data-testid="key-sub">
              {subText}
            </div>
          )}
        </Fragment>
      );
    }

    return (
      <div className={classes} onClick={this.props.onClick} data-testid="key">
        {label}
      </div>
    );
  }
}

export default Key;
