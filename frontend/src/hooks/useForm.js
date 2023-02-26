import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "changeInput": {
      let validForm = true;
      for (let Name in state.inputs) {
        console.log("Name", Name);
        if (Name === action.name) {
          validForm = validForm && action.isValid;
        } else {
          validForm = validForm && state.inputs[Name].isValid;
        }
        
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isFormValid: validForm,
      };
    }

    default:
      return state;
  }
};
const useForm = (initInputs, initIsFormValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInputs,
    isFormValid: initIsFormValid,
  });
  const inputChangeHandler = useCallback((name, value, isValid) => {
    dispatch({
      type: "changeInput",
      value,
      isValid,
      name,
    });
  });
  return [formState, inputChangeHandler];
};

export default useForm;
