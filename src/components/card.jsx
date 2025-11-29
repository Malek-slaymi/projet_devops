import React from "react";

function Card({ champion }) {
  return (
    <div className="card" style={{ width: "22rem" }}>
      <img
        src={champion.img}
        className="card-img-top"
        alt={champion.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
    
      <div className="card-body">
        <h4>{champion.name}</h4>

        <div className="border rounded p-3">
          <p>
            <b>{champion.sport}</b>
          </p>
          <p>Âge : {champion.age}</p>
          <p>Encore actif : {champion.active}</p>

          <button className="btn btn-primary w-100 mb-2">Biographie</button>
          <button className="btn btn-info w-100">
            Carrière professionnelle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
