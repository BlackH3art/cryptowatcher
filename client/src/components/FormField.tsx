import type { ChangeEventHandler, FC } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: ChangeEventHandler;
};

export const FormField: FC<FormFieldProps> = ({ name, label, type, placeholder, value, onChange }) => {
  return (
    <Label className='text-white flex flex-col '>
      {label}
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={0}
        step='any'
      />
    </Label>
  );
};
