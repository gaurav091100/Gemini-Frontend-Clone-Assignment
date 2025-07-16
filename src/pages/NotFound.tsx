import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-7xl font-bold text-center">404</h1>
        <p className="text-gray-400 text-xs md:text-base">Page Not Found</p>
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 mt-3"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
