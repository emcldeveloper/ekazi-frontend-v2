import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function DownloadModal({
  open,
  onClose,
  subscriptionStatus,
  onDownloadFree,
  onDownloadPro,
  onPayPerDownload,
  subscriptionPlans,
  pdfName,
  setPdfName,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  subscriptionStatus: string;
  onDownloadFree: () => void;
  onDownloadPro: () => void;
  onPayPerDownload: (plan: any) => void;
  subscriptionPlans: any[];
  pdfName: string;
  setPdfName: (name: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden sm:max-w-3xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Download Your CV
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Choose how you'd like to download your CV
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
          {/* Options */}
          <div className="px-6 pb-2 flex  flex-col sm:flex-row gap-3">
            {subscriptionStatus === "free" &&
              subscriptionPlans.slice(0, 3).map((plan) => (
                <Card
                  key={plan.id}
                  onClick={() => onPayPerDownload(plan)}
                  className="w-full border border-Blue cursor-pointer transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-Blue">{plan.name}</CardTitle>
                    <CardDescription>{plan.price}/= Tsh</CardDescription>
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <ul className="text-Blue">
                      {plan?.cvfeaturesplan?.map((feature: any) => (
                        <li key={feature.id} className="text-xs">
                          ✓ {feature.feature_name}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}

            {subscriptionStatus === "basic" &&
              subscriptionPlans
                .filter((plan) =>
                  ["Single Basic", "Standard", "Premium"].includes(plan.name),
                )
                .map((plan) => (
                  <Card
                    key={plan.id}
                    onClick={() => onPayPerDownload(plan)}
                    className="w-full border border-Blue cursor-pointer transition-all"
                  >
                    <CardHeader>
                      <CardTitle className="text-Blue">{plan.name}</CardTitle>
                      <CardDescription>{plan.price}/= Tsh</CardDescription>
                      <Separator />
                    </CardHeader>

                    <CardContent>
                      <ul className="text-Blue">
                        {plan?.cvfeaturesplan?.map((feature: any) => (
                          <li key={feature.id} className="text-xs">
                            ✓ {feature.feature_name}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}

            {subscriptionStatus === "standard" &&
              subscriptionPlans
                .filter((plan) =>
                  ["Single Premium", "Premium"].includes(plan.name),
                )
                .map((plan) => (
                  <Card
                    key={plan.id}
                    onClick={() => onPayPerDownload(plan)}
                    className="w-full border border-Blue cursor-pointer transition-all"
                  >
                    <CardHeader>
                      <CardTitle className="text-Blue">{plan.name}</CardTitle>
                      <CardDescription>{plan.price}/= Tsh</CardDescription>
                      <Separator />
                    </CardHeader>

                    <CardContent>
                      <ul className="text-Blue">
                        {plan?.cvfeaturesplan?.map((feature: any) => (
                          <li key={feature.id} className="text-xs">
                            ✓ {feature.feature_name}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
          </div>

          {/* file name */}
          {subscriptionStatus !== "free" && (
            <div className="px-6 pb-2">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">
                  CV Name (optional)
                </span>
                <span className="text-xs text-gray-500">
                  eg: John Doe (TRA Intern)
                </span>
              </label>

              <Input
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
                placeholder="Enter cv name"
                className="mt-2"
              />
            </div>
          )}

          {/* Footer */}
          <DialogFooter className="p-4 pt-3 flex justify-center">
            {subscriptionStatus === "basic" && (
              <Button
                onClick={onDownloadFree}
                className="bg-Blue text-white hover:bg-blue-900"
              >
                Continue with watermark
              </Button>
            )}

            {subscriptionStatus === "standard" ||
              (subscriptionStatus === "premium" && (
                <Button
                  onClick={onDownloadPro}
                  className="bg-Blue text-white hover:bg-blue-900"
                >
                  Download
                </Button>
              ))}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
