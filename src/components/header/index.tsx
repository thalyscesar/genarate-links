import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="w-full max-w-2xl mt-4 px-1 flex justify-center h-9">
      <nav className="w-full bg-white flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/admin/social">Redes Sociais</Link>
        </div>
        <button onClick={handleLogout}>
          <BiLogOut size={28} color="#db2629" />
        </button>
      </nav>
    </header>
  );
}
