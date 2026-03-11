import { Navbar } from "../Components/Navbar/navbar";
import { Footer } from "../Components/Footer/footer";
import { Heading } from "../Components/Heading/heading";
import NewsParent from "../Components/NewsParent/newsParent";
import { PaginationButton } from "../Components/PaginationButton/button";
import { useContext } from "react";
import { NewsFeed } from "../Context/NewsFeed";
import CircularProgress from "@mui/material/CircularProgress";
const Home = () => {
  const { NewsArray } = useContext(NewsFeed);
  return (
    <>
      <div className="min-h-screen select-none flex flex-col">
        <Navbar />
        <Heading />
        {NewsArray.length === 0 ? (
          <div className="flex justify-center align-center bg-gray-600 p-4">
            <CircularProgress color="primary" size={60} />
          </div>
        ) : null}
        <NewsParent />
        {NewsArray.length > 0 && <PaginationButton />}
        <Footer />
      </div>
    </>
  );
};

export default Home;
