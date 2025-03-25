import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gray-200 text-center m-8 p-4">

      <main className="flex md:flex-row items-center gap-20 flex-col-reverse">

        <div className="flex flex-col gap-7 justify-center text-left items-center">
          <h1 className="md:text-4xl font-bold text-md">
            Welcome to <span className="font-extrabold md:text-7xl text-xl text-orange-500">Biz-Metrics</span>
          </h1>
          <p className="md:text-lg text-gray-600 text-center text-sm">
            Biz-Metrics is your go-to platform for business analytics, providing real-time insights
            into user engagement, sales performance, and operational efficiency. Empower your business
            with data-driven decisions and seamless reporting tools.
          </p>

          
          <button className=" md:p-2 py-6 px-10 w-[10rem] gap-1 flex items-center justify-center font-extrabold rounded-md bg-black hover:scale-110 active:scale-105 shadow-black  text-white hover:bg-orange-500 transition-all shadow-md"
            style={{padding:10}}>
                <Link href="/login"> Get Started</Link>
               
              </button>
        </div>

        <Image 
          src="/bg.png" 
          alt="Biz-Metrics Logo" 
          width={900} 
          height={800} 
          className="w-[70rem] mx-6"
        />
      </main>

    </section>
  );
}