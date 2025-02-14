import styled from "styled-components";

export default function LastPage() {
  return (
    <>
      <Box>
        <h1>Thanks for Signing Up!</h1>
        <P>We have a great journey ahead</P>
      </Box>
    </>
  );
}

const Box = styled.div`
  width: 600px;
  text-align: center;
  color: white;
  font-size: 35px;
  font-weight: 800;
  padding: 20px;
`;

const P = styled.p`
  margin-top: 20px;
  font-size: 30px;
  font-weight: 500;
`;
