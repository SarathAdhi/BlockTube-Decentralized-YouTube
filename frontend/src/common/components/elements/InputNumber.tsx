import clsx from "clsx";
import React, { forwardRef, PropsWithoutRef } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import {
  InputNumber as InputNumberPR,
  InputNumberProps,
} from "primereact/inputnumber";

interface Props extends InputNumberProps {
  type?: "text" | "password" | "email" | "number" | "url";
  name: string;
  label?: string;
}

const InputNumber: React.FC<Props> = ({
  name,
  id = name,
  label,
  className,
  ...inputProps
}) => {
  const [input] = useField(name);
  const { isSubmitting, setFieldValue } = useFormikContext();

  return (
    <div className="w-full grid gap-1">
      {!!label && (
        <label
          htmlFor={id}
          className="text-lg font-medium text-gray-700 dark:text-gray-200"
        >
          {label} {inputProps.required && "*"}
        </label>
      )}

      <InputNumberPR
        id={id}
        {...input}
        disabled={isSubmitting}
        {...inputProps}
        onChange={(e) => setFieldValue(name, e.value)}
        className={clsx(
          "!w-full",
          !inputProps.disabled &&
            !inputProps.readOnly &&
            "focus:ring-primary-500 focus:border-primary-500",
          className
        )}
      />

      <ErrorMessage name={name}>
        {(msg) => (
          <div
            role="alert"
            className="mt-1 text-[13px] font-medium text-red-500 animate-slide-down"
          >
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

InputNumber.displayName = "InputNumber";
export default InputNumber;
