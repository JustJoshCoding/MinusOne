/* eslint-disable default-case */
import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';

export class GroupForm extends Component {
  state = {
    step: 1, 
    firstname: '',
    lastname: '',
    contactnumber: '',
    email: ''
  }

   // Proceed to next step
   nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    this.setState({[input]:e.target.value});
  }



  render() {
    const { step } = this.state;
    const { firstname, lastname ,contactnumber, email } = this.state;
    const values = { firstname, lastname ,contactnumber, email }
    
    
    switch(step){
      case 1:
        return (
          <FormUserDetails 
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 2:
        return <h1>Joined</h1>
    }
  }
}

export default GroupForm