import React, { useState } from "react";
import Card from "./card";
import { info } from "./info";

function Home() {
const [search, setSearch] = useState("");

const filteredChampions = info.filter((c) =>
c.name.toLowerCase().includes(search.toLowerCase())
);

return ( <div className="container mt-4">
<input
type="text"
placeholder="Rechercher un champion..."
className="form-control mb-4"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>

  <div className="row row-cols-1 row-cols-md-3 g-4">
    {filteredChampions.map((champion) => (
      <Card key={champion.id} champion={champion} />
    ))}

    {filteredChampions.length === 0 && (
      <p className="text-center mt-4">Aucun champion trouvé.</p>
    )}
  </div>
</div>

);
}

export default Home;
