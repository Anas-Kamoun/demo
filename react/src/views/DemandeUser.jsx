import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import moment from "moment";

export default function DemnadeUser() {
  const [DCongee, setDCongee] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();
  const navigate = useNavigate();
  const getautdate = (s, a) => {
    const start_autorisation = new Date(s);
    const autorisation = a;
    const [hours, minutes, seconds] = autorisation.split(":");

    const combined_date = start_autorisation;
    combined_date.setHours(combined_date.getHours() + Number(hours));
    combined_date.setMinutes(combined_date.getMinutes() + Number(minutes));
    combined_date.setSeconds(combined_date.getSeconds() + Number(seconds));
    return combined_date;
  };
  useEffect(() => {
    if (user.role == "super_admin") {
      navigate("/dashboard");
    } else {
      getDCongee();
    }
  }, []);

  const onDelete = u => {
    if (!window.confirm("Vous Voulez Annulez cette Demande")) {
      return;
    }
    u.etat = "Annulee";
    axiosClient.put(`dconges/${u.id}`, u).then(() => {
      setNotification("Demnade Congee Annuler !");
      getDCongee();
    });
  };
  const getDCongee = () => {
    setLoading(true);
    axiosClient
      .get(`/dcongeuser/${user.id}`)
      .then(({ data }) => {
        setLoading(false);
        setDCongee(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>Vos demandes de Congé</h1>
            <Link to="/demandeuser/new" className="btn-add">
              Add New
            </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type Congé</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Etat</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {DCongee.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.type}</td>
                  <td>
                    {u.type == "Congee" && u.start_date}
                    {u.type == "autorisation" && u.start_autorisation}
                  </td>
                  <td>
                    {u.type == "Congee" && u.end_date}
                    {u.type == "autorisation" &&
                      moment(
                        getautdate(u.start_autorisation, u.autorisation)
                      ).format("YYYY-MM-DD HH:mm:ss")}
                  </td>

                  <td>{u.etat}</td>
                  <td>
                    &nbsp;
                    {(u.etat === "Accepte") || (u.etat == "En Cours" )&& (
                      <button
                        onClick={ev => onDelete(u)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    )}
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
