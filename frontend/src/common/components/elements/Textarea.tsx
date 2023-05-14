import React, { forwardRef, PropsWithoutRef } from "react";
import { ErrorMessage, useField } from "formik";
import { useFormikContext } from "formik";
import clsx from "clsx";
import { InputTextarea } from "primereact/inputtextarea";

interface Props extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  id?: string;
  name: string;
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, id = name, label, ...props }, ref) => {
    const [input] = useField(name);
    const { isSubmitting } = useFormikContext();

    return (
      <div className="w-full grid gap-1">
        {!!label && (
          <label className="text-lg font-medium text-gray-700 dark:text-gray-200">
            {label} {props.required && "*"}
          </label>
        )}

        <InputTextarea
          id={id}
          {...input}
          disabled={isSubmitting}
          {...props}
          ref={ref}
          rows={4}
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
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
