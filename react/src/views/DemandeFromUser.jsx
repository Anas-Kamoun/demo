import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import * as React from "react";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import dayjs from "dayjs";
import { DatePicker, Space, TimePicker } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";

export default function DemandeFromUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { user, setNotification } = useStateContext();
  const [DCongeeValue, setConge] = useState({
    user_id: "",
    conge_id: "",
    type: "",
    autorisation: "",
    start_autorisation: "",
    start_date: "",
    end_date: "",
    description: "",
    file: "",
    etat: ""
  });
  const [conges, setConges] = useState([]);
  // const currentConges = conges.find(
  //   (el) => el.contrat_id === user.contrat_id
  // ) || {
  //   name: "",
  //   id: "",
  // };

  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const disabledDate = current => {
    const today = moment(); // Get the current day using moment.js
  
    if (!dates) {
      return false;
    }
  
    const tooLate = dates[0] && current.diff(dates[0], "days") >= user.solde;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= user.solde;
  
    // Disable dates before the current day
    const beforeToday = current.isBefore(today, "day");
  
    return !!tooEarly || !!tooLate || beforeToday;
  };
  const onOpenChange = open => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  const format = "HH:mm";
  const dateFormat = "YYYY-MM-DD";
  const onChange = (date, dateString) => {
    setValue(date);
    setConge({
      ...DCongeeValue,
      start_date: dateString[0],
      end_date: dateString[1]
    });
  };

  const onChangeau = (value, dateString) => {
    setConge({
      ...DCongeeValue,
      start_autorisation: dateString
    });
  };

  useEffect(() => {
    setLoading(true);
    if ((user.role =="super_admin")) {
      navigate("/dashboard");
    } else {
      axiosClient.get(`/getcongebycontrat/${user.contrat_id}`).then(({ data }) => {
        setConges(data);
        console.log(data);
      });
      if (id) {
        axiosClient
          .get(`/dconges/${id}`)
          .then(({ data }) => {
            setLoading(false);
            setConge(data.data);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    if (DCongeeValue.id) {
      axiosClient
        .put(`/dconges/${DCongeeValue.id}`, DCongeeValue)
        .then(() => {
          setNotification("Conge was updated successfully");
          navigate("/demandeuser");
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors);
            } else {
              setErrors({
                err: [response.data.message],
              });
            }
          }
        });
    } else {
      axiosClient
        .post(`/dconges/`, DCongeeValue)
        .then(() => {
          setNotification("Demande Conge a été créé avec succès");
          navigate("/demandeuser");
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors);
            } else {
              setErrors({
                err: [response.data.message],
              });
            }
          }
        });
    }
  };

  const { Dragger } = Upload;
  const props = {
    name: "image",
    multiple: true,
    action: `${import.meta.env.VITE_API_BASE_URL}/api/image/`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} Le fichier a été téléchargé avec succès.`);
        setConge({
          ...DCongeeValue,
          file: `${import.meta.env.VITE_API_BASE_URL}/storage/${
            info.file.response.image
          }`.replace("public/", "")
        });
      } else if (status === "error") {
        message.error(
          `${info.file.response.errors.image[1]} échec du chargement du fichier.`
        );
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    }
  };

  return (
    <div>
      {DCongeeValue.id && <h1>Update {DCongeeValue.type}</h1>}
      {!DCongeeValue.id && <h1>Nouvelle demande conge</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Chargement...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <div>
              <h3>
                Votre Solde ({user.solde} jr|{user.autorisation} h:m:s)
              </h3>
              <br />
            </div>
            <div>
              <FormControl fullWidth>
                <Select
                  fullWidth
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={DCongeeValue.type}
                  placeholder="TypeCongee"
                  onChange={ev =>
                    setConge({
                      ...DCongeeValue,
                      type: ev.target.value,
                      user_id: user.id
                    })
                  }
                >
                  <MenuItem value="" disabled>
                    Type demande ?
                  </MenuItem>
                  <MenuItem value={"autorisation"}>Autorisation</MenuItem>
                  <MenuItem value={"Congee"}>Congé</MenuItem>
                </Select>
              </FormControl>
              &nbsp;
              <br />
              {DCongeeValue.type === "autorisation" && (
                <div>
                  <div>
                    <Space direction="horizontal" size={12}>
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChangeau}
                        disabledDate={current =>
                          current && current < moment().startOf("day")
                        }
                      />

                      <TimePicker
                        format={format}
                        onChange={(time, timeString) =>{
                          const formattedTime = moment(timeString, format).format("HH:mm:ss");
                          setConge({
                            ...DCongeeValue,
                            autorisation: formattedTime
                          });
                        }}
                      />
                    </Space>
                  </div>
                  &nbsp;
                  <textarea
                    id="motif"
                    name="motif"
                    rows="5"
                    cols="33"
                    value={DCongeeValue.description}
                    placeholder="Description"
                    onChange={ev =>
                      setConge({
                        ...DCongeeValue,
                        description: ev.target.value
                      })
                    }
                  ></textarea>
                  &nbsp;
                </div>
              )}
              {DCongeeValue.type === "Congee" && (
                <div>
                  <Select
                    fullWidth
                    displayEmpty
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={DCongeeValue.conge_id}
                    placeholder="Type congé"
                    onChange={ev =>
                      setConge({
                        ...DCongeeValue,
                        conge_id: ev.target.value
                      })
                    }
                  >
                    <MenuItem value="" disabled>
                      Type congé ?
                    </MenuItem>
                    {conges.map(c => (
                      <MenuItem value={c.id} key={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                  &nbsp;
                  <div>
                    <RangePicker
                      size="large"
                      format={dateFormat}
                      value={dates || value}
                      disabledDate={disabledDate}
                      minDates={moment()}
                      onCalendarChange={val => setDates(val)}
                      onChange={onChange}
                      onOpenChange={onOpenChange}
                    />
                  </div>
                  &nbsp;
                  <textarea
                    id="motif"
                    name="motif"
                    rows="5"
                    cols="33"
                    placeholder="Description"
                    value={DCongeeValue.description}
                    onChange={ev =>
                      setConge({
                        ...DCongeeValue,
                        description: ev.target.value
                      })
                    }
                  ></textarea>
                  &nbsp;
                  <div>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                      Cliquez ou faites glisser le fichier vers cette zone pour le télécharger
                      </p>
                    </Dragger>
                  </div>
                  &nbsp;
                </div>
              )}
            </div>
            <button className="btn">Enregistrer</button>
          </form>
        )}
      </div>
    </div>
  );
}
