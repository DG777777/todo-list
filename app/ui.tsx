"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-Actions";

import Todo from "component/todo";
import { useState } from "react";


export default function UI() {
   const [searchInput, setSearchInput] = useState("");

   const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos({searchInput}),
   })

   const createTodoMutation = useMutation({
    mutationFn: () => createTodo({
        title: "New Todo",
        completed: false,
    }),
    onSuccess: () => {
        todosQuery.refetch()
    }
   })

    return(
        <>
        <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
            <h1 className="text-xl ">TODO LIST</h1>
            <Input
            onChange={(e)=> setSearchInput(e.target.value)}
            value={searchInput} 
            label="Search TODO" 
            placeholder="SEARCH TODO" icon={<i className="fa-brands fa-searchengin" />} />
        
         {
            todosQuery.isPending && <p>Loading...</p>
         }
         {todosQuery.data && todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo}/>)}

         <Button 
         loading={createTodoMutation.isPending}
         onClick={() => createTodoMutation.mutate()}>
            <i className="fas fa-plus mr-2"/>
            ADD TODO
         </Button>
        </div>
        </>
    )
}