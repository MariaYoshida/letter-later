import { Loader2 } from "lucide-react";

const Spinner = ({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2
        className="animate-spin text-blue-500"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Spinner;
