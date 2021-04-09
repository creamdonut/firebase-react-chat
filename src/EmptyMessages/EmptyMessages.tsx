import styled from "styled-components";

const Empty = styled.div`
  color: #fff;
  font-size: 24px;
`;

const EmptyMessages = () => {
  return <Empty>There is no messages yet. Start chatting !</Empty>;
};

export { EmptyMessages };
