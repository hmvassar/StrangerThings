import { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
const URL = "https://strangers-things.herokuapp.com/api/2303-ftb-mt-web-pt";


const EditPost = () => {
  const { token, posts } = useOutletContext();
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [deliverable, setDeliverable] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            location: location,
            willDeliver: deliverable,
          },
        }),
      });
      const result = await response.json();
      console.log(result.data.post);
    
      navigate("/home")
    } catch (error) {
      console.error(error);
      alert("Post edit failed, please try again");
    }
  };

 

  return (
    <div>
      {posts.length &&
        posts.map((post) => {
          if (post._id === id) {
            return (
              <div key={post._id}>
                <h3 className="text-center text-2xl mb-6 mt-6">
                  Editing post:{" "}
                  <button
                    className="underline"
                    onClick={() => {
                      setTitle(post.title);
                    }}
                  >
                    {post.title}
                  </button>
                </h3>
                <div className="text-center">*Click on underlined areas to keep original values*
                  <p className="mt-5">
                    Use original price:{" "}
                    <button
                      className="underline"
                      onClick={() => {
                        setPrice(post.price);
                      }}
                    >
                      ({post.price})
                    </button>
                  </p>
                  <p>
                    Use original price:{" "}
                    <button
                      className="underline"
                      onClick={() => {
                        setLocation(post.location);
                      }}
                    >
                      ({post.location})
                    </button>
                  </p>
                  <p>
                    Use original description:{" "}
                    <button
                      className="underline"
                      onClick={() => {
                        setDescription(post.description);
                      }}
                    >
                      ({post.description})
                    </button>
                  </p>
                </div>
                <form className="flex-col text-center" onSubmit={handleSubmit}>
                  <div className="mt-5">
                    <label htmlFor="title">Title:</label>
                    <input
                      className="border-black border-2 text-black"
                      required
                      type="text"
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                      placeholder={post.title}
                    ></input>
                    <label htmlFor="price">Price:</label>
                    <input
                      className="border-black border-2 text-black"
                      required
                      type="text"
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      placeholder={post.price}
                    ></input>
                  </div>
                  <div className="">
                    <label htmlFor="location">Location:</label>
                    <input
                      className="border-black border-2 text-black mt-5 mr-2"
                      type="text"
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                      placeholder={post.location}
                    ></input>
                    <label htmlFor="delivery">Are you able to deliver?</label>
                    <input
                      className="border-black border-2 text-black"
                      type="checkbox"
                      value={deliverable}
                      onChange={() => {
                        setDeliverable(!deliverable);
                      }}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="description">Description:</label>
                    <input
                      className="border-black border-2 text-black w-2/4 mt-5"
                      required
                      type="text"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      placeholder={post.description}
                    ></input>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="border-black border-4 mt-5 mb-5 mr-5"
                    >
                      Update Post
                    </button>
                  </div>
                </form>
              </div>
            );
          }
        })}
    </div>
  );
};

export default EditPost;