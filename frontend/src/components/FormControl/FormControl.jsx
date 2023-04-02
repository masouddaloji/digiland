import React, { useContext, useRef, useState } from "react";
// packages
import { Field, useField, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";

// components
import Validator from "../Validator/Validator";
import { persianTexts } from "../../text";
import Uploader from "./Uploader";
import Input from "./Input";
import SelectBox from "./SelectBox";
import Textarea from "./Textarea";
import CheckBox from "./CheckBox";
import Editor from "./Editor";

// contexts
import { AuthContext } from "../../Context/AuthContext";
// icons
import { FiChevronDown } from "react-icons/fi";

// styles
import "./FormControl.css";



function FormControl(props) {

  switch (props.type) {

    case "file": {
     return <Uploader {...props}  />;
     
    }
    case "number":
    case "password":
    case "email":
    case "text": {
      return <Input {...props} />
    }
    case "select": {
      return <SelectBox {...props}/>
    }
    case "textarea": {
      return <Textarea {...props} />
    }
    case "checkbox": {
      return <CheckBox {...props}/>
    }
    case "editor": {
      return <Editor {...props} />
    }
    // case "password":
    //   break;

    default:
      return null;
  }

}

export default FormControl;
