import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import MyContainer from "../../Components/MyContainer";
import LoginPage from "../LoginPage/LoginPage";

const HomePage = () => {
  return (
    <div className="py-12">
      <MyContainer>
        <HeroSlider />
      </MyContainer>
    </div>
  );
};

export default HomePage;
