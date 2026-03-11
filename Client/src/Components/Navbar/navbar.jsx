import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { NewsFeed } from "../../Context/NewsFeed";
import { fetchNewsGlobal } from "../../services/fetchNewsGlobal";
import { FirebaseContext } from "../../Context/Firebase";
import { signOut } from "firebase/auth";
import { SearchContext } from "../../Context/SearchContext";
import { Bookmarks } from "../../Context/bookmarksContext";

export const Navbar = () => {
  let [search, setSearch] = useState("");
  const navigate = useNavigate();
  let { setCategory, setNewsArray, category } = useContext(NewsFeed);
  let { setBookmarksArray } = useContext(Bookmarks);
  let { auth, currentUser, setCurrentUser } = useContext(FirebaseContext);
  let { setSearchType, setSearchResultsPage } = useContext(SearchContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let handleNavigationToSignIn = () => {
    navigate("/signin");
  };
  let handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setBookmarksArray([]);
    } catch (error) {
      console.log(error);
    }
  };
  let handleSearchNews = async (search, setSearch) => {
    let value = search.toLowerCase();
    if (value === "") {
      alert("Please enter a search term");
    } else {
      let data = await fetchNewsGlobal(value);
      setNewsArray(data.results);
      setSearchType(`${value}`);
      setSearchResultsPage(data.nextPage);
      setSearch("");
    }
  };
  let handleSearchOnEnter = async (e) => {
    if (e.key === "Enter") {
      try {
        await handleSearchNews(search, setSearch);
      } catch (error) {}
    }
  };
  let handleChangeCategory = (e) => {
    setCategory(e.target.innerText);
    setSearchType(e.target.innerText);
  };

  return (
    <>
      <div className="bg-gray-800 text-white p-3 flex gap-3 w-full overflow-auto left-0 top-0 sticky select-none z-50 justify-between h-25">
        <div
          onClick={currentUser ? handleSignOut : handleNavigationToSignIn}
          className="hover:cursor-pointer hover:bg-slate-700 p-2 rounded border-b-4 border-gray-800 hover:border-blue-500 w-30"
          style={{ display: currentUser ? "flex-col" : "flex" }}
        >
          {currentUser ? (
            <>
              {" "}
              <p className="text-center font-bold my-auto">{`Hello ${currentUser.displayName}`}</p>{" "}
              <p className="text-center">Log out</p>{" "}
            </>
          ) : (
            <>
              <FaUser className="h-8 w-8 my-auto sm:mx-auto mx-2" />
              <p className="text-center font-bold my-auto">Sign up</p>
            </>
          )}
        </div>

        <div className="my-auto mx-auto hidden lg:block">
          <ul className="flex gap-5 list-none mx-2 p-2 text-Lg font-semibold">
            <li className="categories" onClick={(e) => handleChangeCategory(e)}>
              All
            </li>
            <li className="categories" onClick={(e) => handleChangeCategory(e)}>
              business
            </li>
            <li className="categories" onClick={(e) => handleChangeCategory(e)}>
              entertainment
            </li>
            <li className="categories" onClick={(e) => handleChangeCategory(e)}>
              politics
            </li>
            <li className="categories" onClick={(e) => handleChangeCategory(e)}>
              health
            </li>
            <li
              className="categories active:border-blue-500"
              onClick={(e) => handleChangeCategory(e)}
            >
              top
            </li>
            <li className="categories" onClick={(e) => handleChangeCategory(e)}>
              sports
            </li>
          </ul>
        </div>

        <div className="hidden h-10 my-auto lg:flex">
          <FaSearch
            className="my-auto w-5 h-5 mx-2 hover:cursor-pointer active:scale-95"
            onClick={() => handleSearchNews(search, setSearch)}
          ></FaSearch>
          <input
            type="text"
            placeholder="Search Indian news"
            className="text-gray-300 border-2 border-white p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => handleSearchOnEnter(e, search, setSearch)}
          />
        </div>

        <input type="checkbox" id="menu-toggle" class="hidden peer" />

        <label
          for="menu-toggle"
          class="lg:hidden bg-gray-700 h-12 text-sm p-2 my-auto rounded-lg cursor-pointer font-medium hover:bg-gray-800 text-white inline-flex items-center"
        >
          <i class="fa-solid fa-bars text-md"></i>
        </label>

        <div class="fixed top-0 right-0 w-full h-full flex flex-col border border-gray-200 p-5 gap-6 bg-white z-10 lg:hidden transform translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0">
          <div class="flex justify-between text-[rgb(0,25,89)] text-md items-center border-b border-gray-200 pb-5">
            <a
              class="font-bold text-xl tracking-tighter cursor-pointer text-[#1f1f1f]"
              href="https://fullstacknewswebapp.vercel.app/"
            >
              Rapid News
            </a>

            <label
              for="menu-toggle"
              class="lg:hidden bg-gray-700 border-2 text-sm p-2 rounded-lg cursor-pointer font-medium hover:bg-[rgb(3,39,130)] text-white inline-flex items-center"
            >
              <i class="fa-regular fa-circle-xmark"></i>
            </label>
          </div>

          <div class="flex flex-col px-3 sm:px-6 gap-6 h-full">
            <div class="flex flex-col gap-3 text-lg text-[rgb(0,25,89)]">
              <div className="flex h-10 my-auto">
                <FaSearch
                  className="my-auto w-5 h-5 mx-2 hover:cursor-pointer active:scale-95"
                  onClick={() => handleSearchNews(search, setSearch)}
                ></FaSearch>
                <input
                  type="text"
                  placeholder="Search Indian news"
                  className="lg:text-gray-300 text-gray-900 border-2 border-white p-2 rounded"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={(e) => handleSearchOnEnter(e, search, setSearch)}
                />
              </div>

              <li
                className="categories"
                onClick={(e) => handleChangeCategory(e)}
              >
                All
              </li>
              <li
                className="categories"
                onClick={(e) => handleChangeCategory(e)}
              >
                business
              </li>
              <li
                className="categories"
                onClick={(e) => handleChangeCategory(e)}
              >
                entertainment
              </li>
              <li
                className="categories"
                onClick={(e) => handleChangeCategory(e)}
              >
                politics
              </li>
              <li
                className="categories"
                onClick={(e) => handleChangeCategory(e)}
              >
                health
              </li>
              <li
                className="categories active:border-blue-500"
                onClick={(e) => handleChangeCategory(e)}
              >
                top
              </li>
              <li
                className="categories"
                onClick={(e) => handleChangeCategory(e)}
              >
                sports
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
