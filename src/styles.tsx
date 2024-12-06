// src/styles.ts
import { SxProps, Theme } from '@mui/system';
import backgroundImage from './img/background.jpg';

export const bodyStyles: SxProps<Theme> = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

export const cardContainerStyles: SxProps<Theme> = {
  backgroundColor: 'white',
  padding: 4,
  borderRadius: 2,
  boxShadow: 3,
  maxWidth: 600,
  width: '100%',
};

export const calculatorBoxStyles: SxProps<Theme> = {
    display: 'flex',
    gap: 2,
    marginBottom: 3,
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

export const formInputStyles: SxProps<Theme> = {
  padding: '10px',
  width: '45%',
};

export const formButtonStyles: SxProps<Theme> = {
  marginBottom: 2,
};

export const TextColorGreenStyles: SxProps<Theme> = {
    color: 'green',
  };
  
  export const TextColorRedStyles: SxProps<Theme> = {
    color: 'red',
  };

