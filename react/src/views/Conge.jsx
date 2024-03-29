import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
export default function Conge() {
  const [Conge, setConge] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role != undefined) {
      if (user.role === "user") {
        navigate("/demandeuser");
      } else if (user.role == "admin") {
        navigate("/demande");
      }
    } else {
      getConge();
    }
  }, [user]);

  const onDelete = u => {
    if (!window.confirm("Are you sure you want to delet this Conge ?")) {
      return;
    }
    axiosClient.delete(`conges/${u.id}`).then(() => {
      setNotification("Conge was deleted successfully");
      getConge();
    });
  };

  const getConge = () => {
    setLoading(true);
    axiosClient
      .get("/typeconges")
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setConge(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  if (user.role == undefined) {
    return null;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>Types Congés</h1>
        {user.role == "super_admin" && (
          <Link to="/conge/new" className="btn-add">
            Ajouter
          </Link>
        )}
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Contrat</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Chargement...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {Conge.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>
                    {u.contrat.length > 0 ? (
                      u.contrat.map(c => (
                        <tr key={c.id}>
                          <td>{c.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>Contrat introuvable</td>
                      </tr>
                    )}
                  </td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={"/conge/" + u.id}>
                      Modifier
                    </Link>
                    &nbsp;
                    <button onClick={ev => onDelete(u)} className="btn-delete">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
