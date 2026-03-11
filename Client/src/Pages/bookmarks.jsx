import { Footer } from "../Components/Footer/footer";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Bookmarks } from "../Context/bookmarksContext";
import { FaRegCommentDots } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FirebaseContext } from "../Context/Firebase";

const BookmarksPage = () => {
  let navigate = useNavigate();
  let handleNavigateToHome = () => {
    navigate("/");
  };
  let { BookmarksArray, handleRemoveFromBookmark } = useContext(Bookmarks);
  let { currentUser } = useContext(FirebaseContext);

  return (
    <>
      <div className="min-h-screen bg-gray-950">
        <div className="bg-gradient-to-t from-gray-700 to-gray-900 text-white p-4">
          <MdHome
            className="text-5xl text-white cursor-pointer hover:text-blue-600 block"
            onClick={handleNavigateToHome}
            title="Back to Home"
          />
        </div>

        <h2 className="text-center text-white bg-gray-800 text-2xl p-2">
          {BookmarksArray.length > 0
            ? "Here are your saved articles"
            : "Save your favourite articles here"}
        </h2>

        {currentUser ? null : (
          <button
            className="bg-blue-600 text-white mx-auto p-4 rounded-2xl block my-2 cursor-pointer hover:bg-blue-700"
            onClick={() => navigate("/signin")}
          >
            Sign Up
          </button>
        )}

        <div className="flex flex-wrap justify-evenly h-auto w-full p-6">
          {BookmarksArray.length > 0 &&
            BookmarksArray?.map((article) => {
              let date = new Date(article.publDate);
              return (
                <>
                  <div
                    key={article.article_id}
                    className="relative z-10 h-auto p-4 bg-white text-black border-2 border-black w-90 sm:w-90 lg:w-100 drop-shadow-md flex flex-col gap-3 my-4"
                  >
                    <h3 className="text-center text-black font-semibold text-2xl">
                      {article.title}
                    </h3>
                    <img src={article.image_url} alt="article-image" />
                    <p className="text-right wrap-break-word">
                      By -{" "}
                      {article.creator ? article.creator : "unknown author"}
                    </p>
                    <p className="text-right wrap-break-word">
                      Published on - {date.toString().substring(0, 15)}
                    </p>
                    <p className="font-bold">
                      {article.description
                        ? article.description
                        : "Description is not available right now"}
                    </p>
                    {/* <p>{article.content ? article.content : 'This content is not available right now !'}</p> */}
                    <a
                      href={article.link}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                    >
                      Read full article
                    </a>
                    <div className="flex justify-between">
                      <FaRegCommentDots
                        onClick={() =>
                          navigate("/commentPage", { state: { article } })
                        }
                        className="h-8 w-8 inline-block hover:cursor-pointer"
                        title="Go to comment section"
                      />
                      <MdDeleteOutline
                        onClick={() => handleRemoveFromBookmark(article)}
                        className="h-8 w-8 inline-block hover:cursor-pointer"
                        title="Remove this article"
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>

        {BookmarksArray.length > 0 ? (
          <h2 className="text-center text-white bg-gray-800 text-2xl p-2">
            You can save more articles here
          </h2>
        ) : null}
        <Footer />
      </div>
    </>
  );
};

export default BookmarksPage;
