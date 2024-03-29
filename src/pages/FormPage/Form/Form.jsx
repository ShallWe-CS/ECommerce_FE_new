import { useState } from "react";
import "./Form.css";
import FormInput from "../FormInput/FormInput";

const Form = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      // name: "username",
      // type: "text",
      // placeholder: "Username",
      // errorMessage:
      //   "Username should be 3-16 characters and shouldn't include any special character!",
      // label: "Username",
      // pattern: "^[A-Za-z0-9]{3,16}$",
      // required: true,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "firstname",
      type: "text",
      placeholder: "First Name",
      // errorMessage:
        // "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Firstname",
      // pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,

    },
    {
      id: 3,
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
      label: "Lastname",
      required: true,
      // name: "birthday",
      // type: "date",
      // placeholder: "Birthday",
      // label: "Birthday",
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
      required: true,
      // name: "password",
      // type: "password",
      // placeholder: "Password",
      // errorMessage:
      //   "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      // label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      // required: true,
    },
    {
      id: 5,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      label: "Phone",
      required: true,
      // name: "confirmPassword",
      // type: "password",
      // placeholder: "Confirm Password",
      // errorMessage: "Passwords don't match!",
      // label: "Confirm Password",
      // pattern: values.password,
      // required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="formApp">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="formButton">Submit</button>
      </form>
    </div>
  );
};

export default Form;