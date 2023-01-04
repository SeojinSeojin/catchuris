import React from 'react';
import { InputForm, InputSubmit, InputText } from './style';

const InputItem = (props: {
  value: string;
  placeholder: string;
  setValue: (val: string) => void;
  onNext: (e: React.FormEvent) => void;
}) => {
  return (
    <InputForm onSubmit={props.onNext}>
      <InputText
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
        value={props.value}
        placeholder={props.placeholder}
      />
      <InputSubmit type='submit' value='저장' />
    </InputForm>
  );
};

export default InputItem;
