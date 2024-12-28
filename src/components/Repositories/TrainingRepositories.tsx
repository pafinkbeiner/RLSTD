import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ReporitoryManager, Repository } from "@/lib/RepositoryManager";
import { useEffect, useState } from "react"
import { Button } from "../ui/button";

export function TrainingRepositories() {

    const repositoryManager: ReporitoryManager = new ReporitoryManager();

    const [repositories, setRepositories] = useState<Repository[]>();

    function refresh(){
        const repos = repositoryManager.get();
        setRepositories(repos);
    }

    function remove(name: string){
        repositoryManager.remove(name);
        refresh();
    }

    useEffect(() => {
        refresh();
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <Button onClick={refresh} variant={"outline"}>Refresh</Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-64">Repository Name</TableHead>
                        <TableHead className="w-64">Repository URL</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {repositories && repositories.map((repository) => (
                        <TableRow onClick={() => remove(repository.name)} className="cursor-pointer" key={repository.name}>
                            <TableCell>{repository.name}</TableCell>
                            <TableCell>{repository.url}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
