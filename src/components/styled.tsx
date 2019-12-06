import styled from "@emotion/styled";

export const StyledRow = styled.div`
  display: flex;
`;

export const DataWrapper = styled.div`
  padding: 0 10px;
  width: 200px;
`;

export const Button = styled.button`
  width: 120px;
  height: 30px;
  color: white;
  margin: 10px 0;
  cursor: pointer;
`;

export const AddButton = styled(Button)`
  background-color: green;
`;

export const DeleteButton = styled(Button)`
  background-color: red;
`;
