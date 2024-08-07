import React from "react";
import { FaTrash } from "react-icons/fa";
import { deleteUser } from "../../Redux/apis/userSlice";
import { useDispatch } from "react-redux";

const UsersTable = ({ data }) => {
  // consts
  const { _id, firstName, lastName, email, photo, isAdmin, createdAt } = data;
  const parsedDate = new Date(createdAt);
  const dispatch = useDispatch();

  return (
    <tr className={`${isAdmin ? "border-2 border-emerald-500" : ""}`}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">{_id}</div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={photo}
              alt="profile-pic"
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap text-base">
              {firstName} {lastName}
            </p>
            <p className="text-slate-500 font-light">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={` ${
            isAdmin ? "text-emerald-500 font-medium " : "text-gray-900"
          } whitespace-no-wrap`}
        >
          {isAdmin ? "ADMIN" : "USER"}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{`${parsedDate.toDateString()} (${parsedDate.toLocaleTimeString()})`}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight cursor-pointer">
          {!isAdmin && (
            <FaTrash
              className="text-lg"
              onClick={() => {
                confirm("are you sure to delete this user?")
                  ? dispatch(deleteUser(_id))
                  : "";
              }}
            />
          )}
        </span>
      </td>
    </tr>
  );
};

export default UsersTable;
