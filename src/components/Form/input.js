import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { TextField } from "@material-ui/core";
import InputMask from "react-input-mask";

export default function Input({ name, value, onChange, mask, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      {mask ? (
        <InputMask mask={mask} value={value} onChange={onChange}>
          <TextField
            inputRef={inputRef}
            defaultValue={defaultValue}
            variant="outlined"
            margin="normal"
            autoFocus
            {...rest}
          />
        </InputMask>
      ) : (
        <TextField
          inputRef={inputRef}
          defaultValue={defaultValue}
          variant="outlined"
          margin="normal"
          autoFocus
          {...rest}
        />
      )}
    </>
  );
}
