import React from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteCatagory } from "../../Redux/apis/catagorySlice";

const CatagoryCard = ({ data }) => {
  //consts
  const { _id, name, photo } = data;
  const dispatch = useDispatch();

  return (
    <article className="relative  flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 hover:scale-110 transition-all shadow-md  ">
      <img
        src={photo}
        alt="product_avatar default picture"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <TiDelete
        className="text-3xl text-red-600 absolute top-0 right-0 z-50 hover:cursor-pointer"
        onClick={() => {
          dispatch(deleteCatagory(_id));
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-600 via-gray-600/10" />
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h3>
      {/* <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        City of love
      </div> */}
    </article>
  );
};

export default CatagoryCard;
