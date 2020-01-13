import styled from "@emotion/styled";

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CellWrapper = styled.div`
  padding: 0 10px;
  width: 200px;
`;

export const HeaderWrapper = styled(Row)`
  margin-bottom: 10px;
  font-weight: bold;
`;

export const RowWrapper = styled(Row)`
  padding: 5px;
  &:nth-child(even) {
    background-color: #ededed;
  }
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

export const FormWrapper = styled(Column)`
  margin: 40px;
`;
