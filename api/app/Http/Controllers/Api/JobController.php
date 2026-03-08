<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Job::with('user')->paginate(15)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'salary' => 'required|string',
            'job_type' => 'required|string|in:full-time,part-time,contract',
            'requirements' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        $validated['user_id'] = auth()->id();
        
        $job = Job::create($validated);
        return response()->json($job, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(
            Job::with('user')->findOrFail($id)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $job = Job::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'location' => 'string|max:255',
            'company' => 'string|max:255',
            'salary' => 'string',
            'job_type' => 'string|in:full-time,part-time,contract',
            'requirements' => 'nullable|string',
            'status' => 'string|in:active,closed,draft',
            'deadline' => 'nullable|date',
        ]);

        $job->update($validated);
        return response()->json($job);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->json(null, 204);
    }
}
