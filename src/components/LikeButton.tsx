import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface CarProps1 {
  _id: number;
  likes: string[];
}
interface CarProps {
  car: CarProps1;
}

function LikeButton({ car }: CarProps) {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [like, setLike] = useState(false);
  const jwtToken = Cookies.get("jwt_autorization");
  async function addLikes(
    carId: number,
    userId: string,
    jwtToken: string | undefined,
  ) {
    try {
      const res = await fetch(
        `https://api-car-oo9a.onrender.com/api/v1/cars/likes/${carId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const data = await res.json();
      console.log(data, userId, carId);
      return data;
    } catch (err) {
      setError(err);
    }
  }
  async function removeLikes(
    carId: number,
    userId: string,
    jwtToken: string | undefined,
  ) {
    try {
      const res = await fetch(
        `https://api-car-oo9a.onrender.com/api/v1/cars/likes/remove/${carId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ userId }),
        },
      );
      console.log(res);

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      setError(err);
    }
  }
  useEffect(() => {
    if (jwtToken) {
      try {
        const decodedToken: { id: string } = jwtDecode(jwtToken);
        setUserId(decodedToken.id);

        if (car.likes.includes(decodedToken.id)) {
          setLike(true);
        } else {
          setLike(false);
        }
      } catch (err) {
        setError(err);
      }
    } else {
      setError("Please log in again");
    }
  }, [car.likes, jwtToken]);

  function handleLiked(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    if (!like) {
      addLikes(car._id, userId, jwtToken);
      car.likes.length++;
    } else {
      removeLikes(car._id, userId, jwtToken);
      car.likes.length--;
    }
    setLike((c) => !c);
  }
  if (error) {
    console.log(error);
  }

  return (
    <div
      className="absolute  bottom-2 right-2 mb-1 mr-2 flex text-4xl text-red-800 "
      onClick={handleLiked}
    >
      <p className=" mr-2">{car.likes.length}</p>
      {like ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
}

export default LikeButton;
