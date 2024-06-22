import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import ProtectRoute from "./components/ProtectRoute";
import Homepage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import LogInPage from "./pages/LogInPage";
import SingUpPage from "./pages/SignUpPage";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import PageNav from "./components/PageNav";
import CarPage from "./pages/CarPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CarDetailPage from "./pages/CarDetailPage";

export const LogInContex = createContext<{
  logIn: boolean;
  setLogIn: (value: boolean) => void;
}>({ logIn: false, setLogIn: () => {} });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [logIn, setLogIn] = useState<boolean>(true);
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_autorization");
    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        const currentTime = new Date(Date.now() / 1000);
        const expirationTime = decodedToken.exp
          ? new Date(decodedToken.exp * 1000)
          : undefined;

        // Check if token is expired
        if (expirationTime && expirationTime < currentTime) {
          // Token expired
          setLogIn(false);
        } else {
          // Token valid
          setLogIn(true);
        }
      } catch (error) {
        // Token decoding failed
        console.error("Token decoding error:", error);
        setLogIn(false);
      }
    } else {
      setLogIn(false);
    }
  }, []);

  return (
    <LogInContex.Provider value={{ logIn, setLogIn }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div>
            <PageNav />
            <Routes>
              <Route path="/" element={<Homepage />} />

              <Route path="logIn" element={<LogInPage />} />
              <Route path="signUp" element={<SingUpPage />} />
              <Route
                path="cars"
                element={
                  <ProtectRoute>
                    <CarPage />
                  </ProtectRoute>
                }
              />
              <Route
                path="car/:id"
                element={
                  <ProtectRoute>
                    <CarDetailPage />
                  </ProtectRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </LogInContex.Provider>
  );
}

export default App;
