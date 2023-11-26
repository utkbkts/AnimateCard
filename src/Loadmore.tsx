"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetcAnime } from "./action";
import { AnimeProp } from "../type";
let page = 2
function LoadMore() {
    const {ref,inView}=useInView()
    const [data,setData]=useState<AnimeProp[]>([])
    useEffect(()=>{
        if(inView){
            fetcAnime(page).then((res)=>{
                setData([...data, ...res])
                page++
            })
        }
    },[inView,data])
  return (
    <>
      <div className="max-w-screen-lg mx-auto mt-10">
        <div className="grid-cols-4 grid gap-4">
          {data.map((item: AnimeProp, index:number) => (
            <div key={item.id}>
              <div>
                <img  className="h-[300px] w-full" src={`https://shikimori.one${item.image.original}`} alt={item.name} />
              </div>
              <div className="flex items-center justify-between p-2">
                <span>{item.name}</span>
                <span>{item.kind}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;