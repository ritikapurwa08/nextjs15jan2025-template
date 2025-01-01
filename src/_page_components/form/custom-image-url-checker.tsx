import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormSetError,
  useController,
} from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  icon?: IconType | LucideIcon;
  disabled?: boolean;
  className?: string;
  error?: string;
  defaultValue?: PathValue<T, FieldPath<T>>;
  onChange?: (value: string, isValid: boolean | undefined) => void;
  validateImage?: boolean;
  setFormError: UseFormSetError<T>;
}

export default function CustomUrlInput<T extends FieldValues>({
  name,
  className,
  error,
  placeholder,
  icon: Icon,
  disabled,
  label,
  control,
  onChange,
  defaultValue,
  validateImage = false,
  setFormError,
}: Readonly<CustomInputProps<T>>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control, defaultValue });

  const [isValidImage, setIsValidImage] = useState<boolean | undefined>();
  const [validationStatus, setValidationStatus] = useState<
    "validating" | "valid" | "invalid"
  >("validating");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showWarning, setShowWarning] = useState(false);

  const isValidImageUrl = async (url: string): Promise<boolean> => {
    if (!url) return false;

    try {
      const parsedUrl = new URL(url);
      if (
        !/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(
          parsedUrl.pathname.toLowerCase()
        )
      ) {
        return false;
      }

      // Create a promise that resolves with the image loading status
      return new Promise((resolve) => {
        const img = document.createElement("img");
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;
    let typingTimeoutId: NodeJS.Timeout | undefined;

    const validateUrl = async (url: string) => {
      if (!mounted) return;

      setValidationStatus("validating");
      const isValid = await isValidImageUrl(url);

      if (!mounted) return;

      setIsValidImage(isValid);
      setValidationStatus(isValid ? "valid" : "invalid");
      setPreviewUrl(isValid ? url : "");
      setShowWarning(!isValid && url !== "");

      if (isValid) {
        setFormError(name, undefined);
      } else {
        field.onChange(""); // Set empty string for invalid URL
      }

      onChange?.(isValid ? url : "", isValid);
    };

    if (validateImage) {
      if (field.value) {
        // Clear previous timeout
        if (typingTimeoutId) clearTimeout(typingTimeoutId);

        // Add debounce for validation
        typingTimeoutId = setTimeout(() => {
          validateUrl(field.value);
        }, 500);
      } else {
        setIsValidImage(undefined);
        setValidationStatus("invalid");
        setPreviewUrl("");
        setShowWarning(false);
        onChange?.("", false);
      }
    }

    return () => {
      mounted = false;
      if (typingTimeoutId) clearTimeout(typingTimeoutId);
    };
  }, [field.value, validateImage, setFormError, name, onChange, field]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    field.onChange(inputValue);
    setShowWarning(false);
  };

  return (
    <FormItem className="relative space-y-4">
      <FormLabel
        htmlFor={`${name}-input`}
        className="text-sm mb-0.5 ml-2 font-medium block"
      >
        {label}
      </FormLabel>

      <FormControl>
        <div className="relative">
          {Icon && (
            <Icon
              size={20}
              className="absolute top-1/2 w-10 transform -translate-y-1/2 left-0 text-muted-foreground"
            />
          )}

          <Input
            id={`${name}-input`}
            placeholder={placeholder}
            {...field}
            disabled={disabled}
            className={cn(
              "pr-10 border-opacity-30 rounded-xl border-zinc-500",
              !!Icon && "pl-10",
              className,
              validateImage &&
                validationStatus !== "validating" &&
                (validationStatus === "valid"
                  ? "border-green-500"
                  : "border-red-500")
            )}
            onChange={handleInputChange}
          />

          {/* Validation Status Indicators */}
          {validateImage && validationStatus === "validating" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              Validating...
            </span>
          )}
          {validateImage && validationStatus === "valid" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
              ✓
            </span>
          )}
          {validateImage && validationStatus === "invalid" && field.value && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
              ✕
            </span>
          )}
        </div>
      </FormControl>

      {/* Warning Alert */}
      {showWarning && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Invalid image URL. The form will submit without an image.
          </AlertDescription>
        </Alert>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative mt-4 rounded-lg overflow-hidden border border-gray-200 w-full h-48">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => {
              setPreviewUrl("");
              setIsValidImage(false);
              setValidationStatus("invalid");
            }}
          />
        </div>
      )}

      <FormMessage className="mt-1 text-xs text-red-600">
        {(error ?? fieldError?.message) && (
          <span>{error ?? fieldError?.message}</span>
        )}
      </FormMessage>
    </FormItem>
  );
}
