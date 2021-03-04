import React, { Component } from 'react'

class LoginForm extends Component {
    //Use createRef to create React element way not recommand to use oftenly.
    // username = React.createRef();
    //ComponentDidMount is a Life hook
    // componentDidMount(){
    //     this.username.current.focus();
    // }
    //
    state = {
        account:{username:'',password:''}
    }

    handleSubmit = e =>{
        //This can stop default behavior of this event
        e.preventDefault();
        //Here will call the server, rederecit the user to a different page
        // const username = this.username.current.value;
        console.log('submitted')
    };
    //Cause we want to make the code more simple. So we destructure the e.currentTarget to input.
    handleChange = ({currentTarget:input}) =>{
        const account = {...this.state.account};
        //we use the braclet [e.currenTarget.name] to make .username dynamic.
        account[input.name] = input.value;
        this.setState({ account });
    };
    render() { 
        const {username, password} = this.state.account;
        return ( 
            <div>
                 <h1>Login</h1>
                 <form onSubmit={this.handleSubmit}>
                     <div className="form-group">
                         <label htmlFor="username">Username</label>
                         <input 
                            //we can use autoFocus to instead of createRef.
                            // autoFocus
                            // ref={this.username} 
                            //Use below to set the input element as a controled element. The input's value bind to state's value.
                            value={username}
                            onChange={this.handleChange}
                            //This name is work for e.currentTagrget
                            name="username"
                            id="username" 
                            type="text" 
                            className="form-control"
                        />
                     </div>
                     <div className="form-group">
                         <label htmlFor="password">Password</label>
                         <input 
                            value={password}
                            onChange={this.handleChange}
                            name="password"
                            id="password" 
                            type="text" 
                            className="form-control"
                        />
                     </div>
                     <button className="btn btn-primary">Login</button>
                 </form>
            </div>
         );
    }
}
 
export default LoginForm;