import React from "react";
import Rating from "@mui/material/Rating";
const Review = ({ review }) => {
  return (
    <div className="flex items-start mt-8  border-gray-200 border p-3 rounded-md relative">
      <img
        src={review.createdBy.photo}
        className="w-12 h-12 rounded-full border-2 border-white"
      />
      <div className="ml-3">
        <h4 className="text-sm font-bold">{`${review.createdBy.firstName} ${review.createdBy.lastName}`}</h4>
        <div className="flex space-x-1 mt-1">
          <Rating
            name="half-rating-read"
            defaultValue={review.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className="text-xs  font-light absolute top-2 right-1">
            {new Date(review.createdAt).toDateString()}
          </span>
        </div>
        <p className="text-xs mt-4">{review.comment}</p>
      </div>
    </div>
  );
};

export default Review;
