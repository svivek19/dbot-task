import React, { useEffect, useState } from "react";
import { createEmployee } from "../services/employeeService";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../services/employeeService";

const initialState = {
  name: "",
  email: "",
  phone: "",
  bankAccount: "",
  salary: {
    basic: "",
    hra: "",
    pf: "",
    deductions: "",
    netSalary: "",
  },
};

const AddEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);

  const calculateNetSalary = (salary) => {
    const basic = parseFloat(salary.basic) || 0;
    const hra = parseFloat(salary.hra) || 0;
    const pf = parseFloat(salary.pf) || 0;
    const deductions = parseFloat(salary.deductions) || 0;
    return basic + hra - (pf + deductions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["basic", "hra", "pf", "deductions"].includes(name)) {
      setForm((prev) => {
        const updatedSalary = {
          ...prev.salary,
          [name]: value,
        };
        const netSalary = calculateNetSalary(updatedSalary);
        return {
          ...prev,
          salary: {
            ...updatedSalary,
            netSalary: netSalary ? netSalary.toFixed(2) : "",
          },
        };
      });
    } else if (name === "netSalary") {
      setForm((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          netSalary: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(form);
      toast.success("Employee added successfully!");
      setForm(initialState);
    } catch (error) {
      toast.error("Failed to add employee.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    const getEmployee = async () => {
      try {
        const res = await getEmployeeById(id);
        setForm(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployee();
  }, [id]);

  return (
    <div className="flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl space-y-6 border border-gray-200"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (id) {
              await import("../services/employeeService").then(
                ({ updateEmployee }) => updateEmployee(id, form)
              );
              toast.success("Employee updated successfully!");
              navigate("/employees");
            } else {
              await createEmployee(form);
              toast.success("Employee added successfully!");
              navigate("/employees");
              setForm(initialState);
            }
          } catch (error) {
            toast.error(
              id ? "Failed to update employee." : "Failed to add employee."
            );
            console.error(error);
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Phone
            </label>
            <input
              type="number"
              inputMode="numeric"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Bank Account
            </label>
            <input
              type="text"
              name="bankAccount"
              value={form.bankAccount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
              required
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">
            Salary Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Basic
              </label>
              <input
                type="number"
                name="basic"
                value={form.salary.basic}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                HRA
              </label>
              <input
                type="number"
                name="hra"
                value={form.salary.hra}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                PF
              </label>
              <input
                type="number"
                name="pf"
                value={form.salary.pf}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={form.salary.deductions}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Net Salary
              </label>
              <input
                type="number"
                name="netSalary"
                value={form.salary.netSalary}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                readOnly
                disabled
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition outline-none"
        >
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
