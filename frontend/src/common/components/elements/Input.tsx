import clsx from "clsx";
import React, { forwardRef, PropsWithoutRef } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { InputText } from "primereact/inputtext";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  type?: "text" | "password" | "email" | "number" | "url";
  name: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, id = name, label, className, ...inputProps }, ref) => {
    const [input] = useField(name);
    const { isSubmitting } = useFormikContext();

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

        <InputText
          id={id}
          {...input}
          disabled={isSubmitting}
          {...inputProps}
          ref={ref}
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
  }
);

Input.displayName = "Input";
export default Input;
