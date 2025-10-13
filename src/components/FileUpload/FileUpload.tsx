import React, { useCallback, useRef, useState, useId } from "react";
import styles from "./fileupload.module.css";
import {
  UploadIcon,
  XIcon,
  CheckIcon,
  AlertCircleIcon,
  ImageIcon,
  VideoIcon,
  DocumentIcon,
  FileIcon,
} from "./icons";

export type FileUploadStatus = "idle" | "uploading" | "success" | "error";
export type FileUploadSize = "sm" | "md" | "lg";

/**
 * Represents a file with its metadata and state
 */
export interface UploadedFile {
  /** Unique identifier for the file */
  id: string;
  /** The actual File object */
  file: File;
  /** Upload status */
  status: FileUploadStatus;
  /** Upload progress (0-100) */
  progress: number;
  /** Preview URL for images */
  preview?: string;
  /** Error message if upload failed */
  error?: string;
}

export interface FileUploadProps {
  /**
   * Size of the upload area
   * @default "md"
   */
  size?: FileUploadSize;
  /**
   * Whether to accept multiple files
   * @default false
   */
  multiple?: boolean;
  /**
   * Accepted file types (MIME types or extensions)
   * @example ["image/*", ".pdf", ".doc"]
   */
  accept?: string | string[];
  /**
   * Maximum file size in bytes
   * @example 5242880 // 5MB
   */
  maxSize?: number;
  /**
   * Maximum number of files allowed
   */
  maxFiles?: number;
  /**
   * Whether the upload is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to show file previews
   * @default true
   */
  showPreview?: boolean;
  /**
   * Whether to show progress indicators
   * @default true
   */
  showProgress?: boolean;
  /**
   * Label text
   */
  label?: React.ReactNode;
  /**
   * Description text shown below the label
   */
  description?: React.ReactNode;
  /**
   * Helper text shown below the upload area
   */
  helperText?: React.ReactNode;
  /**
   * Error message
   */
  errorMessage?: React.ReactNode;
  /**
   * Custom upload icon
   */
  uploadIcon?: React.ReactNode;
  /**
   * Custom upload text
   */
  uploadText?: string;
  /**
   * Custom drag text
   */
  dragText?: string;
  /**
   * Callback when files are selected
   */
  onFilesSelected?: (files: File[]) => void;
  /**
   * Callback when files are uploaded
   * Return a promise that resolves when upload is complete
   */
  onUpload?: (files: File[]) => Promise<void>;
  /**
   * Callback when a file is removed
   */
  onFileRemove?: (file: UploadedFile) => void;
  /**
   * Callback for file validation errors
   */
  onError?: (error: string, file?: File) => void;
  /**
   * Custom file validator
   * Return error message if validation fails, undefined otherwise
   */
  validateFile?: (file: File) => string | undefined;
  /**
   * Class name applied to the wrapper
   */
  className?: string;
  /**
   * Whether the field is required
   */
  isRequired?: boolean;
  /**
   * Controlled files
   */
  files?: UploadedFile[];
  /**
   * Callback when files state changes
   */
  onFilesChange?: (files: UploadedFile[]) => void;
}

/**
 * Get file icon based on MIME type
 */
const getFileIcon = (file: File): React.ReactNode => {
  const type = file.type;

  if (type.startsWith("image/")) {
    return <ImageIcon className={styles["file-icon"]} />;
  }
  if (type.startsWith("video/")) {
    return <VideoIcon className={styles["file-icon"]} />;
  }
  if (
    type.includes("pdf") ||
    type.includes("document") ||
    type.includes("text")
  ) {
    return <DocumentIcon className={styles["file-icon"]} />;
  }

  return <FileIcon className={styles["file-icon"]} />;
};

/**
 * Format file size for display
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Generate a unique ID for a file
 */
const generateFileId = (): string => {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * FileUpload Component
 *
 * A comprehensive file upload component with drag-and-drop support,
 * file validation, progress indicators, and previews.
 */
const FileUploadComponent = React.forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(props, ref) {
    const {
      size = "md",
      multiple = false,
      accept,
      maxSize,
      maxFiles,
      disabled = false,
      showPreview = true,
      showProgress = true,
      label,
      description,
      helperText,
      errorMessage,
      uploadIcon,
      uploadText = "Click to upload or drag and drop",
      dragText = "Drop files here",
      onFilesSelected,
      onUpload,
      onFileRemove,
      onError,
      validateFile,
      className,
      isRequired = false,
      files: controlledFiles,
      onFilesChange,
    } = props;

    const [internalFiles, setInternalFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const dragCounterRef = useRef(0);

    // Use controlled or uncontrolled state
    const files = controlledFiles ?? internalFiles;
    const setFiles = useCallback(
      (update: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])) => {
        if (onFilesChange) {
          if (typeof update === "function") {
            onFilesChange(update(files));
          } else {
            onFilesChange(update);
          }
        } else {
          setInternalFiles(update);
        }
      },
      [onFilesChange, files]
    );

    // Generate IDs for accessibility
    const labelId = useId();
    const descriptionId = useId();
    const helperTextId = useId();
    const errorId = useId();

    /**
     * Validate a single file
     */
    const validateSingleFile = useCallback(
      (file: File): string | undefined => {
        // Check file size
        if (maxSize && file.size > maxSize) {
          return `File size exceeds ${formatFileSize(maxSize)}`;
        }

        // Check file type
        if (accept) {
          const acceptArray = Array.isArray(accept) ? accept : [accept];
          const isAccepted = acceptArray.some((type) => {
            // Handle MIME type wildcards (e.g., "image/*")
            if (type.includes("*")) {
              const baseType = type.split("/")[0];
              return file.type.startsWith(baseType + "/");
            }
            // Handle file extensions (e.g., ".pdf")
            if (type.startsWith(".")) {
              return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            // Handle exact MIME type
            return file.type === type;
          });

          if (!isAccepted) {
            return `File type not accepted. Accepted types: ${acceptArray.join(
              ", "
            )}`;
          }
        }

        // Custom validation
        if (validateFile) {
          return validateFile(file);
        }

        return undefined;
      },
      [maxSize, accept, validateFile]
    );

    /**
     * Create preview URL for image files
     */
    const createPreview = useCallback((file: File): string | undefined => {
      if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file);
      }
      return undefined;
    }, []);

    /**
     * Handle file upload
     */
    const handleUpload = useCallback(
      async (filesToUpload: UploadedFile[]) => {
        if (!onUpload) return;

        // Filter out files with errors
        const validFiles = filesToUpload.filter((f) => f.status !== "error");
        if (validFiles.length === 0) return;

        // Update status to uploading
        setFiles((prev: UploadedFile[]) =>
          prev.map((f: UploadedFile) =>
            validFiles.find((u) => u.id === f.id)
              ? { ...f, status: "uploading" as FileUploadStatus, progress: 0 }
              : f
          )
        );

        try {
          // Simulate progress (in real implementation, use XMLHttpRequest or similar)
          const progressInterval = setInterval(() => {
            setFiles((prev: UploadedFile[]) =>
              prev.map((f: UploadedFile) => {
                if (
                  validFiles.find((u) => u.id === f.id) &&
                  f.status === "uploading" &&
                  f.progress < 90
                ) {
                  return { ...f, progress: f.progress + 10 };
                }
                return f;
              })
            );
          }, 200);

          await onUpload(validFiles.map((f) => f.file));

          clearInterval(progressInterval);

          // Update status to success
          setFiles((prev: UploadedFile[]) =>
            prev.map((f: UploadedFile) =>
              validFiles.find((u) => u.id === f.id)
                ? { ...f, status: "success" as FileUploadStatus, progress: 100 }
                : f
            )
          );
        } catch (error) {
          // Update status to error
          setFiles((prev: UploadedFile[]) =>
            prev.map((f: UploadedFile) =>
              validFiles.find((u) => u.id === f.id)
                ? {
                    ...f,
                    status: "error" as FileUploadStatus,
                    error:
                      error instanceof Error ? error.message : "Upload failed",
                  }
                : f
            )
          );
          onError?.(error instanceof Error ? error.message : "Upload failed");
        }
      },
      [onUpload, onError, setFiles]
    );

    /**
     * Process and add files
     */
    const processFiles = useCallback(
      (newFiles: File[]) => {
        // Check max files limit
        if (maxFiles && files.length + newFiles.length > maxFiles) {
          const error = `Maximum ${maxFiles} file${
            maxFiles > 1 ? "s" : ""
          } allowed`;
          onError?.(error);
          return;
        }

        const validatedFiles: UploadedFile[] = [];

        for (const file of newFiles) {
          const error = validateSingleFile(file);

          const uploadedFile: UploadedFile = {
            id: generateFileId(),
            file,
            status: error ? "error" : "idle",
            progress: 0,
            preview: showPreview && !error ? createPreview(file) : undefined,
            error: error,
          };

          validatedFiles.push(uploadedFile);

          if (error) {
            onError?.(error, file);
          }
        }

        if (validatedFiles.length > 0) {
          const updatedFiles = [...files, ...validatedFiles];
          setFiles(updatedFiles);

          // Only trigger onFilesSelected for valid files (no errors)
          const successfulFiles = validatedFiles.filter(
            (f) => f.status !== "error"
          );
          if (successfulFiles.length > 0) {
            onFilesSelected?.(successfulFiles.map((f) => f.file));
          }

          // Auto-upload if handler is provided (only valid files)
          if (onUpload && successfulFiles.length > 0) {
            handleUpload(successfulFiles);
          }
        }
      },
      [
        files,
        maxFiles,
        showPreview,
        validateSingleFile,
        createPreview,
        onError,
        onFilesSelected,
        onUpload,
        setFiles,
        handleUpload,
      ]
    );

    /**
     * Handle file input change
     */
    const handleFileInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        if (selectedFiles.length > 0) {
          processFiles(selectedFiles);
        }
        // Reset input value to allow selecting the same file again
        event.target.value = "";
      },
      [processFiles]
    );

    /**
     * Handle file removal
     */
    const handleFileRemove = useCallback(
      (fileToRemove: UploadedFile) => {
        // Revoke preview URL to free memory
        if (fileToRemove.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }

        setFiles((prev: UploadedFile[]) =>
          prev.filter((f: UploadedFile) => f.id !== fileToRemove.id)
        );
        onFileRemove?.(fileToRemove);
      },
      [setFiles, onFileRemove]
    );

    /**
     * Handle drag events
     */
    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragCounterRef.current = 0;

        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
          processFiles(droppedFiles);
        }
      },
      [disabled, processFiles]
    );

    /**
     * Handle click on drop zone
     */
    const handleDropZoneClick = useCallback(() => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    }, [disabled]);

    /**
     * Handle keyboard interaction
     */
    const handleDropZoneKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      },
      [disabled]
    );

    // Build accept attribute for input
    const acceptAttr = accept
      ? Array.isArray(accept)
        ? accept.join(",")
        : accept
      : undefined;

    // Build aria-describedby
    const describedByIds: string[] = [];
    if (description) describedByIds.push(descriptionId);
    if (helperText) describedByIds.push(helperTextId);
    if (errorMessage) describedByIds.push(errorId);
    const ariaDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    const wrapperClass = [
      styles.wrapper,
      styles[`wrapper--${size}`],
      disabled && styles["wrapper--disabled"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const dropZoneClass = [
      styles.dropzone,
      styles[`dropzone--${size}`],
      isDragging && styles["dropzone--dragging"],
      disabled && styles["dropzone--disabled"],
      errorMessage && styles["dropzone--error"],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperClass}>
        {/* Label */}
        {label && (
          <label id={labelId} className={styles.label}>
            {label}
            {isRequired && <span className={styles.label__required}> *</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <div id={descriptionId} className={styles.description}>
            {description}
          </div>
        )}

        {/* Drop Zone */}
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptAttr}
          onChange={handleFileInputChange}
          disabled={disabled}
          className={styles["file-input"]}
          id={labelId ? `${labelId}-input` : undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={ariaDescribedBy}
        />

        {/* Drop Zone */}
        <div
          ref={dropZoneRef}
          className={dropZoneClass}
          onClick={handleDropZoneClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={handleDropZoneKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={ariaDescribedBy}
          aria-disabled={disabled}
        >
          <div className={styles["dropzone__content"]}>
            {uploadIcon || <UploadIcon className={styles["upload-icon"]} />}
            <div className={styles["dropzone__text"]}>
              <p className={styles["dropzone__text-primary"]}>
                {isDragging ? dragText : uploadText}
              </p>
              {!isDragging && (maxSize || accept) && (
                <p className={styles["dropzone__text-secondary"]}>
                  {accept && (
                    <span>
                      {Array.isArray(accept) ? accept.join(", ") : accept}
                    </span>
                  )}
                  {accept && maxSize && <span> • </span>}
                  {maxSize && <span>Max {formatFileSize(maxSize)}</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Helper Text */}
        {helperText && !errorMessage && (
          <div id={helperTextId} className={styles["helper-text"]}>
            {helperText}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div id={errorId} className={styles["error-message"]} role="alert">
            {errorMessage}
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className={styles["file-list"]}>
            {files.map((uploadedFile) => (
              <div key={uploadedFile.id} className={styles["file-item"]}>
                {/* File Preview or Icon */}
                <div className={styles["file-item__preview"]}>
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className={styles["file-item__image"]}
                    />
                  ) : (
                    getFileIcon(uploadedFile.file)
                  )}
                </div>

                {/* File Info */}
                <div className={styles["file-item__info"]}>
                  <div className={styles["file-item__name"]}>
                    {uploadedFile.file.name}
                  </div>
                  <div className={styles["file-item__meta"]}>
                    <span className={styles["file-item__size"]}>
                      {formatFileSize(uploadedFile.file.size)}
                    </span>
                    {uploadedFile.status === "error" && uploadedFile.error && (
                      <>
                        <span className={styles["file-item__separator"]}>
                          •
                        </span>
                        <span className={styles["file-item__error"]}>
                          {uploadedFile.error}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {showProgress &&
                    uploadedFile.status === "uploading" &&
                    uploadedFile.progress > 0 && (
                      <div className={styles["progress-bar"]}>
                        <div
                          className={styles["progress-bar__fill"]}
                          style={{ width: `${uploadedFile.progress}%` }}
                          role="progressbar"
                          aria-valuenow={uploadedFile.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Uploading ${uploadedFile.file.name}`}
                        />
                      </div>
                    )}
                </div>

                {/* Status Icon */}
                <div className={styles["file-item__status"]}>
                  {uploadedFile.status === "success" && (
                    <CheckIcon
                      className={styles["status-icon--success"]}
                      aria-label="Upload successful"
                    />
                  )}
                  {uploadedFile.status === "error" && (
                    <AlertCircleIcon
                      className={styles["status-icon--error"]}
                      aria-label="Upload failed"
                    />
                  )}
                  {uploadedFile.status === "uploading" && (
                    <div
                      className={styles["status-icon--loading"]}
                      aria-label="Uploading"
                    />
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  className={styles["file-item__remove"]}
                  onClick={() => handleFileRemove(uploadedFile)}
                  aria-label={`Remove ${uploadedFile.file.name}`}
                  disabled={uploadedFile.status === "uploading"}
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUploadComponent.displayName = "FileUpload";

export const FileUpload = React.memo(FileUploadComponent);
