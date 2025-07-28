export const Card = ({
  children,
  gap = 4,
  bg = "white",
  p = 6,
  rounded = "2xl",
  shadow = "lg",
  borderColor = "slate-200",
}) => {
  return (
    <div
      className={
        `gap-${gap} ` +
        `bg-${bg} ` +
        `p-${p} ` +
        `rounded-${rounded} ` +
        `shadow-${shadow} ` +
        `border border-${borderColor}`
      }
    >
      {children}
    </div>
  );
};
