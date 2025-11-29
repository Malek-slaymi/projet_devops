import React from "react";
import { info } from "./info";

function ListChampions() {
  return (
    <div className="container mt-4">
      {" "}
      <h2>Liste des Champions Tunisiens</h2>{" "}
      <ul>
        {info.map((c) => (
          <li key={c.id}>
            {c.name} - {c.sport}{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}

export default ListChampions;
