import { CheckCircle } from "lucide-react";


export function ListItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-slate-700">
            <CheckCircle size={20} className="text-cyan-500 flex-shrink-0" />
            <span>{text}</span>
        </li>
    )
}