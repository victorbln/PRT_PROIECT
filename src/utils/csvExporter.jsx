export const exportToCsv = (filename, rows, headers = ["Extracted Data"]) => {
  const escapedRows = rows.map((row) => `"${row.replace(/"/g, '""')}"`);
  
  const csvContent = [headers.join(","), ...escapedRows].join("\n");
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
