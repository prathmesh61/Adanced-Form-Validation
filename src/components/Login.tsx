import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMyContext } from "../context/myContext";
import { useNavigate } from "react-router-dom";

type FormState = {
  email: string;
  password: string;
};
const API_URL = "http://localhost:8081";
const Login = () => {
  const { setContextData } = useMyContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { isLoading, errors },
    handleSubmit,
  } = useForm<FormState>();
  const onSubmit: SubmitHandler<FormState> = async (data) => {
    try {
      const { data: loginInfo } = await axios.post(
        `${API_URL}/api/login`,
        { ...data },
        {
          withCredentials: true,
        }
      );
      console.log(loginInfo);
      setContextData(loginInfo);
      navigate("/");
    } catch (error) {
      console.log(error, "Login Function error.");
    }
  };
  return (
    <div className="bg-white/80 w-screen h-screen flex justify-center items-center flex-col">
      <div className="flex flex-col items-center mb-5">
        <h1 className="font-extrabold text-2xl">Login</h1>
        <p className="font-medium text-base text-black/60">
          Nice to meet you! Enter your details to Login.
        </p>
      </div>
      <form
        className="flex flex-col items-start w-[400px] mt-5 gap-y-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="font-bold text-base flex flex-col w-full text-black/60">
          Your email
          <input
            type="email"
            placeholder="Enter your email.."
            {...register("email", { required: "email must required" })}
            className="border-2  rounded-lg p-2 placeholder:text-sm placeholder:text-black/20 shadow-md"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email?.message}</p>
          )}
        </label>
        <label className="font-bold text-base flex flex-col w-full text-black/60">
          password
          <input
            type="password"
            placeholder="Enter your password.."
            {...register("password", {
              required: "password must required",
            })}
            className="border-2  rounded-lg p-2 placeholder:text-sm placeholder:text-black/20 shadow-md"
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password?.message}</p>
          )}
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 text-white shadow-md p-2"
          disabled={isLoading}
        >
          {isLoading ? "Loding..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
