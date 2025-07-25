import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const NewMemberForm = ({ addMember }) => {
  const initialForm = {
    fullName: "",
    email: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      addMember({ ...formData, id: data.id });
      setFormData(initialForm); // form sıfırlanıyor
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="fullName">Ad Soyad</Label>
        <Input
          type="text"
          name="fullName"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="notes">Notlar</Label>
        <Input
          type="textarea"
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Kaydet
      </Button>
    </Form>
  );
};

export default NewMemberForm;
