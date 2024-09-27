interface Props {
    title: string;
    value?: number;
    desc: string;
}

const InformationCard = ({title, value, desc}: Props) => {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow min-w-64 flex-1">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{title}</h3>
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
        </div>
    )
}

export default InformationCard