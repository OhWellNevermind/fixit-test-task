import { BillCard } from "./components/BillCard/BillCard";
import { Alert, Container } from "@mui/material";
import { stateSchema } from "./types/stateTypes";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const BILLS_LIMIT = 5;

import { useState } from "react";

const initState = {
  amount: "0.00",
  fromAccount: "",
  payee: "",
  date: new Date(),
  repeat: "",
  note: "",
};

function App() {
  const [isValidated, setIsValidated] = useState(false);
  const [reachedLimit, setReachedLimit] = useState(false);
  const [bills, setBills] = useState([
    {
      id: 1,
      state: initState,
    },
  ]);

  const handleStateSave = (newState: { id: number; state: stateSchema }) => {
    const indexOfBill = bills.findIndex((bill) => bill.id === newState.id);
    if (indexOfBill !== -1) {
      const newBills = [...bills];
      newBills[indexOfBill] = newState;
      console.log(bills);
      setBills(newBills);
    }
  };

  const handleDelete = (billId: number) => {
    const indexOfBill = bills.findIndex((bill) => bill.id === billId);
    if (indexOfBill !== -1) {
      const newBills = [...bills];
      newBills.splice(indexOfBill, 1);
      setBills(newBills);
      setReachedLimit(false);
    }
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: 10,
        }}
      >
        {bills.map((bill) => (
          <BillCard
            key={bill.id}
            bill={bill}
            handleStateSave={handleStateSave}
            setIsValidated={setIsValidated}
            deletable={Boolean(bills.length - 1)}
            handleDelete={handleDelete}
          />
        ))}

        <Button
          onClick={() => {
            if (bills.length === BILLS_LIMIT) {
              setReachedLimit(true);
              return;
            }
            setIsValidated(false);
            setBills([
              ...bills,
              { id: bills[bills.length - 1].id + 1, state: initState },
            ]);
          }}
          disabled={!isValidated || reachedLimit}
          sx={{
            marginTop: "20px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            marginBottom: "15px",
          }}
          variant="outlined"
        >
          <AddRoundedIcon />
          Add Another Bill
        </Button>
        {reachedLimit && (
          <Alert severity="warning">You reached to the limit of bills</Alert>
        )}
      </Container>
    </>
  );
}

export default App;
