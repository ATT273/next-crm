"use client";
import { TextInput, Card } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";

const PricingSection = () => {
  const { control } = useFormContext();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      classNames={{
        root: "w-full p-2",
      }}
    >
      <h3 className="text-lg font-semibold mb-3">Pricing</h3>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Sell price"
            type="text"
            placeholder="Enter product sell price"
            classNames={{ root: "w-full" }}
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          />
        )}
      />
      <Controller
        name="impPrice"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Import price"
            type="text"
            placeholder="Enter product import price"
            classNames={{ root: "w-full" }}
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          />
        )}
      />
    </Card>
  );
};

export default PricingSection;
