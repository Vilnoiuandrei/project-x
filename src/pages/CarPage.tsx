import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import CarList from "../components/CarList";
import Cookies from "js-cookie";
import Search from "../components/Search";
import Loader from "../components/Loader";
import SelectManufacturer from "../components/SelectManufacturer";
import { Navigate } from "react-router-dom";
import { LogInContex } from "../App";
import Sort from "../components/Sort";

async function fetchCars(
  query: string,
  jwtToken: string,
  manufacturer: string,
  sort: string,
) {
  let url = `https://api-car-oo9a.onrender.com/api/v1/cars/`;
  if (manufacturer) {
    url += `?manufacturer=${manufacturer}&`;
  }
  if (query && !manufacturer) {
    url += `?model=${query}&`;
  }
  if (query && manufacturer) {
    url += `model=${query}&`;
  }
  if (sort && !query && !manufacturer) {
    url += `?sort=${sort}`;
  }
  if ((sort && manufacturer) || query) {
    url += `sort=${sort}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
}

function CarPage() {
  const { setLogIn } = useContext(LogInContex);
  const [query, setQuery] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [sort, setSort] = useState("");

  const jwtToken = Cookies.get("jwt_autorization");
  if (!jwtToken) {
    setLogIn(false);
    <Navigate to="/login" />;
    throw new Error("Not log in");
  }

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars(query, jwtToken, manufacturer, sort),
    enabled: true,
    refetchOnWindowFocus: "always",
    staleTime: 60000,
  });
  useEffect(() => {
    refetch();
  }, [query, manufacturer, sort, refetch]);
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

  return (
    <div>
      <Search query={query} setQuery={setQuery}>
        <Sort sort={sort} setSort={setSort} />
        <SelectManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </Search>
      <CarList cars={data.data.cars} />
    </div>
  );
}
export default CarPage;
