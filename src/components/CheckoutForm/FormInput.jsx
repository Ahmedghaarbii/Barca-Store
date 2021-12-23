import React from "react";
import { TextField, Grid, Input, Select, MenuItem } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            required={required}
          ></TextField>
        )}
        control={control}
        name={name}
        defaultValue={''}
      />
    </Grid>
  );
};

export default FormInput;
