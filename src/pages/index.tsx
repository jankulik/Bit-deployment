import React from 'react';
import Head from 'next/head';
import { useStyles } from '../styles/home.styles';
import DropzoneButton from '../components/Dropzone';

export default function Home() {
  const { classes, theme } = useStyles();
  
//   try {
//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("x", x.toString());
//     formData.append("y", y.toString());
//     formData.append("width", width.toString());
//     formData.append("height", height.toString());

//     const response = await fetch("/api/process/upload-profile-picture", {
//       method: "POST",
//       body: formData,
//     });

//     if(response.status == 200) {
//       showNotification({
//         title: "Success",
//         message: "Profile picture updated successfully. Refresh the page to see changes.",
//         color: "green",
//       });
//     } else {
//       showNotification({
//         title: "Error",
//         message: "An error occurred while updating profile picture.",
//         color: "red",
//       });
//     }
//   } catch(e) {
//     showNotification({
//       title: "Error",
//       message: "An error occurred while updating profile picture.",
//       color: "red",
//     });
//   }
// }

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
