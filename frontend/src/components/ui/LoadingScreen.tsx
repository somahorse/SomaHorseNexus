
import Image from "next/image";




export default function LoadingScreen() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-3 text-black "  >

            <Image src={"/somahorse-logo.png"} alt="logo" width={400} height={400} className=" w-[200px] md:w-[300px] h-auto object-center " />

            <div className=" size-10 rounded-full border-4 border-slate-950 border-t-transparent animate-spin " />

        </div>
    )
}