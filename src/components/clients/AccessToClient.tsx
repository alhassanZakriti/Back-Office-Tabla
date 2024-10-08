import { MouseEventHandler } from "react";

interface AccessToClientProps {
    image: string,
    name: string,
    opacity?: string,
    onClick: MouseEventHandler<HTMLDivElement>;
}
const AccessToClient = (props:AccessToClientProps) => {
  return (
    <div onClick={props.onClick} className={`flex gap-3 cursor-pointer hover:opacity-80 justify-start bg-softgreytheme rounded-[10px] p-2 items-center ${props.opacity === '1'? 'opacity-100':'opacity-25'}`}>
        <img className="w-12 h-12 object-cover rounded-full" src={props.image}/>
        <div className="h-12 border-[1px] border-[#00000010] w-0 "></div>
        <h3 className="text-greytheme">{props.name}</h3>
    </div>
  )
}

export default AccessToClient
