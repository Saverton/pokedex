import styled from "styled-components";

export default styled.form`
  display: flex;
  margin: 5px;

  .search {
    justify-content: space-between;
    margin: 10px;
  }

  .search text {
    flex-grow: 2;
    width: 500px;
  }

  input {
    width: 600px;
  }

  label {
    font-size: 20px;
  }
`