import React, { useEffect, useState } from "react";
import { api } from "../../service/api";
import useAuth from "../../context/useAuth";
import DataTable from "react-data-table-component";
import { DateTime } from "luxon";

interface Investment {
  id: number;
  descripcion: string;
  monto: number;
  fecha: string; // o Date si lo conviertes con Luxon
}

const TableInvestments: React.FC = () => {
  const [userInves, setUserInves] = useState<any[]>([]);
  const { id, eventos } = useAuth();
  useEffect(() => {
    const loadInvestment = async () => {
      const res = await api.get(`/inversiones/${id}`);

      setUserInves(res.data.data);
    };
    loadInvestment();
  }, [eventos]);

  const columns: {
    name: string;
    selector: (row: Investment) => string | number;
    sortable?: boolean;
  }[] = [
    {
      name: "Inversión",
      selector: (row) => row.descripcion,
    },
    {
      name: "Monto",
      selector: (row) => row.monto,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) =>
        DateTime.fromISO(row.fecha, { zone: "utc" }).toFormat("dd/MM/yyyy"),
      sortable: true,
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={userInves}
      pagination
      highlightOnHover
      striped
      responsive
      customStyles={{
        rows: {
          style: {
            minHeight: "56px",
          },
        },
        headCells: {
          style: {
            fontWeight: "bold",
            backgroundColor: "#f0f4f8",
          },
        },
      }}
    />
  );
};

export default TableInvestments;
