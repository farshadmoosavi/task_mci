import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FilterExample from "./FilterExample";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";

function ReqresDataTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [data, setData] = useState([]);
  const [initialUserData, setInitialUserData] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((json) => {
        setInitialUserData(json.data);
        setData(json.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const applyFilter = (data, field, operator, value) => {
    return data.filter((user) => {
      const fieldValue = user[field];
      if (field == "id") return numberFilter(fieldValue, operator, value);
      return stringFilter(fieldValue, operator, value);
    });
  };

  const numberFilter = (fieldValue, operator, value) => {
    switch (operator) {
      case "equals":
        return parseFloat(fieldValue) == parseFloat(value);
      case ">":
        return parseFloat(fieldValue) > parseFloat(value);
      case "<":
        return parseFloat(fieldValue) < parseFloat(value);
      default:
        return true;
    }
  };
  const stringFilter = (fieldValue, operator, value) => {
    switch (operator) {
      case "equals":
        return fieldValue.toLowerCase() == value.toLowerCase();
      case ">":
        return fieldValue.toLowerCase() > value.toLowerCase();
      case "<":
        return fieldValue.toLowerCase() < value.toLowerCase();
      default:
        return true;
    }
  };

  const applyFilters = (filters) => {
    let filteredData = [...initialUserData];
    filters.forEach((filter) => {
      const { field, operator, value } = filter;
      filteredData = applyFilter(filteredData, field, operator, value);
    });
    setData(filteredData);
  };

  return (
    <Card>
      <CardTitle>User Data</CardTitle>
      <CardBody>
        <Row className="mb-2" color="info" style={{height:'35px', backgroundColor:"rgb(9 83 6)", color:"#FFFFFF" }}>
          <Col md={1}>ID</Col>
          <Col md={4}>Email</Col>
          <Col md={2}>First Name</Col>
          <Col md={2}>Last Name</Col>
          <Col md={3}>Avatar</Col>
        </Row>
        {data.map((user, index) => (
          <Row key={user.id} className="mb-1" style={{backgroundColor: index%2 == 0 ? 'rgb(208 225 231)': 'rgb(239 235 235)'}}>
            <Col md={1}>{user.id}</Col>
            <Col md={4}>{user.email}</Col>
            <Col md={2}>{user.first_name}</Col>
            <Col md={2}>{user.last_name}</Col>
            <Col md={3}>
              <img src={user.avatar} alt={`Avatar of ${user.first_name}`} />
            </Col>
          </Row>
        ))}
        <CardFooter>
          <Row>
            <Col md={12}>
              <Button
                color="success"
                className="btn btn-primary m-2"
                onClick={toggleModal}
              >
                Open Filter
              </Button>
              <Button
                color="danger"
                className="btn btn-primary m-2"
                onClick={() => applyFilters([])}
              >
                Clear filter
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </CardBody>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create Filter</ModalHeader>
        <ModalBody>
          <FilterExample
            onUpdateFilter={(filters) => {
              toggleModal();
              applyFilters(filters);
            }}
          />
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default ReqresDataTable;
