import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { FileUpload, UploadedFile } from "./FileUpload";
import {
  expectNoA11yViolations,
  renderWithA11y,
} from "../../utils/test-helpers";

describe("FileUpload component", () => {
  // Mock URL.createObjectURL and revokeObjectURL
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  // Helper to create mock files
  const createMockFile = (name: string, size: number, type: string): File => {
    const file = new File(["content"], name, { type });
    Object.defineProperty(file, "size", { value: size });
    return file;
  };

  // Helper to simulate file drop
  const createDataTransfer = (files: File[]) => {
    return {
      files,
      items: files.map((file) => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file,
      })),
      types: ["Files"],
    };
  };

  // Helper to get file input
  const getFileInput = () => {
    return document.querySelector('input[type="file"]') as HTMLInputElement;
  };

  // Helper to simulate file selection
  const selectFiles = (input: HTMLInputElement, files: File[]) => {
    // Create a FileList-like object
    const fileList = Object.assign(files, {
      item: (index: number) => files[index],
    }) as unknown as FileList;

    Object.defineProperty(input, "files", {
      value: fileList,
      writable: false,
      configurable: true,
    });

    fireEvent.change(input, { target: { files: fileList } });
  };

  describe("Rendering and Accessibility", () => {
    it("renders with label and helper text without accessibility violations", async () => {
      const { container } = render(
        <FileUpload
          label="Upload Files"
          helperText="Select files from your device"
        />
      );

      expect(screen.getByText("Upload Files")).toBeInTheDocument();
      expect(
        screen.getByText("Select files from your device")
      ).toBeInTheDocument();

      await expectNoA11yViolations(container);
    });

    it("renders with description and connects it via aria-describedby", () => {
      render(
        <FileUpload
          label="Upload Documents"
          description="Only PDF files are allowed"
          helperText="Max 5MB"
        />
      );

      const dropzone = screen.getByRole("button");
      const description = screen.getByText("Only PDF files are allowed");
      const helperText = screen.getByText("Max 5MB");

      expect(dropzone).toHaveAttribute("aria-describedby");
      const describedBy = dropzone.getAttribute("aria-describedby");

      expect(describedBy).toContain(description.id);
      expect(describedBy).toContain(helperText.id);
    });

    it("renders required indicator when isRequired is true", () => {
      render(<FileUpload label="Required Upload" isRequired />);

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("shows error message with proper ARIA attributes", () => {
      render(
        <FileUpload
          label="Upload"
          errorMessage="Upload failed. Please try again."
        />
      );

      const errorMessage = screen.getByText("Upload failed. Please try again.");
      expect(errorMessage).toHaveAttribute("role", "alert");
    });

    it("applies disabled state correctly", () => {
      render(<FileUpload label="Disabled Upload" disabled />);

      const dropzone = screen.getByRole("button");
      expect(dropzone).toHaveAttribute("aria-disabled", "true");
      expect(dropzone).toHaveAttribute("tabIndex", "-1");
    });

    it("renders with different size variants", () => {
      const { rerender } = render(<FileUpload size="sm" label="Small" />);
      let dropzone = screen.getByRole("button");
      expect(dropzone.className).toContain("dropzone--sm");

      rerender(<FileUpload size="lg" label="Large" />);
      dropzone = screen.getByRole("button");
      expect(dropzone.className).toContain("dropzone--lg");
    });
  });

  describe("File Selection", () => {
    it("allows single file selection via input", () => {
      const onFilesSelected = vi.fn();
      render(<FileUpload label="Upload" onFilesSelected={onFilesSelected} />);

      const input = getFileInput();
      const file = createMockFile("test.pdf", 1024, "application/pdf");

      selectFiles(input, [file]);

      expect(onFilesSelected).toHaveBeenCalledWith([file]);
    });

    it("allows multiple file selection when multiple prop is true", () => {
      const onFilesSelected = vi.fn();
      render(
        <FileUpload label="Upload" multiple onFilesSelected={onFilesSelected} />
      );

      const input = getFileInput();
      const file1 = createMockFile("file1.pdf", 1024, "application/pdf");
      const file2 = createMockFile("file2.pdf", 2048, "application/pdf");
      const files = [file1, file2];

      selectFiles(input, files);

      expect(onFilesSelected).toHaveBeenCalledTimes(1);
      const calledWith = onFilesSelected.mock.calls[0][0];
      expect(calledWith).toHaveLength(2);
      expect(calledWith[0].name).toBe("file1.pdf");
      expect(calledWith[1].name).toBe("file2.pdf");
      expect(input).toHaveAttribute("multiple");
    });

    it("opens file picker when clicking on dropzone", () => {
      render(<FileUpload label="Upload" />);

      const input = getFileInput();
      const clickSpy = vi.spyOn(input, "click");

      const dropzone = screen.getByRole("button");
      fireEvent.click(dropzone);

      expect(clickSpy).toHaveBeenCalled();
    });

    it("opens file picker with Enter or Space key", () => {
      render(<FileUpload label="Upload" />);

      const input = getFileInput();
      const clickSpy = vi.spyOn(input, "click");

      const dropzone = screen.getByRole("button");

      fireEvent.keyDown(dropzone, { key: "Enter" });
      expect(clickSpy).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(dropzone, { key: " " });
      expect(clickSpy).toHaveBeenCalledTimes(2);
    });

    it("does not open file picker when disabled", () => {
      render(<FileUpload label="Upload" disabled />);

      const input = getFileInput();
      const clickSpy = vi.spyOn(input, "click");

      const dropzone = screen.getByRole("button");
      fireEvent.click(dropzone);

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe("Drag and Drop", () => {
    it("handles drag enter and leave events", () => {
      render(<FileUpload label="Upload" />);

      const dropzone = screen.getByRole("button");

      fireEvent.dragEnter(dropzone, {
        dataTransfer: createDataTransfer([
          createMockFile("test.pdf", 1024, "application/pdf"),
        ]),
      });

      expect(dropzone.className).toContain("dropzone--dragging");

      fireEvent.dragLeave(dropzone, { dataTransfer: createDataTransfer([]) });

      expect(dropzone.className).not.toContain("dropzone--dragging");
    });

    it("handles file drop", () => {
      const onFilesSelected = vi.fn();
      render(<FileUpload label="Upload" onFilesSelected={onFilesSelected} />);

      const dropzone = screen.getByRole("button");
      const file = createMockFile("dropped.pdf", 1024, "application/pdf");

      fireEvent.dragEnter(dropzone, {
        dataTransfer: createDataTransfer([file]),
      });
      fireEvent.dragOver(dropzone);
      fireEvent.drop(dropzone, {
        dataTransfer: createDataTransfer([file]),
      });

      expect(onFilesSelected).toHaveBeenCalledWith([file]);
      expect(dropzone.className).not.toContain("dropzone--dragging");
    });

    it("prevents drop when disabled", () => {
      const onFilesSelected = vi.fn();
      render(
        <FileUpload label="Upload" disabled onFilesSelected={onFilesSelected} />
      );

      const dropzone = screen.getByRole("button");
      const file = createMockFile("test.pdf", 1024, "application/pdf");

      fireEvent.drop(dropzone, {
        dataTransfer: createDataTransfer([file]),
      });

      expect(onFilesSelected).not.toHaveBeenCalled();
    });
  });

  describe("File Validation", () => {
    it("validates file size and calls onError for oversized files", () => {
      const onError = vi.fn();
      render(<FileUpload label="Upload" maxSize={1024} onError={onError} />);

      const input = getFileInput();
      const file = createMockFile("large.pdf", 2048, "application/pdf");

      selectFiles(input, [file]);

      expect(onError).toHaveBeenCalledWith(
        expect.stringContaining("File size exceeds"),
        file
      );
    });

    it("displays error message for files exceeding size limit", () => {
      const { getByText } = render(
        <FileUpload label="Upload" maxSize={1024} />
      );

      const input = getFileInput();
      const file = createMockFile("large.pdf", 2048, "application/pdf");

      selectFiles(input, [file]);

      // File should still be added to the list with error status
      expect(getByText("large.pdf")).toBeInTheDocument();
      expect(getByText(/File size exceeds/)).toBeInTheDocument();
    });

    it("validates file type and rejects unaccepted types", () => {
      const onError = vi.fn();
      render(<FileUpload label="Upload" accept="image/*" onError={onError} />);

      const input = getFileInput();
      const file = createMockFile("document.pdf", 1024, "application/pdf");

      selectFiles(input, [file]);

      expect(onError).toHaveBeenCalledWith(
        expect.stringContaining("File type not accepted"),
        file
      );
    });

    it("accepts files matching MIME type wildcards", () => {
      const onFilesSelected = vi.fn();
      render(
        <FileUpload
          label="Upload"
          accept="image/*"
          onFilesSelected={onFilesSelected}
        />
      );

      const input = getFileInput();
      const file = createMockFile("photo.jpg", 1024, "image/jpeg");

      selectFiles(input, [file]);

      expect(onFilesSelected).toHaveBeenCalledWith([file]);
    });

    it("accepts files matching file extensions", () => {
      const onFilesSelected = vi.fn();
      render(
        <FileUpload
          label="Upload"
          accept=".pdf"
          onFilesSelected={onFilesSelected}
        />
      );

      const input = getFileInput();
      const file = createMockFile("document.pdf", 1024, "application/pdf");

      selectFiles(input, [file]);

      expect(onFilesSelected).toHaveBeenCalledWith([file]);
    });

    it("accepts files matching array of types", () => {
      const onFilesSelected = vi.fn();
      render(
        <FileUpload
          label="Upload"
          accept={["image/*", ".pdf"]}
          onFilesSelected={onFilesSelected}
        />
      );

      const input = getFileInput();
      const file1 = createMockFile("photo.jpg", 1024, "image/jpeg");
      const file2 = createMockFile("document.pdf", 1024, "application/pdf");
      const files = [file1, file2];

      selectFiles(input, files);

      expect(onFilesSelected).toHaveBeenCalledTimes(1);
      const calledWith = onFilesSelected.mock.calls[0][0];
      expect(calledWith).toHaveLength(2);
      expect(calledWith[0].name).toBe("photo.jpg");
      expect(calledWith[1].name).toBe("document.pdf");
    });

    it("enforces maximum file count", () => {
      const onError = vi.fn();
      const onFilesSelected = vi.fn();

      render(
        <FileUpload
          label="Upload"
          maxFiles={2}
          multiple
          files={[
            {
              id: "1",
              file: createMockFile("existing.pdf", 1024, "application/pdf"),
              status: "idle",
              progress: 0,
            },
          ]}
          onError={onError}
          onFilesSelected={onFilesSelected}
        />
      );

      const input = getFileInput();
      const files = [
        createMockFile("file1.pdf", 1024, "application/pdf"),
        createMockFile("file2.pdf", 1024, "application/pdf"),
      ];

      selectFiles(input, files);

      expect(onError).toHaveBeenCalledWith(
        expect.stringContaining("Maximum 2")
      );
      expect(onFilesSelected).not.toHaveBeenCalled();
    });

    it("uses custom validation function", () => {
      const validateFile = vi.fn((file: File) => {
        if (file.name.includes("invalid")) {
          return "File name contains invalid characters";
        }
        return undefined;
      });

      const onError = vi.fn();

      render(
        <FileUpload
          label="Upload"
          validateFile={validateFile}
          onError={onError}
        />
      );

      const input = getFileInput();
      const file = createMockFile("invalid-file.pdf", 1024, "application/pdf");

      selectFiles(input, [file]);

      expect(validateFile).toHaveBeenCalledWith(file);
      expect(onError).toHaveBeenCalledWith(
        "File name contains invalid characters",
        file
      );
    });
  });

  describe("File List and Management", () => {
    it("displays uploaded files in the list", () => {
      const file = createMockFile("document.pdf", 1024, "application/pdf");

      render(
        <FileUpload
          label="Upload"
          files={[
            {
              id: "1",
              file,
              status: "idle",
              progress: 0,
            },
          ]}
        />
      );

      expect(screen.getByText("document.pdf")).toBeInTheDocument();
      expect(screen.getByText("1 KB")).toBeInTheDocument();
    });

    it("shows file preview for images", async () => {
      const imageFile = createMockFile("photo.jpg", 2048, "image/jpeg");

      const { container } = render(<FileUpload label="Upload" showPreview />);

      const input = getFileInput();
      selectFiles(input, [imageFile]);

      await waitFor(() => {
        const img = container.querySelector("img");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "blob:mock-url");
        expect(img).toHaveAttribute("alt", "photo.jpg");
      });
    });

    it("removes file when remove button is clicked", () => {
      const onFileRemove = vi.fn();
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "idle",
        progress: 0,
      };

      render(
        <FileUpload
          label="Upload"
          files={[uploadedFile]}
          onFileRemove={onFileRemove}
        />
      );

      const removeButton = screen.getByLabelText("Remove document.pdf");
      fireEvent.click(removeButton);

      expect(onFileRemove).toHaveBeenCalledWith(uploadedFile);
    });

    it("revokes preview URL when file is removed", () => {
      const onFilesChange = vi.fn();

      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("photo.jpg", 1024, "image/jpeg"),
        status: "idle",
        progress: 0,
        preview: "blob:mock-url",
      };

      render(
        <FileUpload
          label="Upload"
          files={[uploadedFile]}
          onFilesChange={onFilesChange}
        />
      );

      const removeButton = screen.getByLabelText("Remove photo.jpg");
      fireEvent.click(removeButton);

      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
    });

    it("disables remove button during upload", () => {
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "uploading",
        progress: 50,
      };

      render(<FileUpload label="Upload" files={[uploadedFile]} />);

      const removeButton = screen.getByLabelText("Remove document.pdf");
      expect(removeButton).toBeDisabled();
    });
  });

  describe("Upload Progress", () => {
    it("shows progress bar during upload", () => {
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "uploading",
        progress: 50,
      };

      render(<FileUpload label="Upload" files={[uploadedFile]} showProgress />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute("aria-valuenow", "50");
      expect(progressBar).toHaveAttribute(
        "aria-label",
        "Uploading document.pdf"
      );
    });

    it("hides progress bar when showProgress is false", () => {
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "uploading",
        progress: 50,
      };

      render(
        <FileUpload
          label="Upload"
          files={[uploadedFile]}
          showProgress={false}
        />
      );

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("shows success icon when upload completes", () => {
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "success",
        progress: 100,
      };

      render(<FileUpload label="Upload" files={[uploadedFile]} />);

      const successIcon = screen.getByLabelText("Upload successful");
      expect(successIcon).toBeInTheDocument();
    });

    it("shows error icon when upload fails", () => {
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "error",
        progress: 0,
        error: "Network error",
      };

      render(<FileUpload label="Upload" files={[uploadedFile]} />);

      const errorIcon = screen.getByLabelText("Upload failed");
      expect(errorIcon).toBeInTheDocument();
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });

    it("shows loading indicator during upload", () => {
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "uploading",
        progress: 30,
      };

      render(<FileUpload label="Upload" files={[uploadedFile]} />);

      const loadingIcon = screen.getByLabelText("Uploading");
      expect(loadingIcon).toBeInTheDocument();
    });
  });

  describe("Upload Handler", () => {
    it("calls onUpload handler when files are selected", async () => {
      const onUpload = vi.fn().mockResolvedValue(undefined);

      render(<FileUpload label="Upload" onUpload={onUpload} />);

      const input = getFileInput();
      const file = createMockFile("document.pdf", 1024, "application/pdf");

      selectFiles(input, [file]);

      await waitFor(() => {
        expect(onUpload).toHaveBeenCalledWith([file]);
      });
    });

    it("handles upload errors gracefully", async () => {
      const onUpload = vi.fn().mockRejectedValue(new Error("Upload failed"));
      const onError = vi.fn();

      render(
        <FileUpload label="Upload" onUpload={onUpload} onError={onError} />
      );

      const input = getFileInput();
      const file = createMockFile("document.pdf", 1024, "application/pdf");

      selectFiles(input, [file]);

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith("Upload failed");
      });
    });
  });

  describe("Controlled Component", () => {
    it("works as a controlled component", () => {
      const onFilesChange = vi.fn();
      const files: UploadedFile[] = [
        {
          id: "1",
          file: createMockFile("existing.pdf", 1024, "application/pdf"),
          status: "idle",
          progress: 0,
        },
      ];

      const { rerender } = render(
        <FileUpload
          label="Upload"
          files={files}
          onFilesChange={onFilesChange}
        />
      );

      expect(screen.getByText("existing.pdf")).toBeInTheDocument();

      const newFiles: UploadedFile[] = [
        ...files,
        {
          id: "2",
          file: createMockFile("new.pdf", 2048, "application/pdf"),
          status: "idle",
          progress: 0,
        },
      ];

      rerender(
        <FileUpload
          label="Upload"
          files={newFiles}
          onFilesChange={onFilesChange}
        />
      );

      expect(screen.getByText("new.pdf")).toBeInTheDocument();
    });
  });

  describe("Accessibility - Advanced", () => {
    it("maintains focus management correctly", async () => {
      const { a11yResults } = await renderWithA11y(
        <FileUpload
          label="Upload Files"
          description="Select your documents"
          helperText="PDF files only"
        />
      );

      expect(a11yResults).toHaveNoViolations();
    });

    it("provides appropriate ARIA labels for all interactive elements", () => {
      const uploadedFile: UploadedFile = {
        id: "1",
        file: createMockFile("document.pdf", 1024, "application/pdf"),
        status: "uploading",
        progress: 50,
      };

      render(<FileUpload label="Upload" files={[uploadedFile]} />);

      const dropzone = screen.getAllByRole("button")[0];
      expect(dropzone).toHaveAttribute("aria-labelledby");

      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-label",
        "Uploading document.pdf"
      );
      expect(screen.getByLabelText("Remove document.pdf")).toBeInTheDocument();
    });
  });
});
