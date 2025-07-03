import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const linkClass = (p) =>
    `px-3 py-1 rounded hover:bg-slate-700 ${
      pathname.startsWith(p) ? "bg-slate-700" : ""
    }`;

  return (
    <nav className="bg-slate-800 text-white py-2 px-4">
      <div className="container mx-auto flex gap-4 items-center py-3">
        <Link to="/employees" className="font-semibold text-lg mr-4">
          SalaryApp
        </Link>
        <Link to="/employees" className={linkClass("/employees")}>
          Employees
        </Link>
        <Link to="/new" className={linkClass("/new")}>
          Add
        </Link>
      </div>
    </nav>
  );
}
