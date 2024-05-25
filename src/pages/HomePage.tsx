import About from "../components/AboutApp";
import Button from "../components/Button";
import Headline from "../components/Headline";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/cars");
  }
  return (
    <div className="h-screen">
      <img
        src="/img/porche911gt3img2.jpg"
        alt="Porche 911 GT3"
        className="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 transform object-cover"
      />

      <div>
        <Headline />
        <About />
        <div className="mt-40 flex justify-center">
          <Button onClick={handleClick}>Explore Cars</Button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
