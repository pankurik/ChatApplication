import './App.css';
import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function App() {
return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
  const [blockedUser, setBlockedUser] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  async function handleBlockUser() {
    setSuccessMessage('');

    if (userName === blockedUser) {
      setErrorMessage("You can't block yourself.");
      return;
    }

    if (blockedUser === '') {
      setErrorMessage("You must enter a user to block.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // fresh error message each time

    const body = {
      blocker: userName,
      blocked: blockedUser,
    };
    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        auth: cookies.get('auth'), // utility to retrieve cookie from cookies
      }
    };
    const result = await fetch('/blockUser', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
    if (apiRes.status) {
      // worked
      setBlockedUser('');
      setSuccessMessage('You blocked user');
    } else {
      setErrorMessage(apiRes.message);
    }
    setIsLoading(false);
  };

  async function handleUnblockUser() {
    setSuccessMessage('');

    if (userName === blockedUser) {
      setErrorMessage("You can't unblock yourself.");
      return;
    }

    if (blockedUser === '') {
      setErrorMessage("You must enter a user to unblock.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // fresh error message each time

    const body = {
      blocker: userName,
      blocked: blockedUser,
    };
    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        auth: cookies.get('auth'), // utility to retrieve cookie from cookies
      }
    };
    const result = await fetch('/unblockUser', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
    if (apiRes.status) {
      // worked
      setBlockedUser('');
      setSuccessMessage('You unblocked user');
    } else {
      setErrorMessage(apiRes.message);
    }
    setIsLoading(false);
  };

  async function isUserBlocked(blocker, blocked) {
    const body = {
      blocker: blocker,
      blocked: blocked,
    };
    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        auth: cookies.get('auth'), // utility to retrieve cookie from cookies
      }
    };
    const result = await fetch('/isBlocked', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
     // Convert the message to a boolean value
    return apiRes.message != null && apiRes.message === "true"; // return true if blocked, false otherwise
  }

  function Conversation({ conversation }) {
    return (
        <div className="conversation">
          <h2 className="conversationId">Conversation ID: {conversation.conversationId}</h2>
          <div className="userName">User Name: {conversation.userName}</div>
        </div>
    );
  }
  if (isLoggedIn) {
    return (
      <div className="App">
        <h1>Welcome {userName}</h1>
        <div>
          To: <input value={toId} onChange={e => setToId(e.target.value)} />
        </div>
        <div>
          Block: <input value={blockedUser} onChange={e => setBlockedUser(e.target.value)} />
          <button onClick={handleBlockUser}>Block User</button>
          <button onClick={handleUnblockUser}>Unblock User</button>
        </div>
        <textarea value={message} onChange={e => setMessage(e.target.value)} />
        <div>
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
        <div className="errorMessage">{errorMessage}</div>
        <div className="successMessage">{successMessage}</div>
        <div className="conversations">
          {
            conversations.map(conversation => <Conversation conversation={conversation} />)
          }
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <input value={userName} onChange={e => setUserName(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button onClick={handleSubmit} disabled={isLoading}>Register</button>
      <button onClick={handleLogIn} disabled={isLoading}>Log in</button>
      <div>
        {isLoading ? 'Loading ...' : null}
      </div>
      <div className="errorMessage">{errorMessage}</div>
      <div className="successMessage">{successMessage}</div>
    </div>
  );
}

export default App;