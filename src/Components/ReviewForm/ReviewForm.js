import React, { useEffect, useState } from 'react';
import "./ReviewForm.css";

function ReviewForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [reviewData, setReviewData] = useState({});
  // const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    let storedReviewData = JSON.parse(localStorage.getItem('reviewData'));

    if (storedReviewData == null) {
      storedReviewData = {};
    }

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (Array.isArray(storedDoctorData)) {
      for (const doctor of storedDoctorData) {
        console.log(doctor);
        if (!(doctor.name in storedReviewData)) {
          storedReviewData[doctor.name] = {
            speciality: doctor.speciality,
            review: ""
          };
        }
      }
      console.log(storedReviewData);
      setReviewData(storedReviewData);
      localStorage.setItem("reviewData", JSON.stringify(storedReviewData));
    }
  }, []);

  return (
    <div className="container reviews-container">
      <h1>Reviews</h1>
      {Object.keys(reviewData).length > 0 ? (
      <table className="reviews-table">
        <thead>
          <tr>
            <th scope="col">Doctor</th>
            <th scope="col">Speciality</th>
            <th scope="col">Provide Feedback</th>
            <th scope="col">Review Given</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(reviewData).map(([key, value]) => {
            return (
            <tr>
              <td>{key}</td>
              <td>{value.speciality}</td>
              <td><button>{value.review === "" ? "Give Review" : ""}</button></td>
              <td>{value.review !== "" ? value.review : ""}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
      ) : (<p>No doctors to review.</p>)}
    </div>
  );

}

export default ReviewForm;