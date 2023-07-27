import React from "react";
import { Link } from "react-router-dom";

function Store() {
  return (
    <div>
      Store <Link to="/login">login</Link>
    </div>
  );
}

export default Store;
