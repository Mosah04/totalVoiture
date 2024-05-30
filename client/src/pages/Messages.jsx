import React from "react";
import SuperInput from "../components/SuperInput";
import { IoIosSearch } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";
import avatar from "../assets/images/avatar3.png";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Messages = () => {
  return (
    <div className="w-full bg-white p-4">
      <div className="flex w-full gap-6">
        <div className="flex flex-col flex-shrink-0 w-[20%] min-w-[234px] border border-black">
          <div className="flex flex-col mb-2 justify-between">
            <h1 className="text-xl text-font-bold font-bold">Messages</h1>
          </div>

          <SuperInput
            htmlFor="search-messages"
            name="search-messages"
            type="text"
            children={<IoIosSearch />}
            placeholder="Rechercher..."
          />

          <div className="mt-6">
            <span className="text-xs flex gap-2 mb-2">
              <LuMessageSquare />
              Tous les messages
            </span>
            <div className="flex flex-col gap-3 max-h-full overflow-y-scroll">
              <div className="flex gap-4 items-center">
                <img
                  src={avatar}
                  alt="messageSender"
                  className="h-12 w-12 rounded-full"
                />
                <div className="w-full">
                  <span className="flex w-full items-center justify-between">
                    <span className="text-font-bold font-bold">
                      Gilbert ATTAN
                    </span>
                    <span className="text-xs text-font-normal">12:00</span>
                  </span>
                  <span className="text-xs">Salut par ici</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border">
          <div className="flex justify-between py-3 px-8 rounded-lg border items-center">
            <div className="flex gap-3">
              <div className="relative inline-block w-fit">
                <img
                  src={avatar}
                  alt="messageSender"
                  className="h-12 w-12 rounded-full"
                />
                <div className="absolute bottom-0 right-0 bg-green-400 h-3 w-3 rounded-full border border-white"></div>
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-font-bold font-bold">Gilbert ATTAN</span>
                <span className="text-xs ">En ligne</span>
              </div>
            </div>
            <div className="inline-flex items-center p-2 rounded-full w-8 h-8 bg-[#F5F6FA] font-bold cursor-pointer">
              <HiOutlineDotsVertical />
            
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Messages;
