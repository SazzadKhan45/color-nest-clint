import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import MyContainer from "../../Components/MyContainer";
import LoginPage from "../LoginPage/LoginPage";

const HomePage = () => {
  return (
    <div className="py-12">
      <MyContainer>
        <header>
          <HeroSlider />
        </header>
        <main>
          <h2></h2>
        </main>
      </MyContainer>
    </div>
  );
};

export default HomePage;
