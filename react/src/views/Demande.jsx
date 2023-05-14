import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import PageviewIcon from "@mui/icons-material/Pageview";
import moment from "moment";

export default function DemnadeUser() {
  const [DCongee, setDCongee] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();
  const [userValue, setUser] = useState({});

  const [conges, setConges] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedConge, setSelectedConge] = useState(null);
  const toggleModal = (u) => {
    axiosClient.get(`/users/${u.user_id}`).then(({ data }) => {
      setUser(data.data);
    });
    if (u.conge_id) {
      axiosClient.get(`/conges/${u.conge_id}`).then(({ data }) => {
        setConges(data.data);
        setSelectedConge(u);
        setModal(true);
      });
    } else {
      setModal(true);
      const start_autorisation = new Date(u.start_autorisation);
      const autorisation = u.autorisation;
      const [hours, minutes, seconds] = autorisation.split(":");

      const combined_date = start_autorisation;
      combined_date.setHours(combined_date.getHours() + Number(hours));
      combined_date.setMinutes(combined_date.getMinutes() + Number(minutes));
      combined_date.setSeconds(combined_date.getSeconds() + Number(seconds));

      setSelectedConge({ ...u, combined_date });
    }
  };

  const getautdate = (s, a) => {
    const start_autorisation = new Date(s);
    const autorisation = a;
    const [hours, minutes, seconds] = autorisation.split(":");

    const combined_date = start_autorisation;
    combined_date.setHours(combined_date.getHours() + Number(hours));
    combined_date.setMinutes(combined_date.getMinutes() + Number(minutes));
    combined_date.setSeconds(combined_date.getSeconds() + Number(seconds));
    return(combined_date);
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
                      moment(
                        getautdate(u.start_autorisation, u.autorisation)
                      ).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td>{u.etat}</td>
                  <td>
                    <PageviewIcon onClick={(ev) => toggleModal(u)} />
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
        {modal && selectedConge && (
          <div className="modal">
            <div
              onClick={() => {
                setModal(false);
                setSelectedConge(null);
              }}
              className="overlay"
            ></div>
            <div className="modal-content">
              <h2>Details de la demande</h2>
              &nbsp;
              <div>
                <tr>
                  <td>
                    <h3>
                      Etat : <a className="btn-add">{selectedConge.etat}</a>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>User : {userValue.name}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>Type de la demande : {selectedConge.type}</h3>
                  </td>
                </tr>
                {selectedConge.conge_id && (
                  <tr>
                    <td>
                      <h3>Congee : {conges.name}</h3>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <h3>
                      Start Date :{" "}
                      {selectedConge.conge_id
                        ? selectedConge.start_date
                        : selectedConge.start_autorisation}
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>
                      End Date :{" "}
                      {selectedConge.combined_date
                        ? moment(selectedConge.combined_date).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        : selectedConge.end_date}
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>Description :</h3>
                    <p>{selectedConge.description}</p>
                  </td>
                </tr>
                <ImgsViewer
    imgs={[
      { src: '../images/photo-1.jpg' },
      { src: '../images/photo-2.jpg' }
    ]}
    isOpen={this.state.isOpen}
    onClickPrev={this.gotoPrevImg}
    onClickNext={this.gotoNextImg}
    onClose={this.closeImgsViewer}
  />
              </div>
              <button
                className="close-modal"
                onClick={() => {
                  setModal(false);
                  setSelectedConge(null);
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
