import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export const DeleteButton = ({
  handleDelete,
  id,
}: {
  handleDelete: (id: number) => void;
  id: number;
}) => {
  return (
    <Button
      onClick={() => {
        handleDelete(id);
      }}
      sx={{
        position: "absolute",
        top: "10px",
        right: "0px",
        padding: 0,
      }}
    >
      <CancelIcon sx={{ fill: "gray" }} />
    </Button>
  );
};
