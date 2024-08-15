import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteReview, updateReviw } from "../../Redux/apis/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Review = ({ review }) => {
  // consts
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  //state
  const [isOpen, setIsOpen] = useState(false);
  const [editReview, setEditReview] = useState({
    comment: "",
  });

  //handlers
  const handleChangeReview = function (e) {
    setEditReview({ ...editReview, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdatedReview = function (e) {
    e.preventDefault();
    dispatch(
      updateReviw({
        reviewId: review._id,
        newReview: { ...editReview },
      })
    );
    setIsOpen(false);
  };

  return (
    <div
      className={` ${
        !isOpen && "flex items-start mt-8  "
      } shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 rounded-md relative`}
    >
      {userInfo.id === review.createdBy._id ? (
        <MdDelete
          className=" absolute bottom-2 right-2 text-red-600 cursor-pointer "
          size={20}
          onClick={() => {
            confirm("Are you sure to delete your review?")
              ? dispatch(deleteReview(review._id))
              : "";
          }}
        />
      ) : (
        ""
      )}

      {userInfo.id === review.createdBy._id ? (
        <MdEdit
          className="absolute bottom-2 text-sky-600 right-9 cursor-pointer"
          size={20}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      ) : (
        ""
      )}

      <img
        src={review.createdBy.photo}
        className={`${
          isOpen && "relative"
        } w-12 h-12 rounded-full border-2 border-white `}
      />

      <div className="ml-3">
        <h4
          className={`${
            isOpen && " inline absolute top-8 left-20"
          } text-sm font-bold`}
        >
          {`${review.createdBy.firstName} ${review.createdBy.lastName}`}
        </h4>

        {isOpen ? (
          <form className="p-8 " onSubmit={handleSubmitUpdatedReview}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your rating
            </label>
            <Rating
              name="simple-controlled"
              defaultValue={review.rating}
              precision={0.5}
              onChange={(e, newValue) => {
                setEditReview({ ...editReview, rating: newValue });
              }}
            />
            <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Review
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 "
              placeholder="Write your review here..."
              name="comment"
              defaultValue={review.comment}
              onChange={handleChangeReview}
            />
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900  hover:bg-gray-300/50 "
            >
              Update review
            </button>
          </form>
        ) : (
          <>
            <div className="flex space-x-1 mt-1">
              <Rating
                name="half-rating-read"
                value={review.rating}
                precision={0.5}
                readOnly
                size="small"
              />
              <span className="text-xs  font-light absolute top-2 right-1">
                {new Date(review.createdAt).toDateString()}
              </span>
            </div>
            <p className="text-xs mt-4">{review.comment}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
