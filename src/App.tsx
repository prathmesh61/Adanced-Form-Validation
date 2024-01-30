import { useNavigate } from "react-router-dom";
import { useMyContext } from "./context/myContext";
import { useCookies } from "react-cookie";
function App() {
  const { data } = useMyContext();
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  if (!cookies.access_token) {
    navigate("/login");
  }

  return (
    <div className="bg-blue-400 p-4">
      <p className="text-xl fonr-bold"> {data?.email}</p>
      <p> {data?.name}</p>
    </div>
  );
}

export default App;
