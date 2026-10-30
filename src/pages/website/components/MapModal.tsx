import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";

interface MapModalProps {
  show: boolean;
  handleClose: () => void;
}

const MapModal = ({ show, handleClose }: MapModalProps) => {
  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-3xl! p-0">
        <DialogHeader className="p-4 border-b flex flex-row items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <DialogTitle>Our Location</DialogTitle>
        </DialogHeader>

        <div className="h-[450px] w-full">
          <iframe
            title="Ekazi Map"
            src="https://www.google.com/maps?q=The%20Arcade%2C%20Mwai%20Kibaki%20Road%2C%20Mikocheni%2C%20Dar%20es%20Salaam%2C%20Tanzania&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
