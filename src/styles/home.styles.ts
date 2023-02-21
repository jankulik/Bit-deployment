import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    width: '750px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // rowGap: '20px',

    [theme.fn.smallerThan('sm')]: {
      width: '94vw',
    },
  },

  control: {
    width: 250,
    bottom: -20,
  },
}));
