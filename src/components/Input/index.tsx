import React from 'react';
import { InputForm, InputLabel, InputSubmit, InputText } from './style';

const InputItem = (props: {
  editable: boolean;
  value: string;
  placeholder: string;
  label: string;
  setValue: (val: string) => void;
  onNext: (e: React.FormEvent) => void;
}) => {
  return (
    <>
      <InputForm onSubmit={props.onNext}>
        <InputText
          onChange={(e) => {
            props.setValue(e.target.value);
          }}
          value={props.value}
          placeholder={props.placeholder}
          disabled={!props.editable}
        />
        <InputSubmit type='submit' value='저장' disabled={!props.editable} />
      </InputForm>
      <InputLabel>{props.label}</InputLabel>
    </>
  );
};

export default InputItem;
