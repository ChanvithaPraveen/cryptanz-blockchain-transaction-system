import React from 'react';
import { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import logo from "../../images/logo1.png";

const Login = ()=>{

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1@gmail.com",
      password: "pass1"
    },
    {
      username: "user2@gmail.com",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {

    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>

        <br /><br /><br /><br />

        <img src={logo} alt="logo" style={{height: 100, marginLeft:"400px"}} />

        <br />

        <div style={{marginLeft:"450px"}} className="input-container">
          <label className='text-xl text-white w-full my-6 flex-center'>Username </label>
          <input type="text" name="uname" required className='mx-5'/>
          <div style={{color:"white"}} className='mx-5'>
            {renderErrorMessage("uname")}
          </div>
        </div>

        <br />

        <div style={{marginLeft:"450px"}} className="input-container">
          <label className='text-xl text-white w-full my-2 content-end'> Password </label>
          <input type="password" name="pass" required className='mx-6'/>
          <div style={{color:"white"}} className='mx-5'>
            {renderErrorMessage("pass")}
          </div>
          
        </div>
        <br />
        <div style={{marginLeft:"450px"}}>
          <button>
            <input className='text-white' type="submit" cursor='pointer' />
          </button>
          
        </div>
      </form>
    </div>
  );
    
    const navigate = useNavigate();
    const [ profile, setProfile ] = useState([]);
    const clientId = '';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        console.log(res); 
        try {
            navigate("/transactions")
        } catch (error) {
            console.log(error)
        }   
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return(
      <div className="min-h-screen gradient-bg-welcome">
        <div className="app">
          <div className="login-form">
            {isSubmitted ? <div>{navigate("/transactions")}</div> : renderForm}           
          </div>
        </div>
        
        <br />

        {profile ? (
            <div style={{marginLeft:"500px"}}>
                <GoogleLogout clientId={clientId} buttonText="Sign in with Google" onLogoutSuccess={logOut} />
            </div>
        ) : (
            <div style={{marginLeft:"500px"}}>
              <GoogleLogin
                style={{color: 'red'}}
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            </div>
        )}
         
      </div>
    )
}

export default Login;
