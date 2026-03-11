import { Footer } from "../Components/Footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Context/Firebase";
import {
  addDoc,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const CommentPage = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let { db, auth } = useContext(FirebaseContext);
  let [comment, setComment] = useState("");
  let [commentArray, setCommentArray] = useState([]);
  let article = location.state?.article;
  let articleId = article.article_id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, "Articles", articleId, "Comments");
      const q = query(commentsRef, orderBy("username", "asc"));
      const querySnapshot = await getDocs(q);
      let comments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        comments.push({
          text: data.text,
          username: data.username || "Anonymous",
        });
      });
      setCommentArray(comments);
    };
    fetchComments();
  }, [articleId, db]);

  let handleNavigateToHome = () => {
    navigate("/");
  };

  let addCommentToDatabase = async (commentText, username) => {
    const commentsRef = collection(db, "Articles", articleId, "Comments");
    await addDoc(commentsRef, {
      text: commentText,
      username: username,
    });
  };

  let handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  let handleAddComment = async () => {
    if (!comment.trim()) return;
    const user = auth?.currentUser;
    const username = user?.displayName || user?.email || "Anonymous";
    await addCommentToDatabase(comment, username);
    setCommentArray((prev) => [...prev, { text: comment, username }]);
    setComment("");
  };

  let date = new Date(article.pubDate);

  return (
    <>
      <div className="bg-gradient-to-t from-gray-700 to-gray-900 text-white p-4">
        <MdHome
          className="text-5xl text-white cursor-pointer hover:text-blue-600 block"
          onClick={handleNavigateToHome}
          title="Back to Home"
        />
      </div>

      <div className="bg-gray-800 text-white flex flex-col lg:flex-row justify-center items-center select-none">
        <div className="h-auto p-4 bg-white text-black w-70 sm:w-90 lg:w-100 drop-shadow-md flex flex-col gap-3 my-4 rounded">
          <h3 className="text-center text-black font-semibold text-2xl">
            {article.title}
          </h3>
          <img src={article.image_url} alt="article-image" />
          <p className="text-right wrap-break-word">
            By - {article.creator ? article.creator : "unknown author"}
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
        </div>

        <div className="bg-white my-4 w-70 h-fit sm:w-90 mx-auto lg:mx-5 self-start text-black min-h-80 p-4 rounded flex flex-col flex-wrap">
          <h3 className="text-left font-bold text-1xl">Comment section</h3>
          <div className="flex p-1 gap-2">
            <input
              type="text"
              onChange={handleCommentChange}
              className="border-1 border-black w-1/2 p-1"
              value={comment}
            />
            <button
              onClick={handleAddComment}
              className="bg-black text-center text-white rounded cursor-pointer hover:bg-gray-800 p-1"
            >
              Add comment
            </button>
          </div>
          {commentArray.length > 0 &&
            commentArray.map((comment, idx) => (
              <p key={idx}>
                <span className="font-semibold">{comment.username}:</span>{" "}
                {comment.text}
              </p>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommentPage;
