import { Bluetooth, BluetoothConnected } from "lucide-react";

interface IProps {
  connected: boolean;
  className?: string;
  onClick?: () => void;
}

const ConnectivityIndicator = ({connected, className = "", onClick = () => {}}: IProps) => {
  return (
    <div onClick={onClick} className={[`bg-${connected ? 'green' : '#ffffff0'}-500 p-2 rounded-full flex items-center justify-center border-2 border-solid border-primary-500 cursor-pointer`, className].join(" ")}>
        { connected &&
            <BluetoothConnected/>
        }
        { !connected &&
            <Bluetooth/>
        }
    </div>
  )
}

export default ConnectivityIndicator