"use client";
import { formatCurrency } from "@/utils/common.util";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { useFormContext, Controller } from "react-hook-form";

const PricingSection = () => {
  const { control } = useFormContext();
  return (
    <div className="shadow-sm rounded-md w-full p-2">
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-3">Pricing</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              label="Sell price"
              type="text"
              placeholder="Enter product sell price"
              className="w-full"
              size="sm"
              {...field}
              value={formatCurrency(field.value)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                field.onChange(isNaN(Number(value)) ? 0 : Number(value));
              }}
            />
          )}
        />
        <Controller
          name="importPrice"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              label="Import price"
              type="text"
              placeholder="Enter product import price"
              className="w-full"
              size="sm"
              {...field}
              value={formatCurrency(field.value)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                field.onChange(isNaN(Number(value)) ? 0 : Number(value));
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PricingSection;
