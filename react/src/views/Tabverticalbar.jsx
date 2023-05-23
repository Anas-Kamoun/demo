import * as React from 'react';
import axiosClient from "../axios-client";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';


import { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';


const GenderFilterOptions = [
  // { label: 'All', value: 'all' },
  { label: 'Congé en cours', value: 'En Cours' },
  { label: 'Congé accepté', value: 'Validee' },
  { label: 'Congé refusé', value: 'Annulee' },
];

// const DateFilterOptions = [
//   { label: 'Last 7 Days', value: 'days' },
//   { label: 'Last Month', value: 'months' },
//   { label: 'Last Year', value: 'years' },
// ];


const DateFilterOptions = [
  { label: '7 derniers jours', value: 'days' },
  { label: '12 derniers mois', value: 'months' },
 
];




const Tabverticalbar = ({ title, }) => {
  const [data, setData] = useState([]);
  const [genderFilter, setGenderFilter] = useState('En Cours');
  const [dateFilter, setDateFilter] = useState('days');

  useEffect(() => {
    fetchData();
  }, [genderFilter, dateFilter]);

  // const fetchData = async () => {
  //   try {
  //     let response = null;
  //     switch (dateFilter) {
  //       case 'days':
  //         response = await axiosClient.get(`http://localhost:8000/api/count-past-7-days/{etat?}`);
  //         break;

  //       case 'months':
  //           response = await axios.get(`http://localhost:8000/api/count-last-mounth/{etat?}`);
  //           break;
  //       default:
  //           throw new Error(`Invalid date filter: ${dateFilter}`);  
        
        
  //     }
  //     setData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const formatDate = (dateObj) => {
  //   const { day, month, year } = dateObj;
  //   switch (dateFilter) {
  //     case 'days':
  //       return `${day}/${month}/${year}`;
  //     case 'months':
  //       return `${month}/${year}`;
  //     case 'years':
  //       return `${year}`;
  //     default:
  //       throw new Error(`Invalid date filter: ${dateFilter}`);
  //   }
  // };

  // const chartOptions = {
  //   tooltip: {
  //     trigger: 'axis',
  //   },
  //   xAxis: {
  //     type: 'category',
  //     data: Array.isArray(data) ? data.slice(-7).map((item) => formatDate(item._id)) : [],
  //     // Array.isArray(data) ? data.slice(-7).map(() => formatDate()) : [],
  //     //  data.slice(-7).map((item) => formatDate(item._id)),
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       type: 'bar',
  //       barWidth: '40%',

  //       color: "#8D92A9",
  //       data: Array.isArray(data) ? data.slice(-7).map((item) =>item.count) : [],
  //       //  Array.isArray(data) ? data.slice(-7).map(() => ) : [],
  //       // data.slice(-7).map((item) => item.count),
  //       smooth: true,


  //     },
  //   ],
  // };




  const fetchData = async () => {
    try {
      let response = null;
      switch (dateFilter) {
        case 'days':
          response = await axiosClient.get(`/count-past-7-days/${genderFilter}`);
          break;
        case 'months':
          response = await axiosClient.get(`/count-last-mounth/${genderFilter}`);
          break;
        default:
          throw new Error(`Invalid date filter: ${dateFilter}`);
      }
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const formatDate = (dateObj) => {
    const { day, month, year } = dateObj;
    switch (dateFilter) {
      case 'days':
        return `${day}/${month}/${year}`;
      case 'months':
        return `${month}/${year}`;
      case 'years':
        return `${year}`;
      default:
        throw new Error(`Invalid date filter: ${dateFilter}`);
    }
  };
  
  const chartOptions = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: Array.isArray(data) ? data.slice(-9).map((item) => formatDate(item._id)) : [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        color: "#8D92A9",
        data: Array.isArray(data) ? data.slice(-9).map((item) => item.count) : [],
        smooth: true,
      },
    ],
  };
  














  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={genderFilter}>
        <div style={{ marginTop: "22px", marginBottom: "-50px" }}>
          <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <TabList value={genderFilter} onChange={(e, newValue) => setGenderFilter(newValue)}>
              {GenderFilterOptions.map((option) => (
                <Tab key={option.value} label={option.label} value={option.value} />
              ))}
            </TabList>
          </Box>



        </div>


        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "70px", marginLeft: "50px", }}>
          <div style={{ display: 'flex' }}>{title}</div>
          <div>
            <select style={{ border:"none", fontFamily: "poppins", fontWeight: 300,marginRight:"20px", backgroundColor:"#F0F2F4",height:"40px",width:"200px",borderRadius:"10px",marginTop:"5px" }} value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              {DateFilterOptions.map((option) => (
                <option style={{textAlign:"center"}}  key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div ref={(ref) => (ref ? echarts.init(ref).setOption(chartOptions) : null)} style={{ height: 400, marginTop: "-23px" }}></div>



      </TabContext>
    </Box>
  );
}
export default Tabverticalbar;