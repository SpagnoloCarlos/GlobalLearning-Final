import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CustomForm = ({ onChange, options, label}) => {
  return (
      <Autocomplete
        id="tags-standard"
        options={options}
        onChange={onChange}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            required
            label={label}
            placeholder={`Select pet ${label}`}
          />
        )}
      />
  );
};

export default CustomForm;