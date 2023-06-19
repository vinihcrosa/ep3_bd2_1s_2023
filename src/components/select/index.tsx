'use client'

import { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectExport({ label, data, value, setter }:any) {

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setter(
      value as string,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: '200px', height: '65px !important' } } size="medium">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {data.map((dataValue: any) => (
            <MenuItem key={dataValue} value={dataValue}>
              {dataValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}