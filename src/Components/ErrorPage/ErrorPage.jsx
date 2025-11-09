import { Link } from "react-router";
import errorImg from "../assets/error .png";
import MyContainer from "../MyContainer";

const ErrorPage = () => {
  return (
    <div className="bg-blue-200">
      <MyContainer>
        <div className="flex justify-center items-center flex-col min-h-screen">
          <img src={errorImg} alt="404" />
          <Link to={"/"}>
            <button className="btn btn-secondary my-8  px-6 text-lg">
              Go Home
            </button>
          </Link>
        </div>
      </MyContainer>
    </div>
  );
};

export default ErrorPage;
