import { useState, useContext } from "react";
import Input from "../components/Input";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { LogInContex } from "../App";
import Button from "../components/Button";
import LogMessage from "../components/LogMessage";
import Loader from "../components/Loader";

function Singup() {
  const { logIn, setLogIn } = useContext(LogInContex);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoding(true);

    try {
      const response = await fetch(
        "https://api-car-oo9a.onrender.com/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, passwordConfirm }),
        },
      );

      if (!response.ok) {
        const { error } = await response.json();
        console.log(error);
        setError(error);
        throw new Error("Log in failed");
      }
      setLogIn(true);

      // Handle successful login
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
          <div className=" mx-auto flex max-w-[500px] flex-col items-center justify-center md:h-auto md:w-96 md:border-2 md:shadow-lg">
            <div className="w-64 md:w-80">
              <p className="mb-10 text-center text-xl md:mt-12">
                {error ? error : "Create a new account"}
              </p>
            </div>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              autoComplete="new-password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="confirm-password"
              autoComplete="new-password"
              placeholder="confirm password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button>Sing In</Button>
          </div>
        </form>
      )}
    </div>
  );
}
export default Singup;
