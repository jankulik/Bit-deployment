import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    height: 'calc(100vh - 56px)',
    position: 'relative',
    paddingTop: 250,
    paddingBottom: 130,

    [theme.fn.smallerThan('xs')]: {
      paddingTop: '20vh',
      paddingBottom: 50,
    },
  },
}));
