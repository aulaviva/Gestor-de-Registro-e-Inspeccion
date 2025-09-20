
import { Registration } from '../types';

declare const jspdf: any;

const convertToCSV = (data: Registration[]): string => {
  const headers = ['ID', 'Nombre', 'Mes', 'Año', 'Importe', 'Categoría'];
  const rows = data.map(item =>
    [item.id, item.name, item.month, item.year, item.amount, item.category].join(',')
  );
  return [headers.join(','), ...rows].join('\n');
};

export const exportToCSV = (data: Registration[], filename: string): void => {
  if (data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }
  const csvString = convertToCSV(data);
  const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data: Registration[], filename: string): void => {
  if (data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  doc.text('Registros de Inspección', 14, 16);
  
  doc.autoTable({
    startY: 22,
    head: [['Nombre', 'Mes', 'Año', 'Importe', 'Categoría']],
    body: data.map(item => [
      item.name,
      item.month,
      item.year,
      `$${item.amount.toFixed(2)}`,
      item.category
    ]),
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
  });

  doc.save(`${filename}.pdf`);
};
