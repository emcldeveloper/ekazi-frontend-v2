import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTermsConditions } from "@/hooks/settings";

const TermsConditions = () => {
  const { data: terms, isLoading } = useTermsConditions();

  if (isLoading) {
    return;
  }

  return (
    <div className="mt-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-8">
            {terms.map((term: any) => (
              <div key={term.id}>
                <h2 className="text-base font-medium">{term.title}</h2>
                <p className="text-sm text-muted-foreground lowercase">
                  {term.body}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsConditions;
