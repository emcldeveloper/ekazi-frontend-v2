import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  1: FaFacebook,
  2: FaInstagram,
  3: FaLinkedin,
  4: FaYoutube,
};

interface JoinModalProps {
  employer: any;
}

const JoinModal = ({ employer }: JoinModalProps) => {
  if (!employer || !employer.clientSocialMedia) return null;

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Join us</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-Blue">Follow Us</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-6 py-4">
          {employer.clientSocialMedia.map(
            ({
              social_id,
              url_media,
              id,
            }: {
              social_id: string;
              url_media: string;
              id: string;
            }) => {
              const Icon = iconMap[social_id];
              if (!Icon) return null;

              let href = url_media;
              if (!/^https?:\/\//i.test(href)) {
                href = "https://" + href;
              }

              return (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="p-3 rounded-full bg-orange-50 hover:bg-orange-100 transition">
                    <Icon className="w-7 h-7 text-orange-600 group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              );
            },
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinModal;
