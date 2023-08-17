import "./TextInput2.scss";
import { Input, Row } from "antd";
import { ChangeEvent, useCallback } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface TextInputProps {
  errors: boolean;
  touched: boolean;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  handleBlur?: (e: string | ChangeEvent<any>) => void;
  name: string;
}

export function TextInput2({
  errors,
  touched,
  label,
  handleChange,
  placeholder,
  value,
  handleBlur,
  name,
  type = "text",
}: TextInputProps): JSX.Element {
  const renderPasswordIcon = useCallback(
    (visible: boolean): React.ReactNode =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
    []
  );

  // let a = (document.getElementsByClassName(
  //   "ant-input-clear-icon"
  // ).style.visibility = "visible");

  return (
    <Row className="input-container">
      <div className="label-container">
        <div className="input-label">{label}</div>
      </div>
      {type === "text" && (
        <Input
          type="text"
          name={name}
          className={"input"}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          allowClear={true}
          style={{
            height: "45px",
            border: errors && touched ? "1px solid red" : "1px solid #ccc",
          }}
        />
      )}
      {type === "password" && (
        <Input.Password
          type="password"
          name={name}
          className={"input"}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          iconRender={renderPasswordIcon}
          style={{
            height: "45px",
            border: errors && touched ? "1px solid red" : "1px solid #ccc",
          }}
        />
      )}
      {type === "textArea" && (
        <Input.TextArea
          name={name}
          className={"input"}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          allowClear={true}
          rows={3}
          style={{
            border: errors && touched ? "1px solid red" : "1px solid #ccc",
          }}
        />
      )}
    </Row>
  );
}
