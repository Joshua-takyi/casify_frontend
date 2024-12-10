import Image from "next/image";

export const PriceInfoCard = ({ title, iconSrc, value, borderColor }) => {
  return (
    <div className={`price-info_card border-l-[${borderColor}]`}>
      <p className="text-base text-black-100 ">{title}</p>
      <div className="flex gap-1">
        <Image src={iconSrc} alt={title} width={20} height={20} />
        <p className="text-base text-secondary font-semibold">{value}</p>
      </div>
    </div>
  );
};
