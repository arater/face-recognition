import React from 'react'

class Register extends React.Component{
  constructor(props){
    super();
    this.state= {
      email: '',
      password: '',
      name: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('https://stormy-fortress-98961.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    }).then(response => response.json()).then(user => {
      if(user){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
    .catch(err => console.log(err , " could not register"))
  }

  render(){
    return(
      <article className="br5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
      <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" for="name">Name</label>
            <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="text" 
              name="name"  
              id="name"
              onChange={(event) => this.onNameChange(event)}
              />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
            <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" 
              name="email-address"  
              id="email-address"
              onChange={(event) => this.onEmailChange(event)}
              />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" for="password">Password</label>
            <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" 
              name="password"  
              id="password"
              onChange={(event) => this.onPasswordChange(event)}
              />
          </div>
        </fieldset>
        <div className="">
          <input 
              onClick={() => this.onSubmitRegister()}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Register" />
        </div>
      </div>
    </main>
    </article>
  );
  }
} 


export default Register;