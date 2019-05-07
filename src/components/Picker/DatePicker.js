import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class Picker extends React.Component {
    constructor(props) {
      super(props);
      this.handleDayChange = this.handleDayChange.bind(this);
      this.state = {
        selectedDay: undefined,
        isEmpty: true,
        isDisabled: false,
      };
    }
  
    handleDayChange(selectedDay, modifiers, dayPickerInput) {
      const input = dayPickerInput.getInput();
      this.setState({
        selectedDay,
        isEmpty: !input.value.trim(),
        isDisabled: modifiers.disabled === true,
      });
    }
  
    render() {
      const { selectedDay} = this.state;
      return (
        <div>
          
          
        </div>
      );
    }
  }