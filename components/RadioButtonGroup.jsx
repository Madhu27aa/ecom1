import React from 'react';

function RadioButtonGroup(props) {
  return (
    <div className="radio-group">
      <label>
        <input type="radio" value="pickup" checked={props.selectedOption === 'pickup'} onChange={props.handleChange} />
          Pickup at 7/1 Manali Main road seetharam nagar, Chinna Kodungaiyur, Chennai, TN 600118
              </label>
      <br />
      <label>
        <input type="radio" value="delivery" checked={props.selectedOption === 'delivery'} onChange={props.handleChange} />
        Delivery
      </label>
      <br />
    </div>
  );
}

export default RadioButtonGroup;
