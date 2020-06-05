import React from "react";

const Item = (props) => {
  const phone_url = props.phone.name.toLowerCase().split(" ").join("_");
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 bg-dark">
        <div className="float-right m-1 ">
          <small className="text-white border p-1">{props.phone.grade}</small>
        </div>
        <img
          className="card-img-top"
          src={`https://eze-bucket-coding.s3.eu-central-1.amazonaws.com/${phone_url}.png`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300";
          }}
          alt=""
        />
        <div className="card-body text-white">
          <h4 className="card-title">{props.phone.name}</h4>
          <p>{props.phone.storage}</p>

          <div className="card-text">
            <small>Unit Price</small>
            <p>
              <strong>${props.phone.price}</strong>
            </p>
          </div>
        </div>
        {/* <div className="card-footer">
          <small className="text-muted">
            &#9733; &#9733; &#9733; &#9733; &#9734;
          </small>
        </div> */}
      </div>
    </div>
  );
};

export default Item;
