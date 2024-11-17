import { useEffect, useState } from "react"
import { Training } from "@/types/Training";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TrainingOverviewCard() {

    const navigate = useNavigate();

    const [trainings, setTrainings] = useState<Array<Training>>([]);

    const refreshState = () => {
        setTrainings([]);
        for (let i = 0; i < localStorage.length; i++) {
            const key: string | null = localStorage.key(i);
            if (key !== null && key.startsWith("training-")) {
                const training = JSON.parse(localStorage.getItem(key)!);
                setTrainings((prevTrainings: any) => [...prevTrainings, training]);
            }
        }
    }

    useEffect(() => {
        refreshState();
    }, [])

    return (
        <Card style={{ height: "22.125rem" }} className='min-w-64 flex-1 p-5'>
            <ScrollArea className='flex flex-col  t-3 overflow-y-auto max-h-80 pr-5'>
                <div className="flex flex-column flex-wrap gap-1">
                    <div className="flex flex-row items-center justify-between flex-wrap gap-4 w-full">
                        <CardTitle className="flex-1">Trainings (Currently Saved: {trainings.length})</CardTitle>
                        <SquareArrowOutUpRightIcon className="cursor-pointer" onClick={() => navigate("/Training")} size={18} />
                    </div>
                    {
                        trainings.length <= 0 &&
                        <CardDescription>No training created</CardDescription>
                    }
                    {
                        trainings.length > 0 &&
                        <Table className="mt-3">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Targeted Training Time (s)</TableHead>
                                    <TableHead>Amount Power Zones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trainings.map((training: Training) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{training.title}</TableCell>
                                            <TableCell>{training.targetedTrainingTime}s</TableCell>
                                            <TableCell>{training.targetPowerZones.length}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    }
                </div>
            </ScrollArea >
        </Card>
    )
}