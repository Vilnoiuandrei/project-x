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
      <video
        autoPlay
        loop
        muted
        className="  absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 transform object-cover"
      >
        <source src="/video/bgvideo.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
