import React, { useEffect, useState } from "react";
import useAuth from "../../context/useAuth";
import { api } from "../../service/api";

interface Movimiento {
  id: number;
  monto: number;
  fecha: string;
  tipomovimiento: {
    tipo: string;
  };
  movimientos: {
    nombre: string;
  };
}

const Transactions: React.FC = () => {
  const [datos, setDatos] = useState<Movimiento[]>([]);
  const [datosFiltrados, setDatosFiltrados] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  // Paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  
  // Filtros
  const [filtroTipo, setFiltroTipo] = useState<string>("Todos");
  const [ordenamiento, setOrdenamiento] = useState<string>("fecha-desc");

  const { eventos, id } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/movimientos/user/${id}`);
        setDatos(res.data.data);
        setDatosFiltrados(res.data.data);
      } catch (err) {
        setError("Error al cargar las transacciones");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [eventos, id]);

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let resultado = [...datos];

    // Filtrar por tipo
    if (filtroTipo !== "Todos") {
      resultado = resultado.filter(
        (mov) => mov.tipomovimiento.tipo === filtroTipo
      );
    }

    // Ordenar
    switch (ordenamiento) {
      case "fecha-desc":
        resultado.sort(
          (a, b) =>
            new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        break;
      case "fecha-asc":
        resultado.sort(
          (a, b) =>
            new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        );
        break;
      case "monto-desc":
        resultado.sort((a, b) => b.monto - a.monto);
        break;
      case "monto-asc":
        resultado.sort((a, b) => a.monto - b.monto);
        break;
    }

    setDatosFiltrados(resultado);
    setCurrentPage(1); // Resetear a la primera página al filtrar
  }, [datos, filtroTipo, ordenamiento]);

  // Calcular datos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(datosFiltrados.length / itemsPerPage);

  // Manejar cambio de items por página
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Resetear a la primera página
  };

  if (loading) {
    return (
      <div className="mt-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          Historial de Transacciones
        </h2>
        
        
      </div>

      {/* Filtros y controles */}
      {datos.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Ingreso">Ingresos</option>
            <option value="Egreso">Egresos</option>
          </select>

          <select
            value={ordenamiento}
            onChange={(e) => setOrdenamiento(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="fecha-desc">Más reciente</option>
            <option value="fecha-asc">Más antiguo</option>
            <option value="monto-desc">Mayor monto</option>
            <option value="monto-asc">Menor monto</option>
          </select>

          {/* Selector de items por página */}
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
              Mostrar:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={datosFiltrados.length}>Todos</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 flex items-center ml-auto">
            Mostrando {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, datosFiltrados.length)} de{" "}
            {datosFiltrados.length}
          </div>
        </div>
      )}

      {/* Lista de transacciones */}
      <div className="space-y-3">
        {currentItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500">No hay movimientos registrados</p>
          </div>
        ) : (
          currentItems.map((val) => (
            <div
              key={val.id}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold text-lg">
                    {val.movimientos.nombre}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        val.tipomovimiento.tipo === "Ingreso"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {val.tipomovimiento.tipo}
                    </span>
                    <p className="text-gray-600 text-sm">
                      {new Date(val.fecha).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-2xl font-bold ${
                      val.tipomovimiento.tipo === "Ingreso"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {val.tipomovimiento.tipo === "Ingreso" ? "+" : "-"}$
                    {val.monto.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          {/* Info de página actual */}
          <div className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </div>

          {/* Controles de paginación */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              title="Primera página"
            >
              «
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Anterior
            </button>

            {/* Números de página - mostrar solo algunos */}
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Siguiente
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              title="Última página"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;