import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload';
import type { CSSProperties } from 'react';
import type { FileUploadFileChangeDetails } from '@ark-ui/react/file-upload';
import { color, fontSize, fontWeight, spacing } from '../../tokens/tokens';

export interface FileUploaderProps {
  /**
   * Maximum number of files that can be uploaded
   */
  maxFiles?: number;
  /**
   * Accepted file types (MIME type or extension string)
   */
  accept?: string;
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;
  /**
   * Whether the uploader is disabled
   */
  disabled?: boolean;
  /**
   * Called when accepted/rejected files change
   */
  onFileChange?: (details: FileUploadFileChangeDetails) => void;
  /**
   * Optional label text
   */
  label?: string;
  /**
   * Whether multiple files can be selected.
   * When true and `maxFiles` is omitted, defaults to 10.
   * When false and `maxFiles` is omitted, defaults to 1.
   */
  multiple?: boolean;
}

const rootStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing[4],
  width: '100%',
  maxWidth: '24rem',
  fontFamily: 'inherit',
};

const labelStyles: CSSProperties = {
  fontSize: fontSize[14],
  fontWeight: fontWeight.medium,
  color: color.slate700,
};

const dropzoneStyles: CSSProperties = {
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[3],
  minHeight: '10rem',
  padding: spacing[6],
  border: `2px dashed ${color.slate300}`,
  borderRadius: spacing[2],
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: color.slate50,
  boxSizing: 'border-box',
};

const dropzoneTitleStyles: CSSProperties = {
  fontSize: fontSize[14],
  fontWeight: fontWeight.medium,
  color: color.slate800,
  margin: 0,
};

const dropzoneDescriptionStyles: CSSProperties = {
  fontSize: fontSize[12],
  color: color.slate500,
  margin: 0,
};

const triggerStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: fontSize[14],
  fontWeight: fontWeight.medium,
  fontFamily: 'inherit',
  borderRadius: spacing[2],
  backgroundColor: color.white,
  border: `1px solid ${color.slate300}`,
  color: color.slate700,
  cursor: 'pointer',
};

const itemGroupStyles: CSSProperties = {
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const itemStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
  padding: spacing[3],
  backgroundColor: color.white,
  border: `1px solid ${color.slate300}`,
  borderRadius: spacing[2],
};

const itemNameStyles: CSSProperties = {
  flex: 1,
  minWidth: 0,
  fontSize: fontSize[14],
  fontWeight: fontWeight.medium,
  color: color.slate800,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const itemSizeStyles: CSSProperties = {
  fontSize: fontSize[12],
  color: color.slate500,
};

const deleteTriggerStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: spacing[6],
  height: spacing[6],
  padding: 0,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: spacing[1],
  color: color.slate500,
  cursor: 'pointer',
  fontSize: fontSize[14],
  flexShrink: 0,
};

/**
 * FileUploader component built with Ark UI FileUpload.
 */
const FileUploader = ({
  maxFiles,
  accept,
  maxFileSize,
  disabled = false,
  onFileChange,
  label,
  multiple = false,
}: FileUploaderProps) => {
  const resolvedMaxFiles = maxFiles ?? (multiple ? 10 : 1);

  return (
    <ArkFileUpload.Root
      style={rootStyles}
      maxFiles={resolvedMaxFiles}
      accept={accept}
      maxFileSize={maxFileSize}
      disabled={disabled}
      onFileChange={onFileChange}
    >
      {label ? (
        <ArkFileUpload.Label style={labelStyles}>{label}</ArkFileUpload.Label>
      ) : null}

      <ArkFileUpload.Dropzone style={dropzoneStyles}>
        <p style={dropzoneTitleStyles}>Drag and drop files here</p>
        <p style={dropzoneDescriptionStyles}>or click to browse</p>
        <ArkFileUpload.Trigger style={triggerStyles}>
          Choose file{resolvedMaxFiles > 1 ? 's' : ''}
        </ArkFileUpload.Trigger>
      </ArkFileUpload.Dropzone>

      <ArkFileUpload.ItemGroup style={itemGroupStyles}>
        <ArkFileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <ArkFileUpload.Item key={file.name} file={file} style={itemStyles}>
                <ArkFileUpload.ItemName style={itemNameStyles} />
                <ArkFileUpload.ItemSizeText style={itemSizeStyles} />
                <ArkFileUpload.ItemDeleteTrigger
                  style={deleteTriggerStyles}
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </ArkFileUpload.ItemDeleteTrigger>
              </ArkFileUpload.Item>
            ))
          }
        </ArkFileUpload.Context>
      </ArkFileUpload.ItemGroup>

      <ArkFileUpload.HiddenInput />
    </ArkFileUpload.Root>
  );
};

export default FileUploader;
