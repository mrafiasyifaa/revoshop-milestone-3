import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/text";

const priceArray = [
  { title: "Under $50", value: "0-50" },
  { title: "$50 - $100", value: "50-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $500", value: "200-500" },
  { title: "Over $500", value: "500-100000" },
];

interface Props {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-semibold mb-4">Price</Title>
      <RadioGroup className="mt-2 space-y-1" value={selectedPrice || ""} onValueChange={setSelectedPrice}>
        {priceArray.map((price) => (
          <div
            key={price.value}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price.value}
              id={price.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={price.value}
              className={`${selectedPrice === price.value ? "font-semibold text-revoshop-navy" : "font-normal"}`}
            >
              {price.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-revoshop-accent underline text-sm mt-4 font-medium hover:text-revoshop-accent-hover hoverEffect"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default PriceList;