import clsx from "clsx";
import React from "react";
import { Formik, FormikProps, FormikConfig, FormikHelpers } from "formik";
import { Button } from "primereact/button";

interface Component<T = {}>
  extends React.FC<
    {
      className?: string;
      children?: React.ReactNode;
    } & T
  > {}

interface SubComponent {
  Row: Component;
  Grid: Component;
}

interface OnSubmitResult {
  [key: string]: any;
}

export interface FormProps<S = any> {
  className?: string;
  schema?: FormikConfig<S>["validationSchema"];
  onSubmit?: (
    values: S,
    reset: () => void,
    helpers: FormikHelpers<S>
  ) => Promise<void | OnSubmitResult>;
  initialValues?: FormikProps<S>["initialValues"];
  submitButton?: { title: string; Icon?: any };
  resetButton?: { title: string; Icon?: any };
  actionClassName?: string;
  children?: React.ReactNode;
}

const Form: React.FC<FormProps & React.FormHTMLAttributes<HTMLFormElement>> &
  SubComponent = ({
  className,
  actionClassName,
  initialValues = {},
  schema,
  onSubmit,
  children,
  submitButton,
  resetButton,
  ...props
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, helpers) => {
        const reset = () => {
          helpers.resetForm({});
        };

        const errors = (await onSubmit?.(values, reset, helpers)) || {};

        if (Object.keys(errors).length > 0) {
          helpers.setErrors(errors);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, handleReset, isValid, dirty }) => (
        <form
          className={clsx("grid gap-y-5 w-full", className)}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}

          {(submitButton || resetButton) && (
            <div className={clsx("flex gap-x-4", actionClassName)}>
              {submitButton?.title && (
                <Button
                  type="submit"
                  className="gap-2"
                  icon={submitButton.Icon}
                  severity="success"
                  disabled={!(isValid && dirty)}
                  loading={isSubmitting}
                >
                  {submitButton.title}
                </Button>
              )}

              {resetButton?.title && (
                <Button
                  severity="danger"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  icon={resetButton.Icon}
                  type="reset"
                >
                  {resetButton.title}
                </Button>
              )}
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

Form.Row = ({ className, children }) => (
  <div className={clsx("grid gap-5", className)}>{children}</div>
);

Form.Grid = ({ className, children }) => (
  <div className={clsx("grid gap-5 sm:grid-cols-2", className)}>{children}</div>
);

Form.Grid.displayName = "Grid";

Form.Row.displayName = "Row";

Form.displayName = "Form";
export default Form;
