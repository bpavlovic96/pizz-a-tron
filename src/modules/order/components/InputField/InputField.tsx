import { FieldError } from "react-hook-form";
import styles from "./InputField.module.css";
import { forwardRef } from "react";

const InputField = forwardRef(
  (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
      error?: FieldError;
    },
    ref
  ) => {
    const { error, ...rest } = props;
    console.log(error);
    return (
      <div>
        <div className={styles.buttonWrapper} style={{ border: error ? "1px solid red" : undefined }}>
          <input ref={ref} type="text" className={styles.input} {...rest} />
        </div>
        {error && <span className={styles.error}>{error.message}</span>}
      </div>
    );
  }
);

export default InputField;
