import { useForm, SubmitHandler } from "react-hook-form";

type FormState = {
  name: string;
  email: string;
  password: string;
  conformPassword: string;
};
const Register: React.FC = () => {
  const {
    register,
    watch,
    formState: { isLoading, errors },
    handleSubmit,
  } = useForm<FormState>();
  const onSubmit: SubmitHandler<FormState> = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-white/80 w-screen h-screen flex justify-center items-center flex-col">
      <div className="flex flex-col items-center mb-5">
        <h1 className="font-extrabold text-2xl">Sign Up</h1>
        <p className="font-medium text-base text-black/60">
          Nice to meet you! Enter your details to register.
        </p>
      </div>
      <form
        className="flex flex-col items-start w-[400px] mt-5 gap-y-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="font-bold text-base flex flex-col w-full text-black/60">
          Your name
          <input
            type="text"
            placeholder="Enter your name.."
            {...register("name", { required: "name must required" })}
            className="border-2  rounded-lg p-2 placeholder:text-sm placeholder:text-black/20 shadow-md"
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name?.message}</p>
          )}
        </label>
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
              minLength: 8,
            })}
            className="border-2  rounded-lg p-2 placeholder:text-sm placeholder:text-black/20 shadow-md"
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password?.message}</p>
          )}
        </label>
        <label className="font-bold text-base flex flex-col w-full text-black/60">
          conform password
          <input
            type="password"
            placeholder="conform password.."
            {...register("conformPassword", {
              required: true,
              minLength: 8,
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="border-2  rounded-lg p-2 placeholder:text-sm placeholder:text-black/20 shadow-md"
          />
          {errors.conformPassword && (
            <p className="text-sm text-red-400">
              {errors.conformPassword?.message}
            </p>
          )}
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 text-white shadow-md p-2"
          disabled={isLoading}
        >
          {isLoading ? "Loding..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
