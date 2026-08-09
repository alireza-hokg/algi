import HeroSection from "../components/Home/HeroSearch.jsx";
import ProductList from "../components/Home/ProductList.jsx";

const Home = () => {
    return (
        <>
            <HeroSection />
            <div className="py-10">
                <ProductList />
            </div>
        </>
    )
}
export default Home;