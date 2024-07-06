import Navbar from "../components/Navbar";
import SearchHeader from "../components/SearchHeader";
import LatestArticles from "../components/LatestArticles";
import CategoryList from "../components/CategoryList";
import AllArticles from "../components/AllArticles";

const Home = () => {
  return (
    <>
      <Navbar />
      <SearchHeader />
      <LatestArticles />
      <CategoryList />
      <AllArticles />
    </>
  )
}

export default Home;