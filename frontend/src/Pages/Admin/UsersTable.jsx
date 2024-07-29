import React from "react";
import { FaTrash } from "react-icons/fa";
const UsersTable = ({ data }) => {
  const { _id, firstName, lastName, email, photo, isAdmin, createdAt } = data;
  const parsedDate = new Date(createdAt);
  return (
    <tr>
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
            <p class="text-slate-500 font-light">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {isAdmin ? "ADMIN" : "USER"}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{`${parsedDate.toDateString()} (${parsedDate.toLocaleTimeString()})`}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
          <FaTrash />
        </span>
      </td>
    </tr>
  );
};

export default UsersTable;
