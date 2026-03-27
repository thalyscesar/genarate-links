import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { LoginSchema } from "./schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/label";

type SchemaType = z.infer<typeof LoginSchema>;

const defaultValues: SchemaType = {
  email: "",
  password: "",
};

export function Login() {
  const navigate = useNavigate();

  const methods = useForm<SchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit, register } = methods;

  const onSubmit = handleSubmit(async (data: SchemaType) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("Login realizado com sucesso");
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form className="w-full max-w-xs flex flex-col px-2" onSubmit={onSubmit}>
        <Label displayName="Email" />
        <Input placeholder="Digite o seu email" {...register("email")} />
        {methods.formState.errors.email && (
          <span className="text-red-500">
            {methods.formState.errors.email.message}
          </span>
        )}
        <Label displayName="Senha" />
        <Input
          placeholder="Digite a sua senha"
          {...register("password")}
          type="password"
        />
        {methods.formState.errors.password && (
          <span className="text-red-500">
            {methods.formState.errors.password.message}
          </span>
        )}

        <button
          type="submit"
          className="h-9 mt-3 bg-blue-600 border-0 text-white py-2 rounded-md font-medium"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
