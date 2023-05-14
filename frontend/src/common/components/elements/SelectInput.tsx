import clsx from "clsx";
import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { Dropdown, DropdownProps } from "primereact/dropdown";

interface Props extends DropdownProps {
  name: string;
  label?: string;
  options: string[];
}

const SelectInput: React.FC<Props> = ({
  name,
  id = name,
  label,
  className,
  options = [],
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
      <Dropdown
        id={id}
        {...input}
        disabled={isSubmitting}
        {...inputProps}
        options={options}
        onChange={(e) => setFieldValue(name, e.value)}
        className={clsx(
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

SelectInput.displayName = "SelectInput";
export default SelectInput;
