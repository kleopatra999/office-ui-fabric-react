import * as React from 'react';
import FocusZone from '../../utilities/focus/FocusZone';
import './Dropdown.scss';
import { css } from '../../utilities/index';

export interface IDropdownOption {
  key: string;
  text: string;
  isSelected?: boolean;
}

export interface IDropdownProps {
  label: string;
  options: IDropdownOption[];
  onChange?: (option: IDropdownOption) => void;
  isDisabled?: boolean;
}

export interface IDropdownState {
  isOpen: boolean;
  selectedIndex: number;
  isDisabled: boolean;
}

export default class Dropdown extends React.Component<IDropdownProps, any> {
  static defaultProps = {
    options: [],
    isDisabled: false
  }

  constructor(props?: IDropdownProps) {
    super(props);

    let selectedIndex = 0;

    for (let i = 0; i < props.options.length; i++) {
      if (props.options[i].isSelected) {
        selectedIndex = i;
        break;
      }
    }

    this.state = {
      isOpen: false,
      selectedIndex: selectedIndex,
      isDisabled: this.props.isDisabled
    };

    this._toggleOpen = this._toggleOpen.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
  }

  render() {
    let rootClass = 'ms-Dropdown';
    let { label, options } = this.props;
    let { isOpen, selectedIndex, isDisabled } = this.state;
    let selectedOption = options[selectedIndex];

    return (
      <div>
        <span className="ms-Label">{ label }</span>
        <div className={ css('ms-Dropdown', { 'is-open': isOpen, 'is-disabled': isDisabled }) } tabIndex={ 0 } onClick={ this._toggleOpen }>
          <i className="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>
          <span className="ms-Dropdown-title">{ selectedOption ? selectedOption.text : '' }</span>
          <FocusZone isEnabled={ isOpen } ref='dropdownZone'>
            <ul className="ms-Dropdown-items">
              { options.map(option => (
              <li
                key={ option.key }
                className={ 'ms-Dropdown-item' + ((selectedOption === option) ? ' is-selected' : '') }
                data-is-focusable={ true }
                onClick={ this._onItemClick.bind(this, option) }>{ option.text }</li>
              )) }
            </ul>
          </FocusZone>
        </div>

      </div>
    );
  }

  private _toggleOpen() {
    let { isDisabled, isOpen, selectedIndex } = this.state;
    let { options } = this.props;

    if (!isDisabled) {
      this.setState({
        isOpen: !isOpen
      }, () => {
        if (isOpen && options.length) {
          let selectedOption = options[selectedIndex];
          (this.refs as any).dropdownZone.focus();
        }
      });
    }
  }

  private _onItemClick(option) {
    let selectedOptionKey = option.key;
    let selectedOptionIndex;

    // Iterate through all of the options, finding the one the matches they selected key.
    for (let i = 0; i < this.props.options.length; i++) {
      if (option.key === this.props.options[i].key) {
        selectedOptionIndex = i;
      }
    }

    // Set the selected index to the matching option.
    this.setState({ selectedIndex: selectedOptionIndex });
  }

}