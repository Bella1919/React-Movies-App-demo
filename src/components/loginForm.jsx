import React, { Component } from 'react'
import Joi from 'joi-browser';
import Form from './common/form';
import Input from './common/input';


class LoginForm extends Form {
    //Use createRefs to create React element way not recommand to use oftenly.
    // username = React.createRef();
    //ComponentDidMount is a Life hook
    // componentDidMount(){
    //     this.username.current.focus();
    // }
    //
    state = {
        data:{username:'',password:''},
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

    //validate will validate the hole form. We encapsulate it to a extract form component.
    // validate =()=>{
    //     //cause the abortEarly will make the Joi cannot get both message of username and password.So to set abortEarly to false will aviod that.
    //     const options = { abortEarly:false};
    //     //we use object constructure to replace result to {error} means const {error}=result.
    //     const {error} = Joi.validate(this.state.data,this.schema,options);
    //     // console.log(result);
    //     if(!error) return null;

    //     const errors = {};
    //     for(let item of error.details)
    //         errors[item.path[0]] = item.message;
    //     return errors;
    //     //After rerange validate we abandon the below:
    //     // const errors ={};
    //     // const{ data } = this.state;
    //     // //.trim means cut the whitespace of data.username.
    //     // if(data.username.trim()==='')
    //     //     errors.username ='Username is required';
    //     // if(data.password.trim()==='')
    //     //     errors.password ='Password is required';
    //     // return Object.keys(errors).length === 0 ? null:errors;
    // };

    // We encapsulate it to a extract form component.
    // handleSubmit = e =>{
    //     //This can stop default behavior of this event
    //     e.preventDefault();
    //     //The errors for validate of input.
    //     const errors = this.validate();
    //     // 
    //     this.setState({ errors:errors || {} });
    //     if(errors)return;

    //     this.doSubmit();
    // };

    doSubmit=()=>{
        //Here will call the server, rederecit the user to a different page. Its a part of refs
        // const username = this.username.current.value;
        console.log('submitted')
        //if errors is return means it is null, the handleSubmit return it to the sever and console.log('submitted')

    }

    //validatieProperty will just validate input. we encapsulate it to a extract form component.
    // //{name,value} instead of input, means {name,value}=input, means input.name and input.value.
    // validateProperty = ({name,value}) => {
    //     const obj ={ [name]: value };
    //     //cause we dont want to make a hold validate so we make a new local schema.
    //     const schema = {[name]:this.schema[name]}
    //     const {error} = Joi.validate(obj,schema);
    //     return error? error.details[0].message : null;
    //     //you also can write the last row like this:
    //     // if(!result.error) return null;
    //     // return result.error.details[0].message;


        //Here are the second way to write the validateProperty method:
        // //.trim means cut the whitespace of data.username.
        // if (name === 'username'){
        //     if(value.trim()==='') return 'Username is required.';
        // }
        // if (name === 'password'){
        //     if(value.trim()==='') return 'Password is required.';
        // }
    // };


    //We encapsulate it to a extract form component.
    //Cause we want to make the code more simple. So we destructure the e.currentTarget to input.
    // handleChange = ({currentTarget:input}) =>{
    //     const errors = {...this.state.errors};
    //     const errorMessage = this.validateProperty(input);
    //     if(errorMessage) errors[input.name] = errorMessage;
    //     else delete errors[input.name];

    //     const data = {...this.state.data};
    //     //we use the braclet [e.currenTarget.name] to make .username dynamic.
    //     data[input.name] = input.value;
    //     this.setState({ data, errors });
    // };
    render() { 
        const {data,errors} = this.state;
        return ( 
            <div>
                 <h1>Login</h1>
                 <form onSubmit={this.handleSubmit}>
                    <Input 
                        name="username"
                        value={data.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />               
                    <Input 
                        name="password"
                        value={data.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password} 
                    />
                    <button
                        //when this.validate() result is null, null means Username and Password all work welll no error, and the null equal to false so the disable will be not working. And vice versa. 
                        disabled={this.validate()} 
                        className="btn btn-primary">Login</button>
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
    value={data.username}
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
    value={data.password}
    onChange={this.handleChange}
    name="password"
    id="password" 
    type="text" 
    className="form-control"
/>
</div> */}