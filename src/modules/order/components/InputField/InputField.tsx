import styles from "./InputField.module.css";

type Placeholder = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ placeholder, value, onChange }: Placeholder) {
  return (
    <div className={styles.buttonWrapper}>
      <input type="text" placeholder={placeholder} className={styles.input} value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;
