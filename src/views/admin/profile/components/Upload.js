import {
  Box,
  Button,
  Input,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { MdUpload } from "react-icons/md";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Upload(props) {
  const { used, total, ...rest } = props;
  const [filename, setFilename] = useState("");
  const [filetype, setFiletype] = useState("");
  const [image, setImage] = useState("");
  const [uploadURL, setUploadURL] = useState("");

  const API_ENDPOINT =
    "https://ohbrp8w717.execute-api.us-east-1.amazonaws.com/uploads"; // Replace with your S3 API endpoint
  const userId = "001"; // Replace with the actual user ID
  const history = useHistory();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Get the presigned URL
      const response = await axios.get(API_ENDPOINT, {
        params: {
          userId,
          fileName: file.name,
          fileType: file.type,
        },
      });

      setFilename(file.name);
      setFiletype(file.type);
      setImage(URL.createObjectURL(file));

      // Upload the file to S3
      const result = await fetch(response.data.uploadURL, {
        method: "PUT",
        body: file,
      });

      // Check if the upload was successful
      if (result.ok) {
        setUploadURL(response.data.uploadURL.split("?")[0]);
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeImage = () => {
    setFilename("");
    setFiletype("");
    setImage("");
    setUploadURL("");
  };

  const uploadImage = async () => {
    // window.location.reload();
    // Perform any additional tasks you want after sign-out
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");

  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <div>
          {!filename ? (
            <div>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload your files
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                Start uploading your folders and files.
              </Text>
              <h2>Select a File</h2>
              <input type="file" onChange={handleFileChange} accept="*" />
            </div>
          ) : (
            <div>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload your files
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                Start uploading your folders and files.
              </Text>
              <p>Selected File: {filename}</p>
              <p>Type: {filetype}</p>
              {uploadURL ? (
                <h2>Success! File uploaded to bucket.</h2>
              ) : (
                <>
                  <Button onClick={removeImage}>Remove file</Button>
                  <Button onClick={uploadImage}>Upload file</Button>
                </>
              )}
            </div>
          )}
        </div>
        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            Upload your repository
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            mx="auto"
            textAlign="start"
          >
            Anything from a single file to a whole project.
          </Text>
          <Flex w="100%">
            {/* <Button
              me="100%"
              mb="50px"
              w="140px"
              minW="140px"
              mt={{ base: "20px", "2xl": "auto" }}
              variant="brand"
              fontWeight="500"
            >
              Publish now
            </Button> */}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
