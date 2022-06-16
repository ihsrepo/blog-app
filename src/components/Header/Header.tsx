import React from "react";
import { Container } from "components/Container";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="py-6">
      <Container>
        <ul className="flex space-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post/1">Post</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};
