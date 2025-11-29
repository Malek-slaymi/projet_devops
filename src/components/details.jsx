function Details({ champion }) {
  const { qualif, age, isActif } = champion;

  return (
    <ul className="list-group">
      <li className="list-group-item"><strong>{qualif}</strong></li>
      <li className="list-group-item">Âge : {age}</li>
      <li className="list-group-item">Encore actif : {isActif ? "Oui" : "Non"}</li>
      <li className="list-group-item">
        <button className="btn btn-primary w-100">Biographie</button>
      </li>
      <li className="list-group-item">
        <button className="btn btn-info w-100">Carrière professionnelle</button>
      </li>
    </ul>
  );
}

export default Details;
