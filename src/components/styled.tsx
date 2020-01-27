import styled from "@emotion/styled";
import { Field } from "formik";

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
  color: gray;
`;

export const RowWrapper = styled(Row)`
  font-size: 12px;
  padding: 5px;
  color: gray;
  &:nth-of-type(even) {
    background-color: #ededed;
  }
`;

export const Button = styled.button`
  width: 120px;
  height: 30px;
  color: white;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 5px;
  &:hover,
  &:focus {
    outline: none;
  }
`;

export const AddButton = styled(Button)`
  background-color: green;
`;

export const DeleteButton = styled(Button)`
  background-color: red;
`;

export const FormWrapper = styled(Column)`
  margin: 20px;
`;

export const FormSection = styled(Row)`
  margin: 50px auto;
  border-radius: 5px;
  border: 1px solid #ededed;
`;

export const StyledField = styled(Field)`
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ededed;
  height: 20px;
  padding: 5px;
  &:hover,
  &:focus {
    outline: none;
  }
`;

export const Heading = styled(Column)`
  font-size: 18px;
  color: gray;
`;

export const PageHeading = styled(Heading)`
  margin: 20px 0;
`;
