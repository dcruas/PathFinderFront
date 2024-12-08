import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { bodyStyles, cardContainerStyles,calculatorBoxStyles, TextColorRedStyles,TextColorGreenStyles} from './styles';
import React, { useState } from 'react';
import { SkillCheckResponse } from './models/responses/SkillCheckResponse';
import { SkillCheckRequest } from './models/requests/SkillCheckRequest'; 
import  getPossiblyOutcomes from './services/skillCheckService';


const App: React.FC = () => {
  const [modifier, setModifier] = useState<string | number>(0);
  const [dc, setDc] = useState<string | number>(0);
  const [results, setResults] = useState<SkillCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openErrorNotification, setErrorNotification] = useState(false);

  const isValidNumbers = () => {
    if ((Number(modifier) < -100 || Number(modifier) > 100) || (Number(dc) < -100 || Number(dc) > 100)) {
      setError("Invalid value, only values between -100 and 100 are allowed");
      setErrorNotification(true);
      return false;
    }

    return true;
  };
  
  const handleApiCall = async () => {

    if (!await isValidNumbers()) {
      return;
    } 

    try {
      const skillCheckRequest: SkillCheckRequest = {
        modifier : Number(modifier),  
        dc : Number(dc)
      };
      
      const result = await getPossiblyOutcomes(skillCheckRequest);
      setResults({ ...result, dc: Number(dc), modifier: Number(modifier) });
      setError(null);
      setErrorNotification(false);
    } catch (err: any) {
      setError(err.message);
      setErrorNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setErrorNotification(false);
  };

  return (
    <Box id="body"
      sx={bodyStyles}
    >
      <Box id="calculatorBody"
        sx={cardContainerStyles}
      >
        <Typography id="calculatorHeader" variant="h4" component="h1" gutterBottom align="center" sx={{ fontFamily: '"Cinzel", sans-serif', ...TextColorRedStyles }}>
          Pathfinder Result Calculator
        </Typography>
       
        <Box id="calculatorForm"
          sx={calculatorBoxStyles}
        >
          <TextField
            label="Modifier"
            type="text"
            value={modifier}
            error={modifier === ""}
            helperText={modifier === "" ? 'Modifier must be filled' : ' '}
            onChange={(e) => {
              const value = e.target.value;
              if (/^-?\d*$/.test(value) || value === "-" || value === "") {  
                setModifier(value);
              }
            }}
            onBlur={() => {
             const finalValue = modifier === "-" || modifier === "" ? modifier : parseInt(modifier.toString(), 10);
             setModifier(finalValue);
            }}
            
          />
          <TextField
            label="DC"
            type="text"
            value={dc}
            error={dc === ""}
            helperText={dc === "" ? 'DC must be filled!' : ' '}
            onChange={(e) => {
              const value = e.target.value;
              if (/^-?\d*$/.test(value) || value === "-" || value === "") {
                setDc(value);
              }
            }}
            onBlur={() => {
              const finalValue = dc === "-" || dc === "" ? dc : parseInt(dc.toString(), 10);
              setDc(finalValue);
            }}
          />
          <Button variant="contained" onClick={handleApiCall} disabled={modifier === "" || dc === ""}>
            Generate Results
          </Button>
        </Box>

        {results && (
          <TableContainer id="calculatorResults" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Modifier</TableCell>
                  <TableCell align="center">DC</TableCell>
                  <TableCell align="center">Critical Success</TableCell>
                  <TableCell align="center">Success</TableCell>
                  <TableCell align="center">Failure</TableCell>
                  <TableCell align="center">Critical Failure</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                  <TableRow>
                    <TableCell align="center">
                      {results.modifier}  
                    </TableCell>
                    <TableCell align="center">
                      {results.dc}  
                    </TableCell>
                    <TableCell align="center" sx={{ ...TextColorGreenStyles, fontWeight: 'bold'}}>
                      {results.critical_success}
                    </TableCell>
                    <TableCell align="center" sx={TextColorGreenStyles}>
                      {results.success}
                    </TableCell>
                    <TableCell align="center" sx={TextColorRedStyles}>
                      {results.failure}
                    </TableCell>
                    <TableCell align="center" sx={{ ...TextColorRedStyles, fontWeight: 'bold' }}>
                      {results.critical_failure}
                    </TableCell>
                </TableRow>
            
            </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Snackbar
        open={openErrorNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
