import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Input from "../components/Input";
import { LogInContex } from "../App";
import Button from "../components/Button";
import LogMessage from "../components/LogMessage";

function LogInPage() {
  const { logIn, setLogIn } = useContext(LogInContex);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoding(true);

    try {
      const response = await fetch(
        "https://api-car-oo9a.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
        throw new Error("Log in failed");
      }
      setLogIn(true);

      // Store  jwt token in cookies
      const { token } = await response.json();
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp
        ? new Date(decodedToken.exp * 1000)
        : undefined;
      Cookies.set("jwt_autorization", token, {
        expires: expirationTime,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoding(false);
    }
  }

  function logOut() {
    Cookies.remove("jwt_autorization");
    setLogIn(false);
    setEmail("");
    setPassword("");
  }

  if (logIn) {
    return (
      <LogMessage>
        <Button onClick={logOut}>Log out</Button>
      </LogMessage>
    );
  }

  return (
    <div className=" grid h-screen place-items-center">
      {isLoding ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className=" mx-auto flex max-w-[500px] flex-col items-center justify-center md:h-auto md:w-auto md:border-2 md:shadow-lg">
            <div className="w-64 md:w-auto">
              <p className=" mb-10 text-center text-xl md:mt-10 md:text-2xl">
                {error ? error : "Please log in to your account!"}
              </p>
            </div>

            <Input
              id="email"
              autoComplete="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              autoComplete="current-password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button>Log In</Button>
            <p className="mt-5 text-xl md:mb-12">
              You don't have an account?
              <span className="text-2xl text-red-700">
                <Link to={"/singup"}>Sing Up</Link>
              </span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default LogInPage;
