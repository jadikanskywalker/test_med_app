import React, { useEffect, useState } from 'react';
import "./ReviewForm.css";

function ReviewForm() {
  const [doctorData, setDoctorData] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

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
    if (reviewData[name].review == "") {
      setShowForm(name);
    }
  }

  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    setRating(value);
  };

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
              <td><button className="btn btn-primary" disabled={value.review != ""} onClick={() => hangleGiveReview(key)}>Give Review</button></td>
              <td>{value.review !== "" ? value.review : ""}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
      ) : (
        <div className="review-grid">
          <div className="review-form">
            <form onSubmit={giveReview}>
              <div className="form-group">
                <label>Doctor Name</label>
                <input 
                  className="form-control"
                  value={showForm}
                  disabled
                />
              </div>
              <div className="form-group">
               <label htmlFor="review">Name</label>
               <input
                 type="text"
                 name="name"
                 id="name"
                 className="form-control"
                 placeholder="Enter your name"
               />
             </div>
              <div className="form-group">
               <label htmlFor="review">Review</label>
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
             <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <div role="radiogroup" aria-label="Star rating">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <label key={starValue} style={{ cursor: 'pointer', fontSize: '24px' }}>
                        <input
                          type="radio"
                          name="rating"
                          value={starValue}
                          checked={rating === starValue}
                          onChange={handleRatingChange}
                          style={{ display: 'none' }}
                        />
                        <span style={{ color: starValue <= rating ? '#ffc107' : '#e4e5e9' }}>
                          ★
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                  Give Review
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