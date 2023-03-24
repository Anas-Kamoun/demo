import React, { useState } from "react";
import "./css/style.css";
import { useStateContext } from "../Contexts/ContextProvider";


const LeaveRequestForm = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState(null);
  const {user,setNotification}=useStateContext()


  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to server or perform other actions here
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="balance">Solde de jours de congés restants</label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Date début</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">Date fin</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="leaveType">Nature du congé</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(event) => setLeaveType(event.target.value)}
            required
          >
            <option value="">--Choisissez une option--</option>
            <option value="congé annuel">Congé annuel</option>
            <option value="congé de maladie">Congé de maladie</option>
            <option value="congé sans solde">Congé sans solde</option>
            <option value="congé sans solde">Congé maternité </option>

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reason">Raison de congé</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="attachment">Pièce jointe</label>
          <input
            type="file"
            id="attachment"
            onChange={(event) => setAttachment(event.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;


