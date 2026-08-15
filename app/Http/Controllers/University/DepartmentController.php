<?php

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\University;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(): Response
    {
        $this->authorize('department.view');

        return Inertia::render('University/Departments/Index', [
            'departments' => Department::with('university')->orderBy('name')->paginate(15),
            'universities' => University::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('department.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:20'],
            'university_id' => ['required', 'exists:universities,id'],
        ]);

        Department::create([
            'name' => $validated['name'],
            'code' => $validated['code'],
            'slug' => Str::slug($validated['code']),
            'university_id' => $validated['university_id'],
        ]);

        return back()->with('success', 'Department created.');
    }

    public function update(Request $request, Department $department): RedirectResponse
    {
        $this->authorize('department.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:20'],
            'university_id' => ['required', 'exists:universities,id'],
        ]);

        $department->update($validated);

        return back()->with('success', 'Department updated.');
    }

    public function destroy(Department $department): RedirectResponse
    {
        $this->authorize('department.delete');

        $department->delete();

        return back()->with('success', 'Department deleted.');
    }
}
