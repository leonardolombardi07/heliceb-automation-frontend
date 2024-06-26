"use client";

import React from "react";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SIUnit } from "@/app/modules/units";

type UnitSelectProps = SelectProps & {
  options: {
    key: string;
    value: SIUnit;
    label: SIUnit;
  }[];
};

export default function UnitSelect({ options, ...props }: UnitSelectProps) {
  return (
    <Select
      sx={{
        minWidth: 60,
        ...props.sx,
      }}
      disabled={options.length == 1}
      {...props}
      label={props.label || "Unit"}
    >
      {options.map((option) => (
        <MenuItem key={option.key} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
