import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { LogInContex } from "../App";
import { useContext } from "react";

async function fetchCar(jwtToken: string, id: string) {
  const res = await fetch(
    `https://api-car-oo9a.onrender.com/api/v1/cars/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data = await res.json();
  return data;
}

function CarDetailPage() {
  const { setLogIn } = useContext(LogInContex);
  const jwtToken = Cookies.get("jwt_autorization");
  if (!jwtToken) {
    setLogIn(false);
    <Navigate to="/login" />;
    throw new Error("Not log in");
  }
  const { id } = useParams();
  if (!id) {
    throw new Error("No car id");
  }

  const { data, error, isPending } = useQuery({
    queryKey: ["cars", id],
    queryFn: () => fetchCar(jwtToken, id),
    enabled: true,
    refetchOnWindowFocus: "always",
    staleTime: 60000,
  });
  const car = data?.data.car;

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error.message}</p>;
      </div>
    );
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      <div className=" align flex h-12 items-center justify-center bg-red-700 md:h-20">
        <h1 className="text-b    text-center text-2xl font-bold md:text-5xl">{`${car.manufacturer} ${car.model} ${car.variant}`}</h1>
      </div>

      <div className="flex justify-center">
        <div className="max-w-1500px grid  grid-cols-2">
          <img
            className="w-ws col-start-1 col-end-3 row-start-1 border-2"
            src={`/img/${car.imageCover}`}
            alt={`${car.manufacturer}${car.model}poster`}
          />

          {car.images.map((image: string, index: number) => (
            <img
              key={index}
              src={`/img/${image}`}
              alt={`Photo ${index + 1}`}
              className="col-start-1  col-end-3  mt-1 w-full border border-gray-800 shadow-lg lg:col-auto"
            />
          ))}

          <div className="col-start-1 col-end-3 row-start-3 px-4 lg:col-end-2">
            <h2 className=" h-10  border-b border-black text-center text-2xl md:h-14 md:text-4xl lg:text-5xl ">
              Specification
            </h2>
            <ul className="ml-6 list-disc text-2xl md:text-4xl lg:text-5xl">
              <li>{`Manufacturer: ${car.manufacturer}`}</li>
              <li>{`Model: ${car.model}`}</li>
              <li>{`Variant: ${car.variant}`}</li>
              <li>{`Year: ${car.year}`}</li>
              <li>{`Power: ${car.horsePower}hp`}</li>
              <li>{`Top Speed: ${car.topSpeed}kph`}</li>
              <li>{`0-100: ${car.zeroToHundred}s`}</li>
              <li>{`Price: ${car.price}€`}</li>
            </ul>
          </div>

          <div className="col-start-1  col-end-3 row-start-2 mt-2 px-4 lg:col-start-2">
            <h3 className="border-b  border-black text-center text-2xl  md:text-4xl lg:text-5xl">
              Description
            </h3>
            <p className="mt-4 text-2xl md:text-4xl lg:text-5xl">
              {car.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;
