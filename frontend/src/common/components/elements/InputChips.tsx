import clsx from "clsx";
import React, { forwardRef, PropsWithoutRef } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { Chips, ChipsProps } from "primereact/chips";

interface Props extends ChipsProps {
  name: string;
  label?: string;
}

const InputChips: React.FC<Props> = ({
  name,
  id = name,
  label,
  className,
  ...inputProps
}) => {
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

      <Chips
        id={id}
        {...input}
        disabled={isSubmitting}
        {...inputProps}
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
            className="mt-1 text-[13px] font-medium text-red-500 animate-slide-down -z-10"
          >
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default InputChips;
