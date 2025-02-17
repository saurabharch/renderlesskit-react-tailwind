export const badge = {
  base:
    "lib:inline-block lib:whitespace-nowrap lib:align-middle lib:rounded-full lib:transition-all",
  attached: "absolute",
  attachedParent: "relative",
  position: {
    "top-right": "-top-0 -right-0 transform translate-x-1/2 -translate-y-1/2",
    "top-left": "-top-0 -left-0 transform -translate-x-1/2 -translate-y-1/2",
    "bottom-right":
      "-bottom-0 -right-0 transform translate-x-1/2 translate-y-1/2",
    "bottom-left":
      "-bottom-0 -left-0 transform -translate-x-1/2 translate-y-1/2",
  },
  dot: {
    sm: "py-1.5",
    md: "py-2",
    lg: "py-2",
  },
  size: {
    sm: "lib:px-1.5 lib:text-xs lib:font-medium",
    md: "lib:px-2 lib:text-sm lib:font-medium",
    lg: "lib:px-2 lib:text-base lib:font-medium",
  },
  variant: {
    primary: "lib:bg-gray-800 lib:text-white",
    secondary: "lib:bg-gray-100 lib:text-gray-800",
    outline: "lib:text-gray-800 lib:border lib:border-gray-300 lib:bg-white",
    ghost: "lib:text-gray-800 lib:hover:bg-gray-100",
  },
};
