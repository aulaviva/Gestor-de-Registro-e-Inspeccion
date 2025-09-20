
import React from 'react';
import { Registration } from '../types';
import Icon from './Icon';

interface RegistrationTableProps {
  registrations: Registration[];
  onDeleteRegistration: (id: string) => void;
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({ registrations, onDeleteRegistration }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Listado de Registros</h2>
        {registrations.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded-lg">
                <p className="text-slate-500">No hay registros para mostrar.</p>
                <p className="text-slate-400 text-sm mt-2">Agregue uno usando el formulario.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Período</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Categoría</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Importe</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Acciones</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{reg.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{reg.month} {reg.year}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{reg.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-mono">${reg.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                                onClick={() => onDeleteRegistration(reg.id)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-100"
                                aria-label={`Eliminar registro de ${reg.name}`}
                            >
                                <Icon name="delete" className="w-5 h-5"/>
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  );
};

export default RegistrationTable;
