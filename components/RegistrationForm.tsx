
import React, { useState } from 'react';
import { Registration } from '../types';
import { MONTHS } from '../constants';
import Icon from './Icon';

interface RegistrationFormProps {
  onAddRegistration: (registration: Omit<Registration, 'id'>) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onAddRegistration }) => {
  const [name, setName] = useState('');
  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !month || !year || !amount || !category) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError('El importe debe ser un número positivo.');
        return;
    }

    onAddRegistration({ name, month, year, amount: parsedAmount, category });
    
    // Reset form
    setName('');
    setAmount('');
    setCategory('');
    setError('');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Nuevo Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Contribuyente S.A."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="month" className="block text-sm font-medium text-slate-600 mb-1">Mes</label>
                <select 
                    id="month" 
                    value={month} 
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                >
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="year" className="block text-sm font-medium text-slate-600 mb-1">Año</label>
                <input 
                    type="number" 
                    id="year" 
                    value={year} 
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    placeholder="2024"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                />
            </div>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-1">Importe</label>
          <div className="relative">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000.00"
                step="0.01"
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            />
          </div>
        </div>
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">Categoría</label>
            <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ej: Servicios Profesionales"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 shadow-md">
           <Icon name="add" className="w-5 h-5 mr-2" />
           Agregar Registro
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;