import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const Heading = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-700 text-white p-3 w-full">
        <h2 className="text-white font-extrabold font-serif text-2xl lg:text-4xl text-center">
          Welcome to Rapid News
        </h2>
        <p className="text-center text-sm lg:text-2xl font-serif">
          Indian News
        </p>
        <p className="text-right font-serif">
          <span
            onClick={() => navigate("/bookmarks")}
            className="p-2 m-2 inline-block rounded-2xl hover:text-blue-500 cursor-pointer"
          >
            <span className="text-sm lg:text-lg">Bookmarks</span>
            <FaRegBookmark className="lg:h-8 lg:w-8 h-4 w-4 hover:cursor-pointer text-right inline-block" />
          </span>
        </p>
      </div>
    </>
  );
};
