// components
import Uploader from "./Uploader";
import Input from "./Input";
import Textarea from "./Textarea";
import CheckBox from "./CheckBox";
import Select from "./Select";
import TextEditor from "./TextEditor";

// styles
import "./FormControl.css";

function FormControl(props) {
  switch (props.controler) {
    case "file": {
      return <Uploader {...props} />;
    }
    case "number":
    case "password":
    case "email":
    case "text": {
      return <Input {...props} />;
    }
    case "select": {
      return <Select {...props} />;
    }
    case "textarea": {
      return <Textarea {...props} />;
    }
    case "checkbox": {
      return <CheckBox {...props} />;
    }

    case "editor": {
      return <TextEditor {...props} />;
    }
    // case "password":
    //   break;

    default:
      return null;
  }
}

export default FormControl;
