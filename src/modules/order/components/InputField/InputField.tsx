import React, { ForwardedRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import styles from "./InputField.module.css";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
};

const InputField = React.forwardRef(({ error, ...rest }: InputFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div>
      <div className={styles.buttonWrapper} style={{ border: error ? "1px solid red" : undefined }}>
        <input ref={ref} type="text" className={styles.input} {...rest} />
      </div>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
});

export default InputField;
