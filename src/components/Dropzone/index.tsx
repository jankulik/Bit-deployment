import { useRef } from 'react';
import { Text, Group, Button } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useStyles } from './styles';

interface DropzoneButtonProps {
  handleUpload(textData: string): any;
}

export default function DropzoneButton({ handleUpload }: DropzoneButtonProps) {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.csv]}
        maxSize={30 * 1024 ** 2}
        onDrop={(file) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = function (event: any) {
              const text = event.target.result;
              handleUpload(text);
            };

            reader.readAsText(file[0]);
          }
        }}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>CSV file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload data</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag and drop the file here to upload. We can accept only <i>.csv</i> files that
            follow the template and are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}
