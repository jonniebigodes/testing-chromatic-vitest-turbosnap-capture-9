import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import FileUploader from './FileUploader';

const meta = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxFiles: { control: 'number' },
    accept: { control: 'text' },
    maxFileSize: { control: 'number' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    onFileChange: fn(),
    label: 'Upload files',
  },
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Documents' },
};

export const WithoutLabel: Story = {
  args: { label: undefined },
};

export const SingleFile: Story = {
  args: { multiple: false, maxFiles: 1, label: 'Single file' },
};

export const MultipleFiles: Story = {
  args: { multiple: true, label: 'Multiple files' },
};

export const MaxTwoFiles: Story = {
  args: { maxFiles: 2, multiple: true, label: 'Max 2' },
};

export const MaxThreeFiles: Story = {
  args: { maxFiles: 3, multiple: true, label: 'Max 3' },
};

export const MaxFiveFiles: Story = {
  args: { maxFiles: 5, multiple: true, label: 'Max 5' },
};

export const MaxTenFiles: Story = {
  args: { maxFiles: 10, multiple: true, label: 'Max 10' },
};

export const AcceptImages: Story = {
  args: { accept: 'image/*', label: 'Images only', multiple: true },
};

export const AcceptPdf: Story = {
  args: { accept: 'application/pdf', label: 'PDF only' },
};

export const AcceptText: Story = {
  args: { accept: 'text/plain', label: 'Text files' },
};

export const AcceptCsv: Story = {
  args: { accept: 'text/csv', label: 'CSV files', multiple: true },
};

export const AcceptJson: Story = {
  args: { accept: 'application/json', label: 'JSON files' },
};

export const AcceptVideo: Story = {
  args: { accept: 'video/*', label: 'Videos', multiple: true },
};

export const AcceptAudio: Story = {
  args: { accept: 'audio/*', label: 'Audio', multiple: true },
};

export const SmallMaxSize: Story = {
  args: { maxFileSize: 1024, label: 'Max 1KB' },
};

export const OneMbMaxSize: Story = {
  args: { maxFileSize: 1024 * 1024, label: 'Max 1MB', multiple: true },
};

export const FiveMbMaxSize: Story = {
  args: { maxFileSize: 5 * 1024 * 1024, label: 'Max 5MB', multiple: true },
};

export const TenMbMaxSize: Story = {
  args: { maxFileSize: 10 * 1024 * 1024, label: 'Max 10MB' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const DisabledMultiple: Story = {
  args: { disabled: true, multiple: true, label: 'Disabled multiple' },
};

export const DisabledImages: Story = {
  args: { disabled: true, accept: 'image/*', label: 'Disabled images' },
};

export const ShortLabel: Story = {
  args: { label: 'Files' },
};

export const LongLabel: Story = {
  args: {
    label: 'Upload supporting documents for your application review',
  },
};

export const AvatarUpload: Story = {
  args: { accept: 'image/*', maxFiles: 1, label: 'Profile photo' },
};

export const GalleryUpload: Story = {
  args: { accept: 'image/*', maxFiles: 8, multiple: true, label: 'Gallery' },
};

export const ResumeUpload: Story = {
  args: { accept: 'application/pdf', maxFiles: 1, label: 'Resume' },
};

export const Attachments: Story = {
  args: { multiple: true, maxFiles: 5, label: 'Attachments' },
};

export const SpreadsheetUpload: Story = {
  args: {
    accept: 'text/csv,application/vnd.ms-excel',
    label: 'Spreadsheet',
    multiple: true,
  },
};

export const TinyFilesOnly: Story = {
  args: { maxFileSize: 512, label: 'Tiny files (512B)', multiple: true },
};

export const LargeFilesAllowed: Story = {
  args: { maxFileSize: 50 * 1024 * 1024, label: 'Up to 50MB', multiple: true },
};

export const ImagesAndPdf: Story = {
  args: {
    accept: 'image/*,application/pdf',
    multiple: true,
    label: 'Images or PDF',
  },
};

export const SingleImageOneMb: Story = {
  args: {
    accept: 'image/*',
    maxFiles: 1,
    maxFileSize: 1024 * 1024,
    label: 'Avatar ≤1MB',
  },
};

export const MultipleImagesFiveMb: Story = {
  args: {
    accept: 'image/*',
    maxFiles: 5,
    maxFileSize: 5 * 1024 * 1024,
    multiple: true,
    label: 'Photos ≤5MB',
  },
};

export const DocsThreeMax: Story = {
  args: {
    accept: 'application/pdf,text/plain',
    maxFiles: 3,
    multiple: true,
    label: 'Documents (max 3)',
  },
};

export const MediaBundle: Story = {
  args: {
    accept: 'image/*,video/*,audio/*',
    maxFiles: 10,
    multiple: true,
    label: 'Media bundle',
  },
};

export const NoMultipleExplicitOne: Story = {
  args: { multiple: false, label: 'Explicit single' },
};

export const MultipleWithoutMaxFiles: Story = {
  args: { multiple: true, label: 'Multiple default max' },
};

export const MaxFilesOverrides: Story = {
  args: { multiple: false, maxFiles: 4, label: 'Max files wins' },
};

export const DisabledWithAccept: Story = {
  args: {
    disabled: true,
    accept: 'application/pdf',
    label: 'Locked PDF slot',
  },
};

export const DisabledWithMaxSize: Story = {
  args: {
    disabled: true,
    maxFileSize: 1024 * 1024,
    label: 'Locked 1MB',
  },
};

export const KitchenSinkOpen: Story = {
  args: {
    label: 'Kitchen sink',
    multiple: true,
    maxFiles: 5,
    accept: 'image/*',
    maxFileSize: 5 * 1024 * 1024,
    disabled: false,
  },
};

export const KitchenSinkLocked: Story = {
  args: {
    label: 'Kitchen sink locked',
    multiple: true,
    maxFiles: 5,
    accept: 'image/*',
    maxFileSize: 5 * 1024 * 1024,
    disabled: true,
  },
};

export const CompactLabelUpload: Story = {
  args: { label: 'Upload', maxFiles: 1 },
};

export const EvidenceUpload: Story = {
  args: {
    label: 'Evidence files',
    accept: 'image/*,application/pdf',
    maxFiles: 6,
    multiple: true,
  },
};

export const InvoiceUpload: Story = {
  args: { label: 'Invoice', accept: 'application/pdf', maxFiles: 1 },
};

export const ScreenshotUpload: Story = {
  args: {
    label: 'Screenshots',
    accept: 'image/png,image/jpeg',
    multiple: true,
    maxFiles: 4,
  },
};

export const DatasetUpload: Story = {
  args: {
    label: 'Dataset',
    accept: 'text/csv,application/json',
    maxFiles: 2,
    multiple: true,
    maxFileSize: 20 * 1024 * 1024,
  },
};

export const UnlimitedFeel: Story = {
  args: { multiple: true, maxFiles: 20, label: 'Many files' },
};
