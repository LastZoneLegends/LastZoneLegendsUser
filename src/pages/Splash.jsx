import splashImage from "../assets/Splash.png";

export default function Splash() {
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
