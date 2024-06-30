import axios from "axios";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

function CreateModal({ items, setItems, user, id, children }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-bizz");
      data.append("cloud_name", "amaanzaidi");
      fetch("https://api.cloudinary.com/v1_1/amaanzaidi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !price || !type || !image) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${window.location.origin}/api/items`,
        { name, image, price, type },
        config
      );
      setItems((items) => [...items, data]);
      toast({
        title: "Item created Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      setName("");
      setImage("");
      setPrice();
      setType("");
    } catch (err) {
      toast({
        title: "Error Occured",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("hello");

    setLoading(true);
    let body = {};
    if (image) body.image = image;
    if (name) body.name = name;
    if (type) body.type = type;
    if (price) body.price = price;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.patch(
        `${window.location.origin}/api/items/${id}`,
        body,
        config
      );
      let newItems = items.filter((item) => item._id !== id);
      setItems([...newItems, data.item]);
      toast({
        title: children
          ? "Item Updated Successfully"
          : "Item created Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      setName("");
      setImage("");
      setPrice();
      setType("");
    } catch (err) {
      toast({
        title: "Error Occured",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Button colorScheme="blue" isLoading={loading} onClick={onOpen}>
        {children ? children : "Create Item"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {children ? "Update Item" : "Create New Item"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <form
              className=" flex flex-col gap-3 p-3 "
              onSubmit={(e) => {
                children ? handleUpdate(e) : handleSubmit();
              }}
            >
              <div className="flex flex-col">
                <label className="font-bold">Name</label>
                <input
                  className="p-2 rounded-lg mt-2"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Price</label>
                <input
                  className="p-2 rounded-lg mt-2"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Type</label>
                <input
                  className="p-2 rounded-lg mt-2"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  p="1.5"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>
              <Button
                type="submit"
                width="100%"
                marginTop="20px"
                colorScheme="blue"
                isLoading={loading}
              >
                Submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateModal;
