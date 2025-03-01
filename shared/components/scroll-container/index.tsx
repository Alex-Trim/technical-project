import React from "react";
import styled from "@emotion/styled";

// Стилизованный контейнер с кастомным скроллом
const ScrollContainer = styled.div`
  overflow-y: auto;
  max-height: 300px;
  pointer-events: auto; /* Убедитесь, что взаимодействие не заблокировано */

  /* Стили для WebKit (Chrome, Safari, Opera) */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Стили для Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

// Интерфейс для пропсов компонента
interface CustomScrollContainerProps {
  children: React.ReactNode;
  maxHeight?: string | number;
}

// Компонент с кастомным скроллом
export const CustomScrollContainer: React.FC<CustomScrollContainerProps> = ({
  children,
  maxHeight = "300px",
}) => {
  return (
    <ScrollContainer style={{ maxHeight }} tabIndex={0}>
      {children}
    </ScrollContainer>
  );
};
