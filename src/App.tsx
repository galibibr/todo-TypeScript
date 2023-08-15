import { useRef, useState } from "react";
import "./App.css";
import { TbHttpDelete } from "react-icons/tb";
import { LuFileEdit } from "react-icons/lu";
import { MdClose } from "react-icons/md";


interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  // get
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "One",
      completed: false,
    },
    {
      id: 2,
      title: "Two",
      completed: true,
    },
  ]);

  const [text, setText] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [textEdit, setTextEdit] = useState<string>("");
  const [idx, setIdx] = useState<number>(0)

  const windowOnclick = useRef()

  return (
    <>
      {/* form add */}
      <form
        onSubmit={() => {
          if (text.trim().length != 0) {
            {
            setTodos([
              ...todos,
              {
                id: Date.now(),
                title: text,
                completed: false,
              },
            ]);
          }
          setText("");
          }
        }}
        action="#"
        className="p-4 bg-gray-100 flex gap-3"
      >
        <input
          className="p-1 rounded-[5px_0_5px_0] shadow-sm"
          placeholder="Title:"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <button type="submit" className="font-[700] text-[20px]">Add</button>
      </form>
      {/* Todos */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {todos.map((e) => {
          return (
            <div
              key={e.id}
              className="border rounded-[10px_0_10px_0] bg-gray-100 shadow-md"
            >
              {/* name */}
              {e.completed ? (
                <p className="text-green-600 line-through font-[700] text-[28px] text-center">
                  {e.title}
                </p>
              ) : (
                <p className="font-[700] text-[28px] text-center">{e.title}</p>
              )}
              {/* btns */}
              <div className="flex justify-between px-3 pb-3 pt-2 bg-black/40 text-white rounded-[0_0_10px_0]">
                {/* delete */}
                <button
                  onClick={() => {
                    const newTodo = todos.filter((el) => {
                      return el.id != e.id;
                    });
                    setTodos(newTodo);
                  }}
                  className="text-[24px]"
                >
                  <TbHttpDelete></TbHttpDelete>
                </button>
                {/* edit */}
                <button
                  onClick={() => {
                    setModal(true);
                    setTextEdit(e.title);
                    setIdx(e.id);
                  }}
                >
                  <LuFileEdit></LuFileEdit>
                </button>
                {/* completed */}
                <input
                  type="checkbox"
                  checked={e.completed}
                  onClick={() => {
                    const newTodo = todos.map((el) => {
                      if (el.id == e.id) el.completed = !el.completed;
                      return el;
                    });
                    setTodos(newTodo);
                  }}
                />
              </div>
            </div>
          );
        })}
        {/* modal edit */}
        {modal ? (
          <div ref={windowOnclick} onClick={(event) => {
            if (event.target == windowOnclick.current) setModal(false)
          }} className="absolute flex items-center justify-center top-0 bg-black/60 w-full h-screen left-0">
            <form
              onSubmit={() => {
                if (textEdit.trim().length != 0) {
                  const newTodo = todos.map(el => {
                  if (el.id == idx) {
                    el.title = textEdit;
                  }
                  return el
                })
                setModal(false);
                setTodos(newTodo);
                }
              }}
              action="#"
              className="bg-black/60 shadow-dm shadow-[white] text-white flex flex-col px-5 pb-8 rounded-[20px_0_20px_0]"
            >
              <div className="flex justify-end mt-2 text-white text-[25px]">
                <MdClose onClick={() => setModal(false)} className='cursor-pointer'></MdClose>
              </div>
              <input
                value={textEdit}
                required
                type="text"
                className="border text-black mt-6 rounded-[5px_0_5px_0]"
                onChange={(event) => setTextEdit(event.target.value)}
              />
              <button className="font-[700] text-[20px] mt-3">Edit</button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
