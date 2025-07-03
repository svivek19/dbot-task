import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportEmployeesToXlsx = (rows) => {
  const data = rows.map((e, i) => ({
    "#": i + 1,
    Name: e.name,
    Email: e.email,
    Phone: e.phone,
    "Bank Account": e.bankAccount,
    Basic: e.salary?.basic,
    HRA: e.salary?.hra,
    PF: e.salary?.pf,
    Deductions: e.salary?.deductions,
    "Net Salary": e.salary?.netSalary,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employees");
  const wbBlob = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  saveAs(
    new Blob([wbBlob], { type: "application/octet-stream" }),
    "employees.xlsx"
  );
};

export const exportEmployeesToPdf = (rows) => {
  const doc = new jsPDF({ orientation: "landscape" });
  const head = [
    [
      "#",
      "Name",
      "Email",
      "Phone",
      "Bank",
      "Basic",
      "HRA",
      "PF",
      "Deductions",
      "Net Salary",
    ],
  ];
  const body = rows.map((e, i) => [
    i + 1,
    e.name,
    e.email,
    e.phone,
    e.bankAccount,
    e.salary?.basic,
    e.salary?.hra,
    e.salary?.pf,
    e.salary?.deductions,
    e.salary?.netSalary,
  ]);

  autoTable(doc, { head, body, startY: 14, styles: { fontSize: 8 } });
  doc.save("employees.pdf");
};
