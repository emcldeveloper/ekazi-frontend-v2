import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface TaxRatesModalProps {
  taxData: any;
}

const TaxRatesModal = ({ taxData }: TaxRatesModalProps) => {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Tax Rates</Button>} />

      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Tanzania Tax Rates & Deductions</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4 space-y-4">
          <h6 className="font-bold">
            Tanzania PAYE (Personal Income Tax) Table
          </h6>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-black text-white">
                  <TableHead className="text-center text-white">
                    Monthly Income (TZS)
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Annual Income (TZS)
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Tax Rate
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Addition Amount (TZS)
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="text-center">
                    0 - {taxData?.payone_reduction?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    0 - {(taxData?.payone_reduction * 12)?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">0%</TableCell>
                  <TableCell className="text-center">0</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    {(taxData?.payone_reduction + 1)?.toLocaleString()} -{" "}
                    {taxData?.paytwo_reduction?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.payone_reduction * 12 + 1)?.toLocaleString()} -{" "}
                    {(taxData?.paytwo_reduction * 12)?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.payone_percentage * 100)?.toFixed(0)}%
                  </TableCell>
                  <TableCell className="text-center">0</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    {(taxData?.paytwo_reduction + 1)?.toLocaleString()} -{" "}
                    {taxData?.paythree_reduction?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.paytwo_reduction * 12 + 1)?.toLocaleString()} -{" "}
                    {(taxData?.paythree_reduction * 12)?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.paytwo_percentage * 100)?.toFixed(0)}%
                  </TableCell>
                  <TableCell className="text-center">
                    {taxData?.paytwo_addition?.toLocaleString()}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    {(taxData?.paythree_reduction + 1)?.toLocaleString()} -{" "}
                    {taxData?.payfour_reduction?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.paythree_reduction * 12 + 1)?.toLocaleString()} -{" "}
                    {(taxData?.payfour_reduction * 12)?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.paythree_percentage * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell className="text-center">
                    {taxData?.paythree_addition?.toLocaleString()}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-center">
                    {(taxData?.payfour_reduction + 1)?.toLocaleString()} and
                    above
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.payfour_reduction * 12 + 1)?.toLocaleString()}{" "}
                    and above
                  </TableCell>
                  <TableCell className="text-center">
                    {(taxData?.payfour_percentage * 100)?.toFixed(0)}%
                  </TableCell>
                  <TableCell className="text-center">
                    {taxData?.payfour_addition?.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Deductions */}
          <div className="space-y-2">
            <h6 className="font-bold">
              <strong>Additional Deductions:</strong>
            </h6>

            <p>
              <strong>SSF (Social Security Fund):</strong> 20% of an employee's
              gross salary, where the employee contributes 10% of their salary,
              and the employer contributes 10% of the employee's gross salary.
            </p>

            <p>
              <strong>WCF (Workers Compensation Fund):</strong> Employers
              contribute 0.5% of the employee's salary for workplace injury
              insurance.
            </p>

            <p>
              <strong>SDL (Skills Development Levy):</strong> 3.5% of total
              emoluments paid to employees for workforce training programs.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaxRatesModal;
