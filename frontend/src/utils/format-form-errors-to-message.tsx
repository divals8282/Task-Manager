import type { JSX } from "react";
import type { FieldErrors } from "react-hook-form";

export const formatFormErrorsToMessage = (errors: FieldErrors) => {
  const message: JSX.Element[] = [];

  for (const field in errors) {
    if (errors[field]?.message === undefined) continue;

    message.push(
      <p className="text-destructive" key={field}>{`${field.toUpperCase()}: ${
        errors[field]?.message
      }`}</p>
    );
  }

  return message;
};
