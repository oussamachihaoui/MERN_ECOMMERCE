import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteCatagory, updateCatagory } from "../../Redux/apis/catagorySlice";
import { RiEditCircleFill } from "react-icons/ri";
import { Button, Modal, Label, TextInput, FileInput } from "flowbite-react";
import axios from "axios";

const CatagoryCard = ({ data }) => {
  //consts
  const { _id, name, photo } = data;
  const dispatch = useDispatch();

  // states
  const [openModal, setOpenModal] = useState(false);
  const [editName, setEditName] = useState(name);
  const [uploadImg, setUploadImg] = useState(null);

  //handlers
  const handleUpdateCatagory = async function (e) {
    e.preventDefault();
    if (uploadImg) {
      const formData = new FormData();
      formData.append("file", uploadImg);
      formData.append("upload_preset", "oussamaCh");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dpcnuiynn/image/upload",
        formData,
        { withCredentials: false }
      );

      dispatch(
        updateCatagory({
          catagoryId: _id,
          newName: editName,
          newPhoto: data.url,
        })
      );
      setOpenModal(false);
    } else {
      dispatch(
        updateCatagory({
          catagoryId: _id,
          newName: editName,
        })
      );
      setOpenModal(false);
    }
  };

  return (
    <article className="relative  flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 hover:scale-110 transition-all shadow-md  ">
      <TiDelete
        className="text-3xl text-red-600 absolute top-0 right-0 z-50 hover:cursor-pointer"
        onClick={() => {
          dispatch(deleteCatagory(_id));
        }}
      />

      <RiEditCircleFill
        className="text-2xl text-blue-600 absolute top-1 right-7 z-50 hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      />

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Catagory details</Modal.Header>

        <Modal.Body>
          <form>
            <Label>Catagory Name:</Label>
            <TextInput
              type="text"
              defaultValue={name}
              onChange={(e) => setEditName(e.target.value)}
            />

            <Label>Catagory Image :</Label>
            <FileInput
              type="file"
              onChange={(e) => setUploadImg(e.target.files[0])}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleUpdateCatagory}>
            I accept
          </Button>

          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <img
        src={photo}
        alt="product_avatar default picture"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 " />
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h3>
      {/* <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        City of love
      </div> */}
    </article>
  );
};

export default CatagoryCard;
