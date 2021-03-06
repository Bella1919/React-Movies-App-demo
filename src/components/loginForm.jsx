import React, { Component } from 'react'
import Joi from 'joi-browser';
import Input from './common/input';


class LoginForm extends Component {
    //Use createRefs to create React element way not recommand to use oftenly.
    // username = React.createRef();
    //ComponentDidMount is a Life hook
    // componentDidMount(){
    //     this.username.current.focus();
    // }
    //
    state = {
        account:{username:'',password:''},
        //Here we use a object to instead of array of errors. Cause its much earsier to find the errors for given input fild.
        // For object we can find the errors like this: errors['username']
        //But if you use array will be like this: errors.find(e =>e.name==='username')
        errors:{}
        //we want to make the errors dynamicly like this:
        //errors:{
        //     username:Username is required,
        //     password:Password is required
        // }
    }
    //The schema is work for Joi
    schema = {
        username:Joi.string().required().label('Username'),
        password:Joi.string().required().label('Passname')
    }; 

    //validate will validate the hole form.
    validate =()=>{
        //cause the abortEarly will make the Joi cannot get both message of username and password.So to set abortEarly to false will aviod that.
        const options = { abortEarly:false};
        //we use object constructure to replace result to {error} means const {error}=result.
        const {error} = Joi.validate(this.state.account,this.schema,options);
        // console.log(result);
        if(!error) return null;

        const errors = {};
        for(let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
        //After rerange validate we abandon the below:
        // const errors ={};
        // const{ account } = this.state;
        // //.trim means cut the whitespace of account.username.
        // if(account.username.trim()==='')
        //     errors.username ='Username is required';
        // if(account.password.trim()==='')
        //     errors.password ='Password is required';
        // return Object.keys(errors).length === 0 ? null:errors;
    };

    handleSubmit = e =>{
        //This can stop default behavior of this event
        e.preventDefault();
        //The errors for validate of input.
        const errors = this.validate();
        // 
        this.setState({ errors:errors || {} });
        if(errors)return;
        //Here will call the server, rederecit the user to a different page. Its a part of refs
        // const username = this.username.current.value;
        console.log('submitted')
        //if errors is turn means it is null, the handleSubmit return it to the sever and console.log('submitted')
    };
    //validatieProperty will just validate input.
    //{name,value} instead of input, means {name,value}=input, means input.name and input.value.
    validateProperty = ({name,value}) => {
        const obj ={ [name]: value };
        //cause we dont want to make a hold validate so we make a new local schema.
        const schema = {[name]:this.schema[name]}
        const {error} = Joi.validate(obj,schema);
        return error? error.details[0].message : null;
        //you also can write the last row like this:
        // if(!result.error) return null;
        // return result.error.details[0].message;


        //Here are the second way to write the validateProperty method:
        // //.trim means cut the whitespace of account.username.
        // if (name === 'username'){
        //     if(value.trim()==='') return 'Username is required.';
        // }
        // if (name === 'password'){
        //     if(value.trim()==='') return 'Password is required.';
        // }
    };

    //Cause we want to make the code more simple. So we destructure the e.currentTarget to input.
    handleChange = ({currentTarget:input}) =>{
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = {...this.state.account};
        //we use the braclet [e.currenTarget.name] to make .username dynamic.
        account[input.name] = input.value;
        this.setState({ account, errors });
    };
    render() { 
        const {account,errors} = this.state;
        return ( 
            <div>
                 <h1>Login</h1>
                 <form onSubmit={this.handleSubmit}>
                    <Input 
                        name="username"
                        value={account.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />               
                    <Input 
                        name="password"
                        value={account.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button className="btn btn-primary">Login</button>
                 </form>
            </div>
         );
    }
}
 
export default LoginForm;


//the username and password can write like this as well if dont make them extracting as a reusable input.
{/* <div className="form-group">
    <label htmlFor="username">Username</label>
    <input 
    //we can use autoFocus to instead of createRef.
    // autoFocus
    // ref={this.username} 
    //Use below to set the input element as a controled element. The input's value bind to state's value.
    value={account.username}
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
    value={account.password}
    onChange={this.handleChange}
    name="password"
    id="password" 
    type="text" 
    className="form-control"
/>
</div> */}