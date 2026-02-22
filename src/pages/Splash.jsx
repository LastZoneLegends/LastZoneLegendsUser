import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashImage from "../assets/Splash.png";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login"); // login page ka route
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen">
      <img
        src={splashImage}
        alt="Splash"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
