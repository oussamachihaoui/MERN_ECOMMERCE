import React from "react";
import Rating from "@mui/material/Rating";
import { MdDelete } from "react-icons/md";
import { deleteReview } from "../../Redux/apis/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Review = ({ review }) => {
  // consts
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex items-start mt-8  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 rounded-md relative">
      {userInfo.id === review.createdBy._id ? (
        <MdDelete
          className=" absolute bottom-2 right-2 text-red-600 cursor-pointer "
          size={20}
          onClick={() => {
            dispatch(deleteReview(review._id));
          }}
        />
      ) : (
        ""
      )}
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
