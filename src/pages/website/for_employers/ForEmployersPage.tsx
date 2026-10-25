import Navbar from "../components/Navbar";
import EmployerHero from "./components/EmployerHero";

const ForEmployersPage = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto min-h-screen bg-gray-100  p-10">
        <EmployerHero />
      </div>
    </div>
  );
};

export default ForEmployersPage;
