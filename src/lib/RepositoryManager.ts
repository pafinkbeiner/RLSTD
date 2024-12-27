import { Training } from "@/types/Training";
import axios from "axios";

export interface Repository {
    name: string;
    url: string;
}

function instanceOfRepository(object: any): object is Repository{
    return "name" in object && "url" in object
}

const defaultRepositories: Repository[] = [
    {
        name: "Default",
        url: "https://pafinkbeiner.github.io/RLSTD/assets/default.json"
    }
]

const REPOSITORY_NAME = "repositories";

export class ReporitoryManager {

    private repositories: Repository[];

    constructor() {
        const unparsedRepositories = this.load();
        if(this.check(unparsedRepositories)){
            this.repositories = unparsedRepositories;
        }else {
            this.repositories = [];
        }
    }

    private load(): Repository[] {
        const rawRepositories = localStorage.getItem(REPOSITORY_NAME);
        if (!rawRepositories) return [];
        const repositories = JSON.parse(rawRepositories);
        return repositories;
    }

    private check(repositories: any[]): boolean {
        const results = repositories.map((repository: any) => instanceOfRepository(repository));
        return results.every(result => result === true);
    }

    add(repository: Repository) {
        this.repositories = this.repositories.filter(repo => repo.name !== repository.name);
        this.repositories.push(repository);
        this.persist();
    }

    get() {
        return [...this.repositories, ...defaultRepositories];
    }

    clear(){
        this.repositories = [];
        localStorage.removeItem(REPOSITORY_NAME);
    }

    getTrainings(): Promise<Training[]>{
        return new Promise<Training[]>(async (resolve, _) => {
            const trainings: Training[] = [];
            const promises = this.get().map(async (repository) => {
                const result = await axios.get(repository.url);
                return result.data;
            });
            const results = await Promise.all(promises);
            results.forEach(result => trainings.push(...result));
            resolve(trainings);
        });
    }

    private persist() {
        localStorage.setItem(REPOSITORY_NAME, JSON.stringify(this.repositories));
    }
}