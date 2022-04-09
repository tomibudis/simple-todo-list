import React, { useMemo } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant, isLoading, ...props }) => {
  const btnColor = useMemo(() => {
    switch (variant) {
      case "primary":
        return "bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500";
      case "secondary":
        return "border-gray-300 bg-white hover:bg-gray-50 focus:ring-indigo-500";
    }
  }, [variant]);

  return (
    <button
      type="button"
      className={
        "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 file:text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm " +
        btnColor
      }
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className={`animate-spin -ml-1 mr-3 h-5 w-5 ${
            variant === "primary" ? "text-teal-300" : "text-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {props.children}
    </button>
  );
};

export default Button;
