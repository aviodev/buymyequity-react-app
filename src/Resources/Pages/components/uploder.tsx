import React, { useCallback, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import {
  ImFileWord,
  ImFilePdf,
  ImImage,
  ImCross,
  ImVideoCamera,
  ImUpload2,
} from "react-icons/im";
import { Button } from "primereact/button";
const fileLogo = {
  doc: <ImFileWord style={{ fontSize: "4rem", opacity: 0.2 }} />,
  pdf: <ImFilePdf style={{ fontSize: "4rem", opacity: 0.2 }} />,
  image: <ImImage style={{ fontSize: "4rem", opacity: 0.2 }} />,
  video: <ImVideoCamera style={{ fontSize: "4rem", opacity: 0.2 }} />,
};
const Type = {
  video: ["video/mp4", "video/mkv", "video/WMV", "video/AVI", "video/MOV"],
  image: ["image/jpeg", "image/png", "image/jpg"],
  doc: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  pdf: ["application/pdf"],
  zip: ["application/zip"],
  folder: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

function Uploader(props) {
  const showToast = toast;
  const [file, setFile] = useState(props.value ? props.value : null);
  const onDrop = useCallback((acceptedFiles) => {
    //   console.log(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
    // Do something with the files
  }, []);

  useEffect(() => {
    setFile(props.value ? props.value : null);
  }, [props.value]);
  const onUpload = () => {
    if (file) {
      props.setRequireFile(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Type[props.filetype],
    maxSize: props.maxSize ? props.maxSize : 2000000,
    onDropRejected: (file) => {
      showToast(
        `File is too large, maximum: ${
          props.maxSize < 1000000
            ? props.maxSize
              ? props.maxSize / 1000
              : 2
            : props.maxSize
            ? props.maxSize / 1000000
            : 2
        } ${props.maxSize > 1000000 ? "MB" : "KB"}`,
        { type: "error" }
      );
    },
  });
  const onCancel = () => {
    setFile(null);
    props.setRequireFile(null);
  };
  return (
    <Container className="my-2  ">
      {file ? (
        <Card className="p-3 border bg-light">
          <Card.Title className="text ">
            <div className="my-2 text-dark ">
              <ImUpload2 />
              {props.label ? props.label : "Upload Document"}{" "}
              {props.important ? <span className="required">*</span> : null}
            </div>
          </Card.Title>
          <div className="flex-between flex-column ">
            {" "}
            <p className="subtitle text-lowercase h5 my-2">{file.name}</p>
            <div className="flex-center mt-2">
              {file && !props.value ? (
                <Button
                  className="p-button-success p-2 mx-3"
                  onClick={onUpload}
                  type="button"
                >
                  <i className="pi pi-cloud-upload  px-2"></i>
                  <span className="px-1">Upload</span>
                </Button>
              ) : (
                <></>
              )}
              <Button className="p-button-danger p-2 mx-3" onClick={onCancel}>
                <ImCross></ImCross>
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border ">
          <Card.Title className="text mt-2 mb-0">
            <div className="my-2 text-start text-hover mx-4  ">
              <ImUpload2 className="text-success mx-2  " />
              {props.label ? props.label : "Upload Document"}
              {props.important ? <span className="required">*</span> : null}
            </div>
          </Card.Title>
          <div
            {...getRootProps({
              role: "button",
              "aria-label": "drag and drop area",
            })}
          >
            <input {...getInputProps()} />

            <Card.Body className="p-2">
              <Card className="bg-light card border-0">
                <Card.Body className="p-3  ">
                  {isDragActive ? (
                    <div className="flex-center flex-column text-center">
                      {fileLogo[props.filetype]}
                      <p className="text-center text-gray mt-4">
                        Drag and drop your file here
                      </p>
                    </div>
                  ) : (
                    <div id="select" className="flex-center flex-column">
                      {fileLogo[props.filetype]}
                      <p className="text-center text-gray mt-4">
                        Drag and drop your file here or click to select file
                      </p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Card.Body>
          </div>
        </Card>
      )}
    </Container>
  );
}

export default Uploader;
