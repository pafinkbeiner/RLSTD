import { CheckCircle2, XCircle } from "lucide-react"

interface ConnectionStatusProps {
  isConnected: boolean
}

export default function ConnectedState({ isConnected = false }: ConnectionStatusProps) {
  const statusColor = isConnected ? "green" : "red"
  const StatusIcon = isConnected ? CheckCircle2 : XCircle
  const statusText = isConnected ? "Connected" : "Disconnected"

  return (
    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md">
      <div className="relative">
        <div className={`w-3 h-3 bg-${statusColor}-500 rounded-full`}></div>
        {isConnected && (
          <div className={`w-3 h-3 bg-${statusColor}-500 rounded-full absolute top-0 animate-ping`}></div>
        )}
      </div>
      <StatusIcon className={`w-5 h-5 text-${statusColor}-500`} />
      <span className={`text-sm font-medium text-${statusColor}-700`}>{statusText}</span>
    </div>
  )
}