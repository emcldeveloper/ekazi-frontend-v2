import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapModalProps {
  show: boolean;
  handleClose: () => void;
}

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJ032SDgBNXBkRqoXrV0SXzxk";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Exact%20Manpower%20Consulting%20Ltd%2C%20Dar%20es%20Salaam%2C%20Tanzania&output=embed";

const MapModal = ({ show, handleClose }: MapModalProps) => {
  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="overflow-hidde sm:max-w-3xl!">
        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
          <div className="h-[350px] w-full sm:h-[450px]">
            <iframe
              title="Ekazi - Exact Manpower Consulting Ltd"
              src={MAP_EMBED_URL}
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            size="sm"
            onClick={() =>
              window.open(GOOGLE_MAPS_URL, "_blank", "noopener,noreferrer")
            }
          >
            Get Directions
            <ArrowUpRight className="size-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
