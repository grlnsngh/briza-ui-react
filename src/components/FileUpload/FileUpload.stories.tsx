import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload, UploadedFile } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
      ],
    },
    docs: {
      description: {
        component: `
A comprehensive file upload component with drag-and-drop support, file validation, progress indicators, and previews.

## Features
- 📤 Drag-and-drop file upload with visual feedback
- 📁 Multiple file selection support
- 🔍 File type and size validation
- 📊 Upload progress indicators
- 🖼️ Image preview functionality
- ♿ Full WCAG 2.1 AA accessibility compliance
- 🎨 Light and dark theme support
- ⌨️ Keyboard navigation support

Use the interactive **Playground** story below to explore all available props and see the component in action.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the upload area",
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    multiple: {
      control: { type: "boolean" },
      description: "Whether to accept multiple files",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    accept: {
      control: { type: "text" },
      description: "Accepted file types (MIME types or extensions)",
      table: {
        type: { summary: "string | string[]" },
      },
    },
    maxSize: {
      control: { type: "number" },
      description: "Maximum file size in bytes",
      table: {
        type: { summary: "number" },
      },
    },
    maxFiles: {
      control: { type: "number" },
      description: "Maximum number of files allowed",
      table: {
        type: { summary: "number" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the upload is disabled",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    showPreview: {
      control: { type: "boolean" },
      description: "Whether to show file previews for images",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    showProgress: {
      control: { type: "boolean" },
      description: "Whether to show progress indicators",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    label: {
      control: { type: "text" },
      description: "Label text displayed above the upload area",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    description: {
      control: { type: "text" },
      description: "Description text shown below the label",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text shown below the upload area",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message displayed when validation fails",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    uploadText: {
      control: { type: "text" },
      description: "Custom text displayed in the upload area",
      table: {
        defaultValue: { summary: '"Click to upload or drag and drop"' },
        type: { summary: "string" },
      },
    },
    dragText: {
      control: { type: "text" },
      description: "Custom text displayed when dragging files",
      table: {
        defaultValue: { summary: '"Drop files here"' },
        type: { summary: "string" },
      },
    },
    isRequired: {
      control: { type: "boolean" },
      description: "Whether the field is required",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

/**
 * Default FileUpload component with basic configuration
 */
export const Default: Story = {
  args: {
    label: "Upload Files",
    helperText: "Select files from your device",
  },
};

/**
 * FileUpload with multiple file selection enabled
 */
export const MultipleFiles: Story = {
  args: {
    label: "Upload Multiple Files",
    description: "Select multiple files to upload at once",
    multiple: true,
    helperText: "You can select or drag multiple files",
  },
};

/**
 * FileUpload with image-only restriction
 */
export const ImagesOnly: Story = {
  args: {
    label: "Upload Images",
    description: "Only image files are accepted",
    accept: "image/*",
    multiple: true,
    showPreview: true,
    helperText: "PNG, JPG, GIF up to 10MB",
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

/**
 * FileUpload with specific file type restrictions
 */
export const DocumentsOnly: Story = {
  args: {
    label: "Upload Documents",
    description: "Upload PDF or Word documents",
    accept: [".pdf", ".doc", ".docx"],
    multiple: true,
    helperText: "PDF, DOC, DOCX files only",
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

/**
 * FileUpload with file size limit
 */
export const WithSizeLimit: Story = {
  args: {
    label: "Upload Small Files",
    description: "Maximum file size is 1MB",
    maxSize: 1024 * 1024, // 1MB
    multiple: true,
    helperText: "Files must be under 1MB",
  },
};

/**
 * FileUpload with maximum file count limit
 */
export const WithFileLimit: Story = {
  args: {
    label: "Upload Up to 3 Files",
    description: "You can upload a maximum of 3 files",
    multiple: true,
    maxFiles: 3,
    helperText: "Maximum 3 files allowed",
  },
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  args: {
    label: "Small Upload Area",
    size: "sm",
    helperText: "Compact upload area",
  },
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
  args: {
    label: "Large Upload Area",
    size: "lg",
    helperText: "Spacious upload area",
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: "Upload Disabled",
    disabled: true,
    helperText: "File upload is currently disabled",
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: "Upload Files",
    errorMessage: "An error occurred while uploading files",
    helperText: "Please try again",
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    label: "Upload Required Files",
    isRequired: true,
    helperText: "This field is required",
  },
};

/**
 * Without preview (for all file types)
 */
export const WithoutPreview: Story = {
  args: {
    label: "Upload Without Preview",
    description: "Files will be listed without image previews",
    multiple: true,
    showPreview: false,
    helperText: "All file types accepted",
  },
};

/**
 * Without progress indicators
 */
export const WithoutProgress: Story = {
  args: {
    label: "Upload Without Progress",
    description: "Progress bars are hidden",
    multiple: true,
    showProgress: false,
    onUpload: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};

/**
 * Custom upload text
 */
export const CustomText: Story = {
  args: {
    label: "Upload Your Documents",
    uploadText: "📂 Click here or drag files to upload",
    dragText: "🎯 Release to upload files",
    helperText: "Custom text for upload actions",
  },
};

/**
 * Controlled component with state management
 */
export const Controlled: Story = {
  render: (args) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div>
        <FileUpload
          {...args}
          files={files}
          onFilesChange={setFiles}
          label="Controlled File Upload"
          description="This component's state is controlled externally"
          multiple
          helperText={`${files.length} file(s) selected`}
        />
        <div style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
          <strong>Current files:</strong>
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                {file.file.name} - {file.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * With upload handler and callbacks
 */
export const WithUploadHandler: Story = {
  render: (args) => {
    const [status, setStatus] = useState<string>("Ready to upload");

    const handleUpload = async (files: File[]) => {
      setStatus(`Uploading ${files.length} file(s)...`);
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus(`Successfully uploaded ${files.length} file(s)`);
    };

    const handleError = (error: string, file?: File) => {
      setStatus(`Error: ${error}${file ? ` (${file.name})` : ""}`);
    };

    return (
      <div>
        <FileUpload
          {...args}
          label="Upload with Handler"
          description="Files will be automatically uploaded when selected"
          multiple
          onUpload={handleUpload}
          onError={handleError}
          helperText="Select files to start upload"
        />
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: "0.25rem",
            backgroundColor: "#f3f4f6",
            fontSize: "0.875rem",
          }}
        >
          <strong>Status:</strong> {status}
        </div>
      </div>
    );
  },
};

/**
 * With custom validation
 */
export const WithCustomValidation: Story = {
  render: (args) => {
    const [errors, setErrors] = useState<string[]>([]);

    const validateFile = (file: File): string | undefined => {
      // Example: Only allow files with specific naming convention
      if (!file.name.match(/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/)) {
        return "File name can only contain letters, numbers, hyphens, and underscores";
      }
      return undefined;
    };

    const handleError = (error: string, file?: File) => {
      setErrors((prev) => [
        ...prev,
        `${error}${file ? ` (${file.name})` : ""}`,
      ]);
      setTimeout(() => {
        setErrors((prev) => prev.slice(1));
      }, 5000);
    };

    return (
      <div>
        <FileUpload
          {...args}
          label="Upload with Custom Validation"
          description="Files must have alphanumeric names only"
          multiple
          validateFile={validateFile}
          onError={handleError}
          helperText="File names: letters, numbers, hyphens, underscores only"
        />
        {errors.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "0.25rem",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              fontSize: "0.875rem",
            }}
          >
            <strong>Validation Errors:</strong>
            <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.5rem" }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Interactive playground for testing all features
 */
export const Playground: Story = {
  args: {
    label: "File Upload Playground",
    description: "Test all features with the controls below",
    helperText: "Drag and drop or click to select files",
    size: "md",
    multiple: true,
    showPreview: true,
    showProgress: true,
    disabled: false,
    isRequired: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
  },
};

/**
 * Complete form example with file upload
 */
export const InForm: Story = {
  render: (args) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      files: [] as UploadedFile[],
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      alert(
        `Form submitted with ${formData.files.length} file(s) from ${formData.name}`
      );
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.25rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.25rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <FileUpload
            {...args}
            label="Attachments"
            description="Upload supporting documents"
            multiple
            files={formData.files}
            onFilesChange={(files) => setFormData({ ...formData, files })}
            helperText="PDF, DOC, or images up to 5MB each"
            accept={["image/*", ".pdf", ".doc", ".docx"]}
            maxSize={5 * 1024 * 1024}
            isRequired
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Submit Form
        </button>
      </form>
    );
  },
};
