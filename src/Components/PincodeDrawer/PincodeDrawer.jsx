import React, { useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Box,
} from "@chakra-ui/react";
import styles from "./pdrawer.module.css";
import { FcHome, FcShipped, FcTodoList } from "react-icons/fc";
import axios from "axios";

const data = [
  {
    icon: <FcHome style={{ width: "40px", height: "40px" }} />,
    para: "Login to View Addresses",
    color: "#23587F",
    bg: "white",
    weight: "700",
    border: "#f5f5f5",
  },
];

const PincodeDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [pin, setPin] = useState("");
  const [text, setText] = useState("Select Pincode");

  const searchCity = async () => {
    let res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
    onClose();
    setText(`${pin} ${res.data[0].PostOffice[0].Block}`);
    console.log(res.data[0].PostOffice[0].Block);
  };

  return (
    <div>
      {text === "Select Pincode" ? (
        <Button
          ref={btnRef}
          color="gray.700"
          onClick={onOpen}
          variant="ghost"
          bg="white"
          height="40px"
          borderTopEndRadius="none"
          borderBottomEndRadius="none"
          _hover="none"
          fontSize='medium'
        >
          {text}
        </Button>
      ) : (
        <Button
          ref={btnRef}
          color="#30363c"
          onClick={onOpen}
          variant="ghost"
          bg="white"
          height="40px"
          fontSize={"14px"}
          noOfLines={2}
          borderTopEndRadius="none"
          borderBottomEndRadius="none"
          _hover="none"
          textAlign="left"
          fontWeight={"500"}
        >
          <span
            style={{ fontSize: "12px", color: "#4F585E", fontWeight: "400" }}
          >
            Delivery to
          </span>
          <br />
          {text}
        </Button>
      )}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            marginRight="500px"
            style={{
              backgroundColor: "#23587F",
              padding: "30px",
              border: "none",
              color: "white",
              marginTop: "20px",
              borderRadius: "0px",
            }}
          />
          <DrawerHeader className={styles.heading} >
            Choose your Location
          </DrawerHeader>

          <DrawerBody>
            <InputGroup>
              <Input
                height="50px"
                borderColor="#767676"
                placeholder="Enter PIN Code"
                borderRadius="8px"
                _hover="none"
                onChange={(e) => setPin(e.target.value)}
              />
              <InputRightElement height="50px" width="140px">
                <Button
                  bg="#23587F"
                  size="md"
                  height="50px"
                  width="140px"
                  borderLeftRadius="none"
                  color="white"
                  fontSize="14px"
                  fontWeight="800"
                  onClick={searchCity}
                  _hover="none"
                >
                  Check
                </Button>
              </InputRightElement>
            </InputGroup>
            <Stack gap="20px" style={{ marginTop: "20px" }}>
              {data.map((el, i) => (
                <Box
                  key={i}
                  border="1px solid"
                  borderColor={el.border}
                  borderRadius="10px"
                  style={{ padding: "30px" }}
                  bg={el.bg}
                >
                  <Stack direction="horizontal" gap="30px" alignItems="center">
                    <Box>{el.icon}</Box>
                    <Box
                      color={el.color}
                      fontWeight={el.weight}
                      fontSize="14px"
                    >
                      {el.para}
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PincodeDrawer;
