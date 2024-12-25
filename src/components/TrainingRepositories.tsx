import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

interface Repository {
    name: string;
    url: string;
}

function storeRepositories(repositories: Repository[]) {
    localStorage.setItem("repositories", JSON.stringify(repositories));
}

function loadRepositories(): Repository[] {
    const repositories = localStorage.getItem("repositories");
    if (repositories) {
        return JSON.parse(repositories);
    } else {
        return [];
    }
}

export function TrainingRepositories() {

    const [repositories, setRepositories] = useState<Repository[]>([]);

    useEffect(() => {
        setRepositories(loadRepositories());
        return () => {
            storeRepositories(repositories);
        };
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
                {repositories.map((repository) => (
                    <TableRow key={repository.name}>
                        <TableCell>{repository.name}</TableCell>
                        <TableCell>{repository.url}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
