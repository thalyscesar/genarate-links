import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-lg italic mb-6">
        Você está tentando acessar uma página que não existe.
      </p>
      <Link className="bg-gray-600 rounded-md min-h-10 px-4 py-2" to="/">
        Voltar para home
      </Link>
    </div>
  );
}
