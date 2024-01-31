import { useNavigate } from "react-router-dom";
import { useMyContext } from "./context/myContext";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
function App() {
  const { data } = useMyContext();
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.access_token || cookies.access_token === undefined) {
      navigate("/login");
    }
  }, [cookies.access_token]);

  console.log(cookies.access_token);

  return (
    <div className="bg-blue-400 p-4">
      <p>Cookies Auth</p>
      <p className="text-xl fonr-bold"> {data?.email}</p>
      <p> {data?.name}</p>
    </div>
  );
}

export default App;
