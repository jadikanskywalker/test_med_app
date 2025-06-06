import React, { useEffect, useState } from 'react';
import "./ReviewForm.css";

function ReviewForm() {
  const [doctorData, setDoctorData] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    let storedReviewData = JSON.parse(localStorage.getItem('reviewData'));

    if (storedReviewData == null) {
      storedReviewData = {};
    }

    if (Array.isArray(storedDoctorData)) {
      for (const doctor of storedDoctorData) {
        if (!(doctor.name in storedReviewData)) {
          storedReviewData[doctor.name] = {
            speciality: doctor.speciality,
            review: ""
          };
        }
      }
      setReviewData(storedReviewData);
      localStorage.setItem("reviewData", JSON.stringify(storedReviewData));
    }
  }, []);

  const hangleGiveReview = (name) => {
    setNewReview(reviewData[name].review);
    setShowForm(name);
  }

  const giveReview = () => {
    if (newReview != "") {
      let updatedReviewData = reviewData;
      updatedReviewData[showForm]["review"] = newReview;
      setReviewData(updatedReviewData);
      localStorage.setItem("reviewData", JSON.stringify(reviewData));
    }
    setNewReview("");
    setShowForm(false);
  }

  const deleteReview = () => {
    let updatedReviewData = reviewData;
    updatedReviewData[showForm]["review"] = "";
    setReviewData(updatedReviewData);
    localStorage.setItem("reviewData", JSON.stringify(reviewData));
    setNewReview("");
    setShowForm(false);
  }

  return (
    <div className="container reviews-container">
      <h1>Reviews</h1>
      {Object.keys(reviewData).length > 0 ? (
      !showForm ? (
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
              <td><button onClick={() => hangleGiveReview(key)}>{value.review === "" ? "Give Review" : "Edit Review"}</button></td>
              <td>{value.review !== "" ? value.review : ""}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
      ) : (
        <div className="review-grid">
          <div className="review-form">
            <form onSubmit={giveReview} onReset={deleteReview}>
              <div className="form-group">
                <label>Doctor Name</label>
                <input 
                  className="form-control"
                  value={showForm}
                  disabled
                />
              </div>
              <div className="form-group">
               <label htmlFor="review">Your review</label>
               <input
                 value={newReview}
                 onChange={(e) => setNewReview(e.target.value)}
                 type="text"
                 name="review"
                 id="review"
                 className="form-control"
                 placeholder="Enter your review"
               />
             </div>
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                  Give Review
                </button>
                <button type="reset" className="btn btn-danger mb-2 mr-1 waves-effect waves-light">
                  Delete Review
                </button>
              </div>
            </form>
          </div>
        </div>
      ) 
      ) : (<p>No doctors to review.</p>)}
    </div>
  );

}

export default ReviewForm;