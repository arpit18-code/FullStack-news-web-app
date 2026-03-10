import { Navbar } from "../Components/Navbar/navbar";
import { Footer } from "../Components/Footer/footer";
import { Heading } from "../Components/Heading/heading";
import NewsParent from "../Components/NewsParent/newsParent";
import { PaginationButton } from "../Components/PaginationButton/button";

const Home = () => {
  return (
    <>
      <div className="min-h-screen select-none flex flex-col">
        <Navbar />
        <Heading />
        <NewsParent />
        <PaginationButton />
        <Footer />
      </div>
    </>
  );
};

export default Home;
