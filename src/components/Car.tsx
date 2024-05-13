import { Link } from "react-router-dom";

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
}
interface CarProps {
  car: CarProps1;
}

function Car({ car }: CarProps) {
  return (
    <Link to={`/car/${car._id}`}>
      <li
        className="   flex h-96  w-screen cursor-pointer flex-col  items-center justify-center border-4 border-black bg-black text-white  lg:w-full"
        key={car._id}
      >
        <img
          className="h-5/6 w-full object-cover"
          src={`/img/${car.imageCover}`}
          alt={`${car.manufacturer}${car.model}poster`}
        />
        <h3 className="text-2xl md:text-4xl">{`${car.manufacturer} ${car.model} ${car.variant} ${car.year}`}</h3>
      </li>
    </Link>
  );
}

export default Car;
