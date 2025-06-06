import React, { useEffect, useState } from 'react';
import "./ReportLayout.css";

function ReportLayout() {
  const [doctorData, setDoctorData] = useState([]);
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    let storedReportData = JSON.parse(localStorage.getItem('reportData'));

    if (storedReportData == null) {
      storedReportData = {};
    }

    if (Array.isArray(storedDoctorData)) {
      for (const doctor of storedDoctorData) {
        if (!(doctor.name in storedReportData)) {
          storedReportData[doctor.name] = {
            speciality: doctor.speciality,
          };
        }
      }
      setReportData(storedReportData);
      localStorage.setItem("reportData", JSON.stringify(storedReportData));
    }
  }, []);

  return (
    <div className="container reviews-container">
      <h1>Reports</h1>
      {Object.keys(reportData).length > 0 ? (
      <table className="reviews-table">
        <thead>
          <tr>
            <th scope="col">Doctor</th>
            <th scope="col">Speciality</th>
            <th scope="col">View Report</th>
            <th scope="col">Download Report</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(reportData).map(([key, value]) => {
            return (
            <tr>
              <td>{key}</td>
              <td>{value.speciality}</td>
              <td><button className="btn btn-primary" >View Report</button></td>
              <td><button className="btn btn-primary" >Download Report</button></td>
            </tr>
            );
          })}
        </tbody>
      </table>
      ) : (<p>No doctor reports to view.</p>)}
    </div>
  );

}

export default ReportLayout;