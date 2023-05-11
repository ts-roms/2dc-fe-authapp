import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HomePage = () => {

  const { logout } = useContext(AuthContext)

  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
    navigate('/');
  }
  return (
    <section className="">
      <div className="flex justify-center align-middle items-center text-lg font-extrabold mt-20">Welcome User</div>
      <p className="flex justify-center cursor-pointer pt-5 font-bold text-red-500 hover:text-red-600" onClick={handleLogout}>Logout</p>
    </section>
  )
}

export default HomePage;