import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HomePage = () => {

  const { token, logout } = useContext(AuthContext);

  const [activeUser, setActiveUser] = useState({})

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('user', user);
    setActiveUser(JSON.parse(user!));
  }, [token])
  console.log('token')
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    logout()
    navigate('/');
  }


  const getFullname = (user: any) => {
    return `${user?.firstName ? user?.firstName : 'Logged'} ${user?.lastName ? user?.lastName : 'User'}`
  }

  return (
    <section className="">
      <div className="flex justify-center align-middle items-center text-lg font-extrabold mt-20">Welcome {getFullname(activeUser)}</div>
      <p className="flex justify-center cursor-pointer pt-5 font-bold text-red-500 hover:text-red-600" onClick={handleLogout}>Logout</p>
    </section>
  )
}

export default HomePage;