import { useNavigate } from "react-router";
import "./styles.scss";
import { Button } from "@/components/ui/button";

export const NotFoundView = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-view">
      <div className="not-found-view__block">
        <p>404 NOT FOUND</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};
