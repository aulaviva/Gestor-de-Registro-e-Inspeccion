
import React, { useState } from 'react';
import { Registration } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import RegistrationForm from './components/RegistrationForm';
import RegistrationTable from './components/RegistrationTable';
import Icon from './components/Icon';
import { exportToCSV, exportToPDF } from './utils/exportUtils';
import { MONTHS } from './constants';

const App: React.FC = () => {
  const [registrations, setRegistrations] = useLocalStorage<Registration[]>('registrations', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const addRegistration = (registration: Omit<Registration, 'id'>) => {
    const newRegistration: Registration = {
      ...registration,
      id: new Date().getTime().toString(),
    };
    setRegistrations(prev => [newRegistration, ...prev]);
  };

  const deleteRegistration = (id: string) => {
    if(window.confirm('¿Está seguro de que desea eliminar este registro?')) {
        setRegistrations(registrations.filter(reg => reg.id !== id));
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleExportCSV = () => {
    exportToCSV(filteredRegistrations, 'registros-inspeccion');
  };

  const handleExportPDF = () => {
    exportToPDF(filteredRegistrations, 'registros-inspeccion');
  };

  const availableYears = [...new Set(registrations.map(reg => reg.year))].sort((a, b) => b - a);

  const recordsForTotal = filteredRegistrations.filter(reg => {
    const monthMatch = selectedMonth === 'all' || reg.month === selectedMonth;
    const yearMatch = selectedYear === 'all' || reg.year.toString() === selectedYear;
    return monthMatch && yearMatch;
  });

  const totalAmount = recordsForTotal.reduce((sum, reg) => sum + reg.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-slate-900">
                Gestor de Derecho de Registro e Inspección
            </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <RegistrationForm onAddRegistration={addRegistration} />
          </div>
          <div className="lg:col-span-2">
            <div className="mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre o categoría..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                aria-label="Buscar registros"
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Total Recaudado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="totalMonth" className="block text-sm font-medium text-slate-600 mb-1">Mes</label>
                  <select
                    id="totalMonth"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  >
                    <option value="all">Todos</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="totalYear" className="block text-sm font-medium text-slate-600 mb-1">Año</label>
                  <select
                    id="totalYear"
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  >
                    <option value="all">Todos</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-500">Total para la selección</p>
                <p className="text-3xl font-bold text-blue-600 tracking-tight">
                  ${totalAmount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                  <button onClick={handleExportCSV} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
                      <Icon name="excel" className="w-5 h-5 mr-2" />
                      Exportar a Excel (CSV)
                  </button>
                  <button onClick={handleExportPDF} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition">
                      <Icon name="pdf" className="w-5 h-5 mr-2" />
                      Exportar a PDF
                  </button>
              </div>
               <div className="text-sm text-slate-500">
                Mostrando {filteredRegistrations.length} de {registrations.length} registro(s)
              </div>
            </div>
            <RegistrationTable registrations={filteredRegistrations} onDeleteRegistration={deleteRegistration} />
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Gestor de Registros. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
