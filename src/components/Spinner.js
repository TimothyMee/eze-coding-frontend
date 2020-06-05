import React from "react";

const Spinner = (props) => {
  return (
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
