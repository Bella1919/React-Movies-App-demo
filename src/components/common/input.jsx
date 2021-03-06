import React from 'react';

//Use {label} t destructure the 'Username'
//Use {value} t destructure the {account.username}
//Use {onChange} t destructure the {this.handleChange}
//use{name,label,error,...rest} means object destructure of { name, label, error, value, type, onChange }
const Input = ({ name,label,error,...rest}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                //we can use autoFocus to instead of createRef.
                // autoFocus
                // ref={this.username} 
                //Use below to set the input element as a controled element. The input's value bind to state's value.
                // This name is work for component loginForm's e.currentTagrget
                name={name}
                id={name}
                className="form-control"
                {...rest}
                // This{...rest} instead of below:
                // value={value}
                // type={type}
                // onChange={onChange}
            />
            {/* This expression means if error is truthy the expression  <div className="alert alert-danger">{error}</div> will be return.Otherwise if error is faulthy the expression will be ignore. */}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Input;