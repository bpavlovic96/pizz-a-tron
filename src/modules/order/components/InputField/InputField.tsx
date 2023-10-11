import styles from "./InputField.module.css";

type Placeholder = {
  placeholder: string;
};

function InputField({ placeholder }: Placeholder) {
  return (
    <div className={styles.buttonWrapper}>
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
}

export default InputField;
