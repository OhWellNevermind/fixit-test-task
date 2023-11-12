import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { enUS } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormHelperText, InputLabel, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

import * as yup from "yup";
import { useFormik } from "formik";

import dayjs from "dayjs";
import "dayjs/locale/en";

import { Divider, Form, SelectMenuItem, CustomDiv } from "./FormCard.styled.js";
import { fromAccounts } from "../../data/fromAccounts.js";
import { billType, stateSchema } from "../../types/stateTypes.js";
import { DeleteButton } from "../DeleteButton/DeleteButton.js";

const billSchema = yup.object({
  amount: yup.string().required("Amount is required field"),
  fromAccount: yup.string().required("Please select an account"),
  payee: yup.string().required("Please select an payee"),
  date: yup.date().required("Date is required"),
  repeat: yup.string().required("Please select an repeat"),
  note: yup.string().required("Note is required"),
});

const parseNumber = (string: string): string => {
  return string.replace("$", "").replaceAll(".", "").replaceAll(",", "");
};

export const BillCard = ({
  setIsValidated,
  bill,
  handleStateSave,
  deletable,
  handleDelete,
}: {
  setIsValidated: (isValidated: boolean) => void;
  bill: billType;
  handleStateSave: (newState: { id: number; state: stateSchema }) => void;
  deletable: boolean;
  handleDelete: (id: number) => void;
}) => {
  const formik = useFormik({
    initialValues: bill.state,
    validationSchema: billSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleBlur = (e: React.FocusEvent) => {
    formik.handleBlur(e);
    setIsValidated(formik.isValid);
    if (formik.isValid) {
      formik.values.amount = parseNumber(formik.values.amount);
      handleStateSave({ id: bill.id, state: formik.values });
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      {deletable && <DeleteButton handleDelete={handleDelete} id={bill.id} />}
      <NumericFormat
        label="Amount"
        name="amount"
        prefix="$"
        thousandSeparator="."
        decimalSeparator=","
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={handleBlur}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount}
        FormHelperTextProps={{
          style: {
            margin: 0,
            paddingTop: 10,
            paddingLeft: 10,
          },
        }}
        sx={{
          backgroundColor: "transparent",
          border: "0px solid #001d3d",
          maxWidth: "400px",
          alignSelf: "center",
        }}
        InputLabelProps={{
          sx: {
            color: "#003566",
            textTransform: "capitalize",
            left: "50%",
            top: "-20%",
            transform: "translate(-50%)",
          },
        }}
        inputProps={{
          sx: {
            padding: 0,
            textAlign: "center",
            color: "#3457D5",
            fontSize: "50px",
          },
        }}
        InputProps={{
          sx: {
            fieldset: {
              borderWidth: "0",
            },
            "&:hover fieldset": {
              border: "0px",
              borderRadius: 0,
            },
            "&:focus-within fieldset, &:focus-visible fieldset": {
              border: "0px",
            },
          },
        }}
        customInput={TextField}
      />
      <Divider>
        <div>
          <InputLabel id="fromAccount">From Account</InputLabel>
          <Select
            variant="outlined"
            labelId="fromAccount"
            name="fromAccount"
            value={formik.values.fromAccount}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={
              formik.touched.fromAccount && Boolean(formik.errors.fromAccount)
            }
            sx={{
              width: "600px",
              maxHeight: "56px",
              fontWeight: "bold",
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    padding: 2,
                  },
                },
              },
            }}
          >
            {fromAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                <CustomDiv>
                  <SelectMenuItem>
                    <span>{account.name}</span>
                    <span>{`$${account.currentBalance}`}</span>
                  </SelectMenuItem>
                </CustomDiv>
              </MenuItem>
            ))}
          </Select>
          {formik.touched.fromAccount && formik.errors.fromAccount && (
            <FormHelperText
              sx={{ paddingTop: "10px", paddingLeft: "10px" }}
              error
            >
              {formik.errors.fromAccount}
            </FormHelperText>
          )}
        </div>
        <div>
          <InputLabel id="payee">Payee</InputLabel>
          <Select
            labelId="payee"
            name="payee"
            value={formik.values.payee}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.payee && Boolean(formik.errors.payee)}
            sx={{
              width: "600px",
              fontWeight: "bold",
            }}
          >
            <MenuItem value="userId1">Payee Name</MenuItem>
          </Select>
          {formik.touched.payee && formik.errors.payee && (
            <FormHelperText
              sx={{ paddingTop: "10px", paddingLeft: "10px" }}
              error
            >
              {formik.errors.payee}
            </FormHelperText>
          )}
        </div>
      </Divider>
      <Divider>
        <LocalizationProvider
          localeText={
            enUS.components.MuiLocalizationProvider.defaultProps.localeText
          }
          dateAdapter={AdapterDayjs}
          adapterLocale="en"
        >
          <DatePicker
            disablePast
            sx={{
              width: 400,
            }}
            label="Date"
            defaultValue={dayjs(formik.values.date)}
            onAccept={(e) => {
              formik.setFieldValue("date", e?.toString());
            }}
            format="MMM DD, YYYY"
          />
        </LocalizationProvider>
        <div>
          <Select
            name="repeat"
            value={formik.values.repeat}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.repeat && Boolean(formik.errors.repeat)}
            sx={{
              width: 400,
            }}
          >
            <MenuItem value="repeat1">
              Every Two Month, until{" "}
              {`${formik.values.date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
            </MenuItem>
            <MenuItem value="repeat2">
              Every Four Month, until{" "}
              {`${formik.values.date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
            </MenuItem>
          </Select>
          {formik.touched.repeat && formik.errors.repeat && (
            <FormHelperText
              sx={{ paddingTop: "10px", paddingLeft: "10px" }}
              error
            >
              {formik.errors.repeat}
            </FormHelperText>
          )}
        </div>
        <TextField
          name="note"
          inputProps={{
            maxLength: 31,
          }}
          sx={{ width: 400 }}
          helperText={
            (formik.touched.note && formik.errors.note) ||
            `${formik.values.note.length}/${31}`
          }
          onChange={formik.handleChange}
          onBlur={handleBlur}
          error={formik.touched.note && Boolean(formik.errors.note)}
          FormHelperTextProps={{
            style: {
              margin: 0,
              paddingTop: 10,
              paddingLeft: 10,
            },
          }}
          label="Note"
        />
      </Divider>
    </Form>
  );
};
