import React from 'react';

//Use {name} t destructure the 'username'
//Use {label} t destructure the 'Username'
//Use {value} t destructure the {account.username}
//Use {onChange} t destructure the {this.handleChange}
const Input = ({ name, label, value, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                //we can use autoFocus to instead of createRef.
                // autoFocus
                // ref={this.username} 
                //Use below to set the input element as a controled element. The input's value bind to state's value.
                value={value}
                onChange={onChange}
                //This name is work for component loginForm's e.currentTagrget
                name={name}
                id={name}
                type="text" 
                className="form-control"
            />
        </div>
    );
}
 
export default Input;