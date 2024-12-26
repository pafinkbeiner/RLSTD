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

export function TrainingRepositories() {

    const repositoryManager: ReporitoryManager = new ReporitoryManager();

    const [repositories, setRepositories] = useState<Repository[]>();

    useEffect(() => {
        const repos = repositoryManager.get();
        setRepositories(repos);
    }, [])

    return (
        <Table>
            <TableCaption>A list of your saved Repos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-64">Repository Name</TableHead>
                    <TableHead className="w-64">Repository URL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {repositories && repositories.map((repository) => (
                    <TableRow key={repository.name}>
                        <TableCell>{repository.name}</TableCell>
                        <TableCell>{repository.url}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
