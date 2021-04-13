import styled from "@emotion/styled";
import { Field } from "formik";

interface ContainerProps {
  fullHeight?: boolean;
  fullWidth?: boolean;
}

export const Row = styled.div<ContainerProps>`
  display: flex;
  ${({ fullHeight }) => fullHeight && "height: 100%"};
  ${({ fullWidth }) => fullWidth && "width: 100%"};
`;

export const Column = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  ${({ fullHeight }) => fullHeight && "height: 100%"};
  ${({ fullWidth }) => fullWidth && "width: 100%"};
`;

export const CellWrapper = styled(Column)`
  padding: 0 10px;
  width: 250px;
`;

export const SmallCellWrapper = styled(CellWrapper)`
  padding: 0 10px;
  width: 50px;
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

export const KudosRow = styled(Row)`
  font-size: 12px;
  align-items: center;
  padding: 10px 0;
`;

export const KudosAuthor = styled(CellWrapper)`
  font-size: 12px;
  color: gray;
`;

export const KudosCard = styled(Column)`
  background-color: gray;
  color: white;
  padding: 5px 20px;
  border-radius: 10px;
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

export const FormSection = styled(Column)`
  align-self: flex-end;
  margin-top: 50px;
  border-radius: 5px;
  border: 1px solid #ededed;
`;

export const StyledField = styled(Field)`
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ededed;
  padding: 5px;
  &:hover,
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: lightgray;
  }
`;

export const Heading = styled(Column)`
  font-size: 18px;
  color: gray;
  text-align: center;
`;

export const PageHeading = styled(Heading)`
  margin: 20px 0;
`;

export const AdminPageWrapper = styled(Column)`
  max-width: 1280px;
  margin: 0 auto;
`;
