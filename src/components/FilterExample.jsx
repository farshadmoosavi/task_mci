import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Input,
  Row,
} from "reactstrap";

const FilterExample = ({ onUpdateFilter }) => {
  const [userData, setUserData] = useState([]);
  const [filterField, setFilterField] = useState(""); // Selected field for filtering
  const [filterOperator, setFilterOperator] = useState(""); // Selected operator for filtering
  const [filterValue, setFilterValue] = useState(""); // Value to filter by
  const [filters, setFilters] = useState([
    { field: "", operator: "equals", value: "" },
  ]); // Array to store filters

  // Function to apply the filter

  const applyFilters = () => {
    onUpdateFilter(filters);
  };

  const addFilter = () => {
    const newFilter = {
      field: filterField,
      operator: filterOperator,
      value: filterValue,
    };
    setFilters([...filters, newFilter]);
  };

  return (
    <Card>
      <CardBody>
        {filters.map((filter, index) => (
          <Row key={index}>
            <Col md={4}>
              <Input
                type="text"
                value={filter.field}
                onChange={(e) => {
                  const updatedFilters = [...filters];
                  updatedFilters[index].field = e.target.value;
                  setFilters(updatedFilters);
                }}
              />
            </Col>
            <Col md={3}>
              <Input
                type="select"
                value={filter.operator}
                onChange={(e) => {
                  const updatedFilters = [...filters];
                  updatedFilters[index].operator = e.target.value;
                  setFilters(updatedFilters);
                }}
              >
                <option value="equals">=</option>
                <option value=">">{">"}</option>
                <option value="<">{"<"}</option>
              </Input>
            </Col>
            <Col md={5}>
              <Input
                type="text"
                value={filter.value}
                onChange={(e) => {
                  const updatedFilters = [...filters];
                  updatedFilters[index].value = e.target.value;
                  setFilters(updatedFilters);
                }}
              />
            </Col>
          </Row>
        ))}
        <Row dir="rtl" className="mt-2">
          <Col md={1}>
            <Button color="info" onClick={addFilter}>+</Button>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Row>
          <Col md={12}>
            <Button color="success" onClick={applyFilters}>
              Apply Filters
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default FilterExample;
