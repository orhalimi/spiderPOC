import React from 'react';
import './input.css';

class Input extends React.Component {
  
  constructor(props){
    super(props);

  }

  onChange = (event) =>{
    if(this.props.onChange) this.props.onChange(event.target.value, event);
  }

  render(){
    const props = {...this.props };
    delete props.onChange;
    return (
      <div>
        <input className="underlineInput" {...props} type={props.type || "text"} onChange={this.onChange} />
      </div>
    );
  }
}

export default Input;
