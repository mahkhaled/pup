import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

const StyledIndex = styled.div`
  padding: 20px;
  background: var(--cb-blue);
  text-align: center;
  border-radius: 3px;
  color: #fff;

  img {
    width: 100px;
    height: auto;
  }

  h1 {
    font-size: 28px;
  }

  p {
    font-size: 18px;
    color: ${lighten(0.25, '#4285F4')};
  }

  > div {
    display: inline-block;
    margin: 10px 0 0;

    .btn:first-child {
      margin-right: 10px;
    }

    .btn {
      border: none;
    }
  }

  footer {
    margin: 20px -20px -20px;
    border-top: 1px solid ${darken(0.1, '#4285F4')};
    padding: 20px;

    p {
      font-size: 14px;
      line-height: 22px;
      color: ${lighten(0.35, '#4285F4')};
      margin: 0;
    }

    p a {
      color: ${lighten(0.35, '#4285F4')};
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 30px;

    footer {
      margin: 30px -30px -30px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    footer {
      margin: 40px -40px -40px;
    }
  }
`;

const Index = () => (
  <StyledIndex>
    <img
      src="/badr_logo.png"
      alt="Clever Beagle"
    />
    <h1>Snack Time !</h1>
    <p>Enta Mesh Enta wenta Gaw3an !</p>
    <div>
      <Button href="https://github.com/mostafaelganainy/pup">Read the Docs</Button>
      <Button href="https://github.com/mostafaelganainy/pup"><i className="fa fa-star" /> Star on GitHub</Button>
    </div>
    <footer>
      <p>Want to build the future with us ? <a href="https://badrit.workable.com">Apply today for jobs@BADR</a>.</p>
    </footer>
  </StyledIndex>
);

export default Index;
