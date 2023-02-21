import React from 'react';
import Head from 'next/head';
import { useStyles } from '../styles/home.styles';
import DropzoneButton from '../components/Dropzone';

export default function Home() {
  const { classes, theme } = useStyles();
  
  return (
    <>
      <Head>
        <title>Deployed Model</title>
      </Head>
      <div>
        <DropzoneButton />
      </div>
    </>
  )
}
