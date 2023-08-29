
import { useOutletContext, Link } from "react-router-dom";


const Profile = () => {
    const { posts, token, setPosts } = useOutletContext();
    return (
      <>
        <h3 className="text-center text-2xl mb-6 mt-6">My Posts:</h3>
        <div className="flex-col-reverse">
          {posts.length &&
            posts.map((post) => {
                if (!post.isAuthor) {
                    return null
                }
              return (
                <div
                  className="m-auto mt-5 border-blue-700 border-2 w-3/4"
                  key={post._id}
                >
                  <div className="m-2">
                    <h1 className="text-xl">
                      {post.title} - {post.price}
                    </h1>
                    <p>Located in: {post.location}</p>
                    {post.willDeliver ? (
                      <p>DELIVERY AVAILABLE</p>
                    ) : (
                      <p>PICKUP REQUIRED</p>
                    )}
                    <p>{post.description}</p>

                    <>
                      <button
                        className="border-red-600 border-2 m-1 mt-2 p-1"
                        onClick={() => {
                          if (
                            confirm("Are you sure you want to delete post?")
                          ) {
                            // eslint-disable-next-line no-undef
                            handleDelete(post._id, token, setPosts);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button className="border-yellow-200 border-2 ml-5 p-1">
                        <Link to={post._id}>Edit</Link>
                      </button>
                    </>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
}

export default Profile