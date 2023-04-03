import React from "react";
import Jumbotron from "../components/Jumbotron";
import TakenSvg from '../assets/taken.svg'

const NoMatch = () => {
  return (
    <div>
      <Jumbotron>
        <img src={TakenSvg} alt='not found' className="mx-auto mb-5 max-w-[20rem]" />
        <h1>404 Page Not Found</h1>
      </Jumbotron>
    </div>
  );
};

export default NoMatch;
