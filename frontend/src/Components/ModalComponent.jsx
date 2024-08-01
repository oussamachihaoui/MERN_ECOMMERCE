import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import React from "react";
import { useDispatch } from "react-redux";
import { createCatagory } from "../Redux/apis/catagorySlice";

const ModalComponent = () => {
  //consts
  const dispatch = useDispatch();
  //states
  const [addNewCatagory, setAddNewCatagory] = useState({
    name: "",
    photo: "",
  });
  const [openModal, setOpenModal] = useState(false);

  //handlers

  const handleOnChange = function (e) {
    setAddNewCatagory({ ...addNewCatagory, [e.target.name]: e.target.value });
  };

  const handleSubmitNewCatagory = function (e) {
    e.preventDefault();
    dispatch(createCatagory(addNewCatagory));
    setOpenModal(false);
  };

  console.log(addNewCatagory);

  return (
    <>
      <IoIosAddCircle
        className="w-8 h-8 text-gray-600 order-1 cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Movie details</Modal.Header>

        <Modal.Body>
          <form>
            <Label>Catagory Name:</Label>
            <TextInput type="text" name="name" onChange={handleOnChange} />

            <Label>Catagory Image Url:</Label>
            <TextInput type="text" name="photo" onChange={handleOnChange} />
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
