<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TodoItem;

class TodoItemController extends Controller
{
    /**
     * Returns all the todo items in the database ordered by creation date.
     */
    public function index()
    {
        return TodoItem::orderBy('created_at', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newTodoItem = new TodoItem();  
        $newTodoItem->name = $request->todoItem['name'];
        $newTodoItem->save();

        return $newTodoItem;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $existingTodoItem = TodoItem::find($id);

        if ($existingTodoItem) {
            $existingTodoItem->is_done = $request->todoItem['is_done'] ? true : false;
            $existingTodoItem->done_at = $request->todoItem['is_done'] ? date("Y-m-d H:i:s") : null;
            $existingTodoItem->save();
            return $existingTodoItem;
        }

        return "Todo Item not found.";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $existingTodoItem = TodoItem::find($id);

        if ($existingTodoItem) {
            $existingTodoItem->delete();
            return "Todo Item successfully deleted.";
        }

        return "Todo Item not found.";
    }
}
