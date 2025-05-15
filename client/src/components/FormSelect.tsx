import type { FC } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormSelectProps {
  label: string;
  options: string[];
  onChange: (val: string) => void;
};

export const FormSelect: FC<FormSelectProps> = ({ label, options, onChange }) => {
  return (
    <Label className='text-white flex flex-col'>
      {label}
      <Select defaultValue={options[0]} onValueChange={onChange}>
        <SelectTrigger className='w-full [&_svg]:text-white'>
          <SelectValue  />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
};
