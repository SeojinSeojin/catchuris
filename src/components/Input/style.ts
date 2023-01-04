import styled from 'styled-components';

export const InputForm = styled.form`
  width: 316px;
  height: 44px;
  display: flex;
  gap: 8px;
`;

export const InputText = styled.input`
  background-color: #2f2f2f;
  color: white;
  border-radius: 13px;
  outline: none;
  border: 1px solid transparent;
  padding: 15px 16px;
  flex: 1;
  &::placeholder {
    color: #a5a5a5;
  }
  &:focus {
    border: 1px solid #ff4882;
  }
`;

export const InputSubmit = styled.input`
  background-color: #ff4882;
  width: 60px;
  border-radius: 19px;
  color: white;
  outline: none;
  border: 1px solid transparent;

  &:hover {
    color: rgba(252, 252, 252, 0.35);
  }
`;
