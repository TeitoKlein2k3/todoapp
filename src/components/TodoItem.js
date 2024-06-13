import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import { handleLogic } from "../assets/js/script";

export default function TodoItem(props) {
    const [listTodo, setListTodo] = useState({
        showEditButton: true,
        isCompleted: props.isCompleted,
        prevIsCompleted: props.isCompleted,
        contentInput: props.value,
        prevContentInput: props.value,
    });

    const changeUIEdit = () => {
        setListTodo((prevState) => ({
            ...prevState,
            showEditButton: !prevState.showEditButton,
            contentInput: prevState.prevContentInput,
            isCompleted: prevState.prevIsCompleted,
        }));
    };

    const handleEdit = async () => {
        const id = props.id;
        if (!listTodo.contentInput) {
            handleDelete();
        } else {
            const result = await handleLogic.updateTodo(id, {
                todo: listTodo.contentInput,
                isCompleted: listTodo.isCompleted,
            });
            if (result.status_code === "SUCCESS") {
                setListTodo((prevState) => ({
                    ...prevState,
                    prevContentInput: listTodo.contentInput,
                    prevIsCompleted: listTodo.isCompleted,
                }));
                toast.success("Sửa thành công!");
            } else if (result.status_code === "FAILED") {
                toast.error("Sửa thất bại, vui lòng tải lại trang");
            }
        }
    };

    const handleDelete = async () => {
        const id = props.id;
        const result = await handleLogic.deleteTodo(id);
        if (result.status_code === "SUCCESS") {
            props.onEdit();
            toast.success("Xóa thành công!");
        } else if (result.status_code === "FAILED") {
            toast.error("Xóa thất bại, vui lòng tải lại trang");
        }
    };

    return (
        <div className="todo-item w-[700px] px-9 py-7 bg-white rounded-lg">
            <input
                type="text"
                className={`border-slate-400 rounded-md w-full h-12 border outline-none px-4 mb-4 bg-white ${
                    listTodo.isCompleted ? "line-through" : ""
                }`}
                disabled={!listTodo.showEditButton ? false : true}
                value={listTodo.contentInput}
                onChange={(e) => {
                    setListTodo((prevState) => ({
                        ...prevState,
                        contentInput: e.target.value,
                    }));
                }}
            />
            <div className="flex items-center">
                {listTodo.showEditButton && (
                    <Button
                        children="Sửa"
                        color="emerald"
                        tailwindCss="mr-2"
                        onClick={changeUIEdit}
                    />
                )}
                {!listTodo.showEditButton && (
                    <>
                        <Button
                            children="Thoát"
                            color="amber"
                            onClick={changeUIEdit}
                            tailwindCss="mr-2"
                        />
                        <Button
                            children="Cập nhật"
                            color="emerald"
                            tailwindCss="mr-2"
                            onClick={() => {
                                handleEdit();
                                setListTodo({
                                    ...listTodo,
                                    showEditButton: !listTodo.showEditButton,
                                    prevContentInput: listTodo.contentInput,
                                });
                            }}
                        />
                    </>
                )}

                <Button children="Xóa" color="red" onClick={handleDelete} />
                {!listTodo.showEditButton && (
                    <div className="ml-auto flex items-center gap-2">
                        <input
                            type="checkbox"
                            name={`isCompleted-${props.index}`}
                            id={`isCompleted-${props.index}`}
                            className="ml-auto w-5 h-5 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600outline-none"
                            onChange={(e) => {
                                setListTodo((prevState) => ({
                                    ...prevState,
                                    isCompleted: e.target.checked,
                                }));
                            }}
                            checked={listTodo.isCompleted ? true : false}
                        />
                        <label htmlFor={`isCompleted-${props.index}`}>
                            Completed
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}
