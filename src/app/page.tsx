"use client";
import { fetcAnime } from "@/action";
import React, { useEffect, useState } from "react";
import { AnimeProp } from "../../type";
import LoadMore from "@/Loadmore";
import { motion } from "framer-motion";
interface Prop {
  anime: AnimeProp;
  index: number;
}
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const Home = ({ anime }: Prop) => {
  const [animeData, setAnimeData] = useState<AnimeProp[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetcAnime(1);
        setAnimeData(result);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header className=" h-32 w-full border-b border-b-gray-500 flex items-center justify-between ">
        <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
          <div>
            <h1>LOGO</h1>
          </div>
          <ul className="flex items-center gap-2">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Project</li>
          </ul>
        </div>
      </header>
      <div className="flex justify-center items-center max-w-screen-lg mx-auto border-b-white border-b">
        <div className="flex-1 font-semibold  h-screen justify-center flex flex-col">
          <h1 className="text-6xl font-serif">Lorem, ipsum.</h1>
          <span className="text-red-500 text-4xl">
            Lorem ipsum dolor sit amet.
          </span>
          <span className="text-3xl">Lorem, ipsum dolor.</span>
        </div>
        <div className="flex-1">
          <img
            className="rounded-full"
            src="https://img.freepik.com/free-vector/japanese-samurai-warrior-vector-illustration_43623-953.jpg?w=740&t=st=1700945341~exp=1700945941~hmac=b1ad20e79b7d7b7ac3114851b95bf4e4ac2d4b89573aaf52e965fada7a6ef21c"
            alt=""
          />
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto mt-10">
        <div className="grid-cols-4 grid gap-4">
          {animeData.map((item: AnimeProp, index: number) => (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }}
              viewport={{ amount: 0 }}
              key={item.id}
            >
              <div>
                <img
                  className="h-[300px] w-full"
                  src={`https://shikimori.one${item.image.original}`}
                  alt={item.name}
                />
              </div>
              <div className="flex items-center justify-between p-2">
                <span>{item.name}</span>
                <span>{item.kind}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <LoadMore />
      </div>
    </>
  );
};

export default Home;
