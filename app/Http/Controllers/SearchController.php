<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    function search(Request $request)
    {
        $request->validate([
            'q' => 'required'
        ]);

        $tasks = Task::where('name', 'like', '%' . $request->q . '%')->get();
        return $tasks;
    }
}
