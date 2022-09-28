import { useEffect, useState } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';

function App() {
    const [user, setUser] = useState({})


  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token" + response.credential) // from the google identity service documentation
    const userObjectDecoded = jwtDecode(response.credential)
    console.log(userObjectDecoded)
    setUser(userObjectDecoded)
    document.getElementById('loginDiv').hidden = true
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    setUser({})
    document.getElementById('loginDiv').hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_CLIENT_ID, 
      callback: handleCallbackResponse
    }); // from the google identity service documentation

    google.accounts.id.renderButton(
      document.getElementById('loginDiv'),
      {theme: "outline", size: "large"}
    )

    // One Tap functionality for signing in user automatically when signup
    google.accounts.id.prompt()
    
  }, [])
  

  return (
    <div className="App">
      <div id="loginDiv"></div>
      {Object.keys(user).length !== 0 && 
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      
      {user && 
        <div>
          <img src={user.picture} alt=""></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
