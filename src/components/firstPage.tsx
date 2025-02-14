import { useState } from "react";
import styled from "styled-components";
import erimg from "/images/icon-error.svg";

export default function FirstPage({
  setSigned,
}: {
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const arr = [
    {
      placeholder: "First Name",
      inputName: "Firstname",
      message: "First Name cannot be empty",
    },

    {
      placeholder: "Last Name",
      inputName: "LastName",
      message: "Last Name cannot be empty",
    },

    {
      placeholder: "Email Address",
      inputName: "Email",
      message: "Looks like this is not an email",
    },

    {
      placeholder: "Password",
      inputName: "Password",
      message: "Password cannot be empty",
    },
  ];

  interface FormValues {
    Firstname: string;
    LastName: string;
    Email: string;
    Password: string;
  }

  interface FormErrors {
    Firstname: boolean;
    LastName: boolean;
    Email: boolean;
    Password: boolean;
  }

  const [values, setValues] = useState<FormValues>({
    Firstname: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    Firstname: false,
    LastName: false,
    Email: false,
    Password: false,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  console.log(values);

  async function handleSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValues = {
      Firstname: values.Firstname.trim(),
      LastName: values.LastName.trim(),
      Email: values.Email.trim(),
      Password: values.Password.trim(),
    };

    setValues(trimmedValues);

    setErrors({
      Firstname: !trimmedValues.Firstname,
      LastName: !trimmedValues.LastName,
      Email: !EmailRegex.test(trimmedValues.Email),
      Password: !trimmedValues.Password,
    });

    if (
      trimmedValues.Firstname &&
      trimmedValues.LastName &&
      EmailRegex.test(trimmedValues.Email) &&
      trimmedValues.Password
    ) {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trimmedValues),
        });
        const data = await response.json();
        console.log(data);
        setSigned(true);
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <Wrapper>
      {" "}
      <LeftSection>
        {" "}
        <Container>
          <h1>Learn to code by watching others</h1>
          <p>
            See how experienced developers solve problems in real-time. Watching
            scripted tutorials is great, but understanding how developers think
            is invaluable.
          </p>
        </Container>
      </LeftSection>
      <RightSection>
        <PurpleBox>
          <div>
            <p>
              Try it free 7 days <span>then $20/mo. thereafter</span>
            </p>
          </div>
        </PurpleBox>
        <InputDivs>
          <div>
            <Form noValidate onSubmit={handleSubmission}>
              <div>
                {arr.map((value) => (
                  <div key={value.inputName} style={{ position: "relative" }}>
                    <div style={{ position: "relative" }}>
                      {" "}
                      <Input
                        placeholder={value.placeholder}
                        type="text"
                        name={value.inputName}
                        value={values[value.inputName]}
                        onChange={(event) => handleChange(event)}
                        error={errors[value.inputName]}
                      />
                      <ErrorIcon
                        src={erimg}
                        error={errors[value.inputName]}
                        alt="error icon"
                      />
                    </div>
                    {errors[value.inputName] ? (
                      <ErrorMessage>{value.message}</ErrorMessage>
                    ) : null}
                  </div>
                ))}
              </div>
              <Button type="submit">CLAIM YOUR FREE TRIAL</Button>
            </Form>

            <P>
              By clicking the button, you are agreeing to our{" "}
              <span>Terms and Services</span>
            </P>
          </div>
        </InputDivs>
      </RightSection>
    </Wrapper>
  );
}

const Container = styled.div`
  width: 327px;
  color: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    line-height: 36px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  p {
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    line-height: 26px;
  }

  @media (min-width: 1440px) {
    width: 525px;

    h1 {
      font-size: 50px;
      line-height: 55px;
      margin-bottom: 11px;
      text-align: left;
    }

    p {
      text-align: left;
    }
  }
`;

const PurpleBox = styled.div`
  background: #5e54a4;
  box-shadow: 0px 8px 0px 0px #00000025;
  border-radius: 10px;
  width: 327px;
  margin-top: 64px;
  padding: 18px 66px 18px;

  p {
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.27px;
  }

  span {
    font-weight: 400;
  }

  @media (min-width: 1440px) {
    width: 540px;
    padding: 17px 112px 17px;

    p {
      font-weight: 500;
      font-size: 15px;
      line-height: 26px;
    }
  }
`;

const InputDivs = styled.div`
  margin-top: 24px;
  padding: 24px 24px 24px;
  background: #ffffff;
  box-shadow: 0px 8px 0px 0px #00000025;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  width: 327px;

  @media (min-width: 1440px) {
    padding: repeat(4, 40px);
    width: 540px;
  }
`;

const Input = styled.input<{ error: boolean }>`
  border: 2px solid ${({ error }) => (error ? "#FF7979" : "#dedede")};
  width: 279px;
  border-radius: 5px;
  height: 56px;
  background: #ffffff;
  padding: 15px 16px 15px 19px;
  position: relative;
  color: ${({ error }) => (error ? "#FF7979" : "inherit")};

  ::placeholder {
    color: #3d3b48;
    opacity: 75%;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.25px;
    line-height: 26px;
  }

  @media (min-width: 1440px) {
    width: 460px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (min-width: 1440px) {
    div {
      gap: 20px;
    }
  }
`;

const ErrorIcon = styled.img<{ error: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: ${({ error }) => (error ? "block" : "none")};
`;

const Button = styled.button`
  width: 279px;
  border-radius: 5px;
  background: #38cc8b;
  box-shadow: 0px -4px 0px 0px #00000017 inset;
  font-weight: 600;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 1px;
  text-align: center;
  color: white;
  border: none;
  margin-bottom: 8px;
  height: 56px;
  margin-top: 16px;

  &:hover {
    background: #77e2b3;
    box-shadow: 0px -4px 0px 0px #00000017 inset;
    cursor: pointer;
  }

  @media (min-width: 1440px) {
    width: 460px;
    margin-bottom: 8px;
    margin-top: 20px;
  }
`;

const P = styled.p`
  font-weight: 700;
  font-size: 11px;
  line-height: 21px;
  text-align: center;
  color: #bab7d4;
  text-align: center;

  span {
    color: red;
  }

  @media (min-width: 1440px) {
    font-weight: 500;
    line-height: 26px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff7979;
  margin-top: 6px;
  font-weight: 500;
  font-style: italic;
  font-size: 11px;
  line-height: 16.5px;
  text-align: right;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1440px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1440px) {
    align-items: flex-start;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 1440px) {
    align-items: flex-end;
  }
`;
