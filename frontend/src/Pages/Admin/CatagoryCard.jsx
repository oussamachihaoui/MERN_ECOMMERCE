import React from "react";

const CatagoryCard = ({ data }) => {
  const { name, photo } = data;
  return (
    <article className="relative  flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 hover:scale-110 transition-all shadow-md  ">
      <img
        src={photo}
        alt="product_avatar default picture"
        className="absolute inset-0 h-full w-full object-cover"
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
