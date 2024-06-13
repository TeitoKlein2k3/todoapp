import React from "react";
import TodoList from "./components/TodoList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
export default function App() {
    return (
        <>
            <Loading />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="todo-app bg-slate-800 flex flex-col gap-5 items-center py-10 min-h-screen select-none">
                <h2 className="text-white font-bold  text-2xl text-center py-10">
                    Welcome to Todo App!
                </h2>
                <TodoList />
            </div>
        </>
    );
}
