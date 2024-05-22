import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

interface CarProps1 {
  _id: number;
  manufacturer: string;
  model: string;
  variant: string;
  year: number;
  imageCover: string;
  price: number;
  topSpeed: number;
  zeroToHundred: number;
  likes: [string];
}
interface CarProps {
  car: CarProps1;
}

function Car({ car }: CarProps) {
  return (
    <li key={car._id} className="relative">
      <Link
        to={`/car/${car._id}`}
        className="flex h-96  w-screen cursor-pointer flex-col  items-center justify-center border-4 border-black bg-black text-white  lg:w-full"
      >
        <img
          className="h-5/6 w-full object-cover"
          src={`/img/${car.imageCover}`}
          alt={`${car.manufacturer}${car.model}poster`}
        />

        <h3 className=" flex justify-center text-2xl md:text-4xl">
          {`${car.manufacturer} ${car.model} ${car.variant} ${car.year}`}
        </h3>

        <LikeButton car={car} />
      </Link>
    </li>
  );
}

export default Car;
