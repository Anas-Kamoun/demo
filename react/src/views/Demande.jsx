import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import PageviewIcon from "@mui/icons-material/Pageview";

export default function DemnadeUser() {
  const [DCongee, setDCongee] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();
  const [userValue, setUser] = useState({
    name: "",
  });
  const [modal, setModal] = useState(false);
  const toggleModal = (u) => {
      axiosClient
        .get(`/user/`)
        .then(({ data }) => {
          setUser(data.data);
          console.log(data.data);
        })
        .catch(() => {
        });
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    getDCongee();
  }, []);

  const onDelete = (u) => {
    if (!window.confirm("Vous Voulez Annulez cette Demande")) {
      return;
    }
    u.etat = "Annulee";
    axiosClient.put(`dconges/${u.id}`, u).then(() => {
      setNotification("Demnade Congee Annuler !");
      getDCongee();
    });
  };
  const onValidate = (u) => {
    if (!window.confirm("Vous Voulez Validez cette Demande")) {
      return;
    }
    u.etat = "Validee";
    axiosClient.put(`dconges/${u.id}`, u).then(() => {
      setNotification("Demnade Congee Validee !");
      getDCongee();
    });
  };
  const getDCongee = () => {
    setLoading(true);
    axiosClient
      .get(`/dconges`)
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
          alignItems: "center",
        }}
      >
        <h1>Liste des demandes de Congés</h1>
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
              <th>View</th>
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
              {DCongee.map((u) => (
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
                      u.start_autorisation + u.autorisation}
                  </td>
                  <td>{u.etat}</td>
                  <td>
                    <PageviewIcon onClick={(ev) => toggleModal(u)} />
                    {modal && (
                      <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                          <h2>Detail de la demande</h2>
                          &nbsp;
                          <tr>
                            <td><h3>Type de la demande : </h3></td>
                            <td><h4>{u.type}</h4></td>
                            <td><h3>nom : </h3></td>
                            <td><h4>{userValue.name}</h4></td> 
                          </tr>
                          
                          <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    <button onClick={(ev) => onValidate(u)} className="btn-add">
                      Valider
                    </button>
                    &nbsp;
                    <button
                      onClick={(ev) => onDelete(u)}
                      className="btn-delete"
                    >
                      Annuler
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
