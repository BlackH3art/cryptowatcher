import type { FC } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SelectOption } from '@/types/SelectOptions';

interface FormSelectProps {
  label: string;
  options: SelectOption[];
  onChange: (val: string) => void;
};

export const FormSelect: FC<FormSelectProps> = ({ label, options, onChange }) => {
  return (
    <Label className='text-white flex flex-col'>
      {label}
      <Select defaultValue={options[0].unit} onValueChange={onChange}>
        <SelectTrigger className='w-full [&_svg]:text-white'>
          <SelectValue  />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem 
              key={option.unit} 
              value={String(option.value)}>
                {option.unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
};
