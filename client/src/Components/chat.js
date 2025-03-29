import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Chat = () => {
  const history = useHistory();
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputText, setInputText] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUserMessages = async (selectedUser) => {
    const resp = await axios.get(
      `/getConversation?conversationId=${selectedUser}_${sessionStorage.getItem(
        "username"
      )}`,
      {
        headers: {
          auth: sessionStorage.getItem("auth"),
        },
      }
    );

    let message = "";
    document.getElementById("chat").innerHTML = "";
    if (resp.data.data.length > 0) {
      document.getElementById("chatter").innerHTML =
        resp.data.data[0].fromUsername == sessionStorage.getItem("username")
          ? `Chatting with  ${resp.data.data[0].toUsername}`
          : `Chatting with  ${resp.data.data[0].fromUsername}`;

      resp.data.data.sort((a, b) => a.timestamp - b.timestamp);
    }

    for (let i = 0; i < resp.data.data.length; i++) {
      resp.data.data[i].fromUsername == sessionStorage.getItem("username")
        ? (message += `<li class="you">
        <div class="entete">
            <span class="status green"></span>
            <h2>${sessionStorage.getItem("username")}</h2>
            <h3>${new Date(resp.data.data[i].timestamp).toUTCString()}</h3>
        </div>
        <div class="message" style="float:right">
            ${resp.data.data[i].message}
        </div>
        </li>`)
        : (message += `<li class="me">
        <div class="entete">

           <h2>${
             resp.data.data[i].fromUsername ==
             sessionStorage.getItem("username")
               ? resp.data.data[i].toUsername
               : resp.data.data[i].fromUsername
           }</h2>
           <h3>${new Date(resp.data.data[i].timestamp).toUTCString()}</h3>
           <span class="status blue"></span>
        </div>
        <div class="message">
           ${resp.data.data[i].message}
        </div>
    </li>`);
    }

    document.getElementById("chat").innerHTML = message;
    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    await axios.post(
      "/topic/javainuse",
      {
        fromUsername: sessionStorage.getItem("username"),
        toUsername: selectedUser,
        message: inputText,
        timestamp: new Date().getTime(),
      },
      {
        headers: {
          auth: sessionStorage.getItem("auth"),
        },
      }
    );
    setInputText("");
    fetchUserMessages(selectedUser);
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    fetchUserMessages(user);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const getUsers = async () => {
    const resp = await axios.get("/allUsers", {
      headers: { auth: sessionStorage.getItem("auth") },
    });
    const responseUsers = resp.data.data.map((u) => u.userName);
    const filtered = responseUsers.filter(
      (f) => f && f.toString() !== sessionStorage.getItem("username").toString()
    );
    setUsers(filtered);
  };

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") != "true") {
      history.push("/login");
    }
    getUsers();
  }, []);

  return (
    <Fragment>
      <Container fluid className="mt-4">
        <Row>
          <div id="main-content">
            <div id="container">
              <aside>
                <ul>
                  {users.map((user) => (
                    <li key={user}>
                      <img src="" alt="" />
                      <div>
                        <button
                          className="asideButton"
                          onClick={() => handleUserSelect(user)}
                        >
                          {user}{" "}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
              <main>
                <header>
                  <div>
                    <p style={{ paddingTop: "10px" }} id="chatter">
                      Select user to chat from left panel
                    </p>
                  </div>
                </header>
                <ul id="chat"></ul>

                <footer style={{ marginTop: "0px" }}>
                  <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    style={{ color: "black", border: "1px solid black" }}
                    id="message"
                    placeholder="Type your message"
                  ></textarea>

                  <button className="btn btn-success" onClick={sendMessage}>
                    Send
                  </button>
                </footer>
              </main>
            </div>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Chat;