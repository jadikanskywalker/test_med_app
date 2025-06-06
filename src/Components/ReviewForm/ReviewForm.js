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
    const storedReviewData = JSON.parse(localStorage.getItem("reviewData"));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (Object.isObject(storedReviewData)) {
      if (Array.isArray(storedDoctorData)) {
        for (const doctor of storedDoctorData) {
          if (!(doctor.name in storedReviewData)) {
            storedReviewData[doctor.name] = {
              name: doctor.name,
              speciality: doctor.speciality,
              review: ""
            };
          }
        }
      }
      setReviewData(storedReviewData);
      localStorage.setItem("reviewData", JSON.stringify(storedReviewData));
    }
  });

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Doctor</th>
            <th scope="col">Speciality</th>
            <th scope="col">Provide Feedback</th>
            <th scope="col">Review Given</th>
          </tr>
        </thead>
        <tbody>
          {storedReviewData.map((review) => {
            <tr>
              <td>{review.name}</td>
              <td>{review.speciality}</td>
              <td><button>{review.review === "" ? "Give Review" : ""}</button></td>
              <td>{review.review !== "" ? review.review : ""}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );

}

export default ReviewForm;