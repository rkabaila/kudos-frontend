import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Column } from "./styled";

interface Props {
  loading: boolean;
  size?: number;
  children?: React.ReactNode;
}

export const spinnerKeyframes = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border-top: 3px solid #ededed;
  border-right: 3px solid #ededed;
  border-bottom: 3px solid #ededed;
  border-left: 3px solid gray;
  animation: ${spinnerKeyframes} 1.1s infinite linear;
`;

const Wrapper = styled(Column)`
  align-items: center;
`;

export const Loading = ({ loading, children }: Props) => (
  <>
    {loading ? (
      <Wrapper>
        <Spinner />
      </Wrapper>
    ) : (
      children
    )}
  </>
);
