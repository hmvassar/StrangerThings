import { useState } from "react";


const URL = "https://strangers-things.herokuapp.com/api/2303-ftb-mt-web-pt";

// eslint-disable-next-line react/prop-types
const CreatePostForm = ({ token, setDisplayForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("$");
  const [location, setLocation] = useState("On Request");
  const [deliverable, setDeliverable] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/posts`, {
        method: "POST",
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
      setTitle("");
      setDescription("");
      setPrice("$");
      setLocation("On Request");
      setDeliverable(false);
    } catch (error) {
      console.error(error);
      alert("Post creation failed, please try again");
    } finally {
      setDisplayForm(false);
    }
  };

  return (
    <form className="flex-col text-center" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          className="border-black border-2 text-black"
          required
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
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
        ></input>
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          className="border-black border-2 text-black mt-5 mr-2"
          type="text"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        ></input>
        <label htmlFor="delivery">Deliverable?</label>
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
        ></input>
      </div>
      <div>
        <button type="submit" className="border-black border-4 mt-5 mb-5 mr-5">
          Create Post
        </button>
        <button
          onClick={() => {
            setDisplayForm(false);
          }}
          className="text-red-500 border-red-500 border-2"
        >
          Cancel Post
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;