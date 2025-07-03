import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { confirmDialog } from "../components/ConfirmToast";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleDelete = async (id) => {
    confirmDialog("Delete this employee?", async () => {
      const deletePromise = deleteEmployee(id);
      toast.promise(deletePromise, {
        loading: "Deleting...",
        success: "Employee deleted!",
        error: "Failed to delete employee",
      });

      try {
        await deletePromise;
        load();
      } catch {}
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg md:text-xl font-semibold">Employees</h1>

      {employees.length === 0 ? (
        <div className="text-center text-red-500 py-8">No employees found.</div>
      ) : (
        <div className="rounded-lg shadow ring-1 ring-gray-200 overflow-x-auto">
          <table className="w-full text-xs md:text-sm bg-white ">
            <thead>
              <tr className="bg-slate-100 text-left sticky top-0">
                <th className="p-2 md:px-4">Name</th>
                <th className="p-2 md:px-4">Email</th>
                <th className="p-2 md:px-4">Phone</th>
                <th className="p-2 md:px-4 hidden md:table-cell">
                  Bank&nbsp;Account
                </th>
                <th className="p-2 md:px-4">Basic</th>
                <th className="p-2 md:px-4 hidden md:table-cell">HRA (%)</th>
                <th className="p-2 md:px-4 hidden md:table-cell">PF</th>
                <th className="p-2 md:px-4 hidden md:table-cell">Deductions</th>
                <th className="p-2 md:px-4 text-right">Net (₹)</th>
                <th className="p-2 md:px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-t hover:bg-slate-50 transition-colors"
                >
                  <td className="p-2 md:px-4">{emp.name}</td>
                  <td className="p-2 md:px-4">{emp.email}</td>
                  <td className="p-2 md:px-4">{emp.phone}</td>
                  <td className="p-2 md:px-4 hidden md:table-cell">
                    {emp.bankAccount}
                  </td>
                  <td className="p-2 md:px-4">{emp.salary?.basic}</td>
                  <td className="p-2 md:px-4 hidden md:table-cell">
                    {emp.salary?.hra}
                  </td>
                  <td className="p-2 md:px-4 hidden md:table-cell">
                    {emp.salary?.pf}
                  </td>
                  <td className="p-2 md:px-4 hidden md:table-cell">
                    {emp.salary?.deductions}
                  </td>
                  <td className="p-2 md:px-4 text-right">
                    {emp.salary?.netSalary}
                  </td>
                  <td className="p-2 md:px-4 text-center">
                    {/* stack buttons horizontally, shrink on mobile */}
                    <div className="flex items-center justify-center gap-1 md:gap-2">
                      <Link
                        to={`/employees/edit/${emp._id}`}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded
                                   text-white bg-amber-500 hover:bg-amber-600
                                   text-[10px] md:text-xs"
                      >
                        <Pencil className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded
                                   text-white bg-red-600 hover:bg-red-700
                                   text-[10px] md:text-xs"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Del</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
