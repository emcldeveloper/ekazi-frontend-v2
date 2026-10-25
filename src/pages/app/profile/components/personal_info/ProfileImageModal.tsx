import { useEffect, useRef, useState, useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { Loader, PencilLine, UploadCloud, User } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useSaveProfileImage } from "@/hooks/profile";
import { getErrorMessage } from "@/utils/axios-helpers";
import { getCroppedImg } from "@/utils/crop-image";
import { cn } from "@/lib/utils";

const ASPECT = 1;
const MAX_SIZE_MB = 5;
const ACCEPT = {
  "image/jpeg": [],
  "image/png": [],
  "image/webp": [],
};

interface ProfileImageModalProps {
  currentImageUrl?: string | null;
}

const ProfileImageModal = ({ currentImageUrl }: ProfileImageModalProps) => {
  const { mutate: saveProfileImage, isPending } = useSaveProfileImage();

  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const croppedAreaRef = useRef<Area | null>(null);

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  const resetState = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    croppedAreaRef.current = null;
  };

  const handleOpenChange = (next: boolean) => {
    if (isPending) return;
    setOpen(next);
    if (!next) resetState();
  };

  const onDropAccepted = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setImageSrc(URL.createObjectURL(file));
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  const onDropRejected = useCallback((rejections: FileRejection[]) => {
    const code = rejections[0]?.errors[0]?.code;
    if (code === "file-too-large") {
      toast.error(`Image must be smaller than ${MAX_SIZE_MB}MB`);
    } else if (code === "file-invalid-type") {
      toast.error("Please choose a JPG, PNG or WebP image");
    } else if (code === "too-many-files") {
      toast.error("Please upload one image at a time");
    } else {
      toast.error("Could not use that file");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT,
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    multiple: false,
    disabled: isPending,
    onDropAccepted,
    onDropRejected,
  });

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaRef.current) return;

    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaRef.current,
      );
      const blob = await (await fetch(croppedImage)).blob();
      const formData = new FormData();
      formData.append("picture", blob, "profile.jpg");

      saveProfileImage(formData, {
        onSuccess: (res) => {
          toast.success(res?.message || "Profile updated");
          setOpen(false);
          resetState();
        },
        onError: (err) => toast.error(getErrorMessage(err)),
      });
    } catch {
      toast.error("Could not process the image");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm">
            <PencilLine />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile Image</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto">
          {/* Current picture (only before a new image is picked) */}
          {!imageSrc && (
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Current picture
              </p>
              <div className="size-32 overflow-hidden rounded-full border bg-muted">
                {currentImageUrl ? (
                  <img
                    src={currentImageUrl}
                    alt="Current profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <User className="size-10" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dropzone (before pick) or cropper (after pick) */}
          {!imageSrc ? (
            <div
              {...getRootProps()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-8 text-center transition-colors",
                isDragActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50",
                isPending && "cursor-not-allowed opacity-50",
              )}
            >
              <input {...getInputProps()} />
              <UploadCloud className="size-8 text-muted-foreground" />
              <p className="text-sm">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image, or click to browse"}
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP, up to {MAX_SIZE_MB}MB
              </p>
            </div>
          ) : (
            <>
              <div className="relative h-[300px] overflow-hidden rounded-md border">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={ASPECT}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, pixels) =>
                    (croppedAreaRef.current = pixels)
                  }
                />
              </div>
              <input
                type="range"
                className="w-full"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
              <Button
                type="button"
                variant="link"
                size="sm"
                className="px-0"
                onClick={resetState}
                disabled={isPending}
              >
                Choose a different image
              </Button>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!imageSrc || isPending}
            className="bg-Blue text-white hover:bg-blue-900"
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" /> Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageModal;
