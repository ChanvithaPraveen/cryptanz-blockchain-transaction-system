import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-center items-start white-glassmorphism p-5 mt-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex px-10 w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-column flex-col items-center justify-between md:p-20 py-12">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="mx-10 text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Our Platform Services 
          <br />
          for Loyal Users 
        </h1>
        <p className="mx-10 text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          The best choice for buying and selling your crypto assets, <br/> with the
          various super friendly services we offer
        </p>
      </div>

      <div className="mt-10 flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#3d4f7c]"
          title="Security gurantee"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Best exchange rates"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="The Lowest gas fees rates than other platforms  &  gurantee for each and every transaction."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Minimum transaction time cost is doing yoir transactions more faster than other platforms."
        />
      </div>
    </div>
  </div>
);

export default Services;