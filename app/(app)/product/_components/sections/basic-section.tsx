import { TextInput, Select, Card } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";
import { mainCategory, subCategory } from "@/constants";

const BasicSection = () => {
  const { control } = useFormContext();
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      classNames={{
        root: "w-full p-2",
      }}
    >
      <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Product name"
            type="text"
            placeholder="Enter product name"
            classNames={{ root: "w-full" }}
            {...field}
            onChange={field.onChange}
          />
        )}
      />

      <div className="flex gap-2 w-full">
        <Controller
          name="mainCategory"
          control={control}
          render={({ field }) => (
            <Select
              withAsterisk
              label="Main category"
              data={mainCategory}
              placeholder="Select main category"
              classNames={{ root: "grow" }}
              {...field}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="subCategory"
          control={control}
          render={({ field }) => (
            <Select
              withAsterisk
              label="Sub category"
              placeholder="Select sub category"
              data={subCategory}
              classNames={{ root: "grow" }}
              {...field}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Controller
        name="unit"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Unit"
            type="text"
            placeholder="Enter product unit"
            classNames={{ root: "w-full" }}
            {...field}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Description"
            type="text"
            placeholder="Enter product description"
            classNames={{ root: "w-full" }}
            {...field}
            onChange={field.onChange}
          />
        )}
      />
    </Card>
  );
};

export default BasicSection;
