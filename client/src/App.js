import './App.css';
import { useState } from 'react';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import AddPet from './components/AddPet/AddPet';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';

function App() {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = () => {
    setFlag(!flag);
  };

  return (
    <div className='App'>
      <h1>Test</h1>
      <Button variant='contained' onClick={handleOpen}>
        Open Dialog
      </Button>
      <Switch value={flag} onChange={handleChange} />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <AddPet />
      </Dialog>
    </div>
  );
}

export default App;
