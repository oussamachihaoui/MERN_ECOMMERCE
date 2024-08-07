import { Button, Modal, Label, TextInput, FileInput } from "flowbite-react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import React from "react";
import { useDispatch } from "react-redux";
import { createCatagory } from "../Redux/apis/catagorySlice";
import axios from "axios";

const ModalComponent = () => {
  //consts
  const dispatch = useDispatch();
  //states
  const [addNewCatagory, setAddNewCatagory] = useState({
    name: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [uploadImg, setUploadImg] = useState(null);

  //handlers

  const handleOnChange = function (e) {
    setAddNewCatagory({ ...addNewCatagory, [e.target.name]: e.target.value });
  };

  const handleSubmitNewCatagory = async function (e) {
    e.preventDefault();
    if (uploadImg) {
      const formData = new FormData();
      formData.append("file", uploadImg);
      formData.append("upload_preset", "oussamaCh");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dpcnuiynn/image/upload",
        // "https://api.cloudinary.com/v1_1/dpcnuiynn/image/upload?upload_preset=oussamaCh",

        formData,
        { withCredentials: false }
      );

      dispatch(createCatagory({ ...addNewCatagory, photo: data.url }));
      setOpenModal(false);
    } else {
      dispatch(createCatagory(addNewCatagory));
      setOpenModal(false);
    }
  };

  return (
    <>
      <IoIosAddCircle
        className="w-8 h-8 text-gray-600 order-1 cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Catagory details</Modal.Header>

        <Modal.Body>
          <form>
            <Label>Catagory Name:</Label>
            <TextInput type="text" name="name" onChange={handleOnChange} />

            <Label>Catagory Image :</Label>
            <FileInput
              type="file"
              onChange={(e) => setUploadImg(e.target.files[0])}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmitNewCatagory}>
            I accept
          </Button>

          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
