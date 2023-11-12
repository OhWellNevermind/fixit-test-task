import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 20px;
  background-color: aliceblue;
  padding: 50px 30px 30px 30px;
  border-radius: 10px;
  margin-top: 10px;
  position: relative;
`;

export const SelectMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
`;

export const SelectMenuItemText = styled.div`
  font-weight: normal;
`;

export const Divider = styled.div`
  display: flex;
  gap: 20px;
`;

export const CustomDiv = styled.div`
  display: flex;
  width: 100%;
`;
