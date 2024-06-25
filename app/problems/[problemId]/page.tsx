import { Card, CardContent } from "@/components/ui/card";

export default function ProblemPage({
    params, 
}: {
    params: {problemId: string};
}) {
    return <div>
        <Card>
            <CardContent>
                <h1>Hello {params.problemId}</h1>
            </CardContent>
        </Card>
    </div>;
}