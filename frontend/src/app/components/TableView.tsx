"use client";

import React from "react";

export type TableRow = string | null | undefined;

const TableView: React.FC<{ rows: TableRow[][] }> = ({ rows }) => {
  return (
    <React.Fragment>
      <div
        className="p-8 bg-violet-100 rounded-md m-4 font-mono"
      >
        <table
          className="table-auto border-collapse"
        >
          <tbody>
            {rows.map((row) => {
              return (
                <tr
                  key={row[0]}
                  className="p-4"
                >
                  <td className="px-4 border-r-2 border-emerald-50 uppercase">{row[0]}</td>
                  <td className="px-4">{row[1] ? row[1] : "-"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default TableView;
