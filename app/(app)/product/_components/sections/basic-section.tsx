import { useFormContext, Controller } from "react-hook-form";
import { mainCategory, subCategory } from "@/constants";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

const BasicSection = () => {
  const { control } = useFormContext();
  return (
    <div className="w-full p-2 rounded-md shadow-sm">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Basic Information</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              label="Product name"
              type="text"
              size="sm"
              placeholder="Enter product name"
              {...field}
            />
          )}
        />

        <div className="flex gap-2 w-full">
          <Controller
            name="mainCategory"
            control={control}
            render={({ field }) => (
              <Select
                isRequired
                className="max-w-xs"
                label="Main category"
                size="sm"
                placeholder="Select main category"
                selectedKeys={field.value ? [field.value] : []}
                onChange={field.onChange}
              >
                {mainCategory.map((item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="subCategory"
            control={control}
            render={({ field }) => (
              <Select
                isRequired
                className="max-w-xs"
                label="Sub category"
                size="sm"
                placeholder="Select sub category"
                selectedKeys={field.value ? [field.value] : []}
                onChange={field.onChange}
              >
                {subCategory.map((item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              label="Unit"
              size="sm"
              type="text"
              placeholder="Enter product unit"
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              label="Description"
              type="text"
              size="sm"
              placeholder="Enter product description"
              className="w-full"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default BasicSection;
