import { useState } from "react";
import "./Container.scss";
type ItemType = {
  id: number;
  title: string;
};
type Board = {
  id: number;
  title: string;
  items: ItemType[];
};
const Container = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "column 1",
      items: [
        { id: 1, title: "1" },
        { id: 2, title: "2" },
        { id: 3, title: "3" },
        { id: 4, title: "4" },
        { id: 5, title: "5" },
        { id: 6, title: "6" },
        { id: 7, title: "7" },
      ],
    },
    {
      id: 2,
      title: "column 2",
      items: [
        { id: 8, title: "8" },
        { id: 9, title: "9" },
        { id: 10, title: "10" },
        { id: 11, title: "11" },
        { id: 12, title: "12" },
        { id: 13, title: "13" },
      ],
    },
    {
      id: 3,
      title: "column 3",
      items: [
        { id: 14, title: "14" },
        { id: 15, title: "15" },
        { id: 16, title: "16" },
        { id: 17, title: "17" },
        { id: 18, title: "18" },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState<null | Board>(null);
  const [currentItem, setCurrentItem] = useState<null | ItemType>(null);
  
  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: Board,
    item: ItemType
  ) => {
    setCurrentBoard(board);
    setCurrentItem(item);
    const target = e.target as HTMLElement;
    target.style.backgroundColor = "#d5f1f0";
  };
  
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.className === "item") {
      target.style.boxShadow = "4px 4px 10px lightblue";
    }
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    target.style.boxShadow = "none";
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    target.style.boxShadow = "none";
    target.style.backgroundColor = "#fff";
  };
  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: Board,
    item: ItemType
  ) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    target.style.boxShadow = "none";
    if (currentBoard && currentItem) {
      const currentIndex = currentBoard.items.indexOf(currentItem);
      const dropIndex = board.items.indexOf(item);
      if (currentBoard === board && currentIndex === dropIndex) {
        return;
      }
      currentBoard.items.splice(currentIndex, 1);
      board.items.splice(dropIndex + 1, 0, currentItem!);
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    }
  };
  const dropCardHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: Board
  ) => {
    const target = e.target as HTMLElement;
    if (currentBoard && currentItem && target.className !== "item") {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    }
  };
  return (
    <div className="container">
      <h1>Drag and Drop</h1>
      <div className="columns">
        {boards.map((board) => (
          <div
            className="columnContainer"
            key={board.id}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
          >
            <h2 className="boardTitle">{board.title}</h2>
            {board.items.map((item) => (
              <div className="itemContainer" id={`${item.id}`} key={item.id}>
                <div
                  className="item"
                  draggable
                  onDragStart={(e) => dragStartHandler(e, board, item)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, board, item)}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;
