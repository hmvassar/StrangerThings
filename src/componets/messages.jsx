import{ useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
const URL = "https://strangers-things.herokuapp.com/api/2303-ftb-mt-web-pt";

const Messages = () => {
  const { token, user } = useOutletContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, [getMessages, token]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMessages = async () => {
    try {
      const response = await fetch(`${URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result.data);
      setMessages(result.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex m-5 text-3xl">Inbox:
        {messages.length &&
          messages.map((message) => {
            if (message.fromUser.username !== user) {
              return (
                <div
                  key={message._id}
                  className="mt-8 border-blue-700 border-2 text-xl p-1 mr-4"
                >
                  <div className="m-1">
                    <p className="text-center">
                      Message from {message.fromUser.username}!
                    </p>
                    <p>In regards to listing: {message.post.title}</p>
                    <p> -{message.content}</p>
                    <div className="text-center">
                      <button
                        className="border-green-700 border-2"
                        onClick={() => {
                          alert("doesn't work yet");
                        }}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div className="flex m-5 text-3xl mt-20">Outbox:
        {messages.length &&
          messages.map((message) => {
            if (message.fromUser.username === user) {
              return (
                <div
                  key={message._id}
                  className="mt-8 border-blue-700 border-2 text-xl p-1 mr-4"
                >
                  <div className="m-1">
                    <p className="text-center">
                      Sent to {message.post.author.username}
                    </p>
                    <p>In regards to listing: {message.post.title}</p>
                    <p> -{message.content}</p>
                    
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default Messages;