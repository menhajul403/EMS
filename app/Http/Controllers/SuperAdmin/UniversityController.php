<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\University\StoreUniversityRequest;
use App\Http\Requests\University\UpdateUniversityRequest;
use App\Models\University;
use App\Services\University\UniversityService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UniversityController extends Controller
{
    public function __construct(
        private UniversityService $universityService
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', University::class);

        $universities = University::latest()->paginate(10);

        return Inertia::render('SuperAdmin/Universities/Index', [
            'universities' => $universities,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', University::class);

        return Inertia::render('SuperAdmin/Universities/Create');
    }

    public function store(StoreUniversityRequest $request): RedirectResponse
    {
        $this->authorize('create', University::class);

        $this->universityService->store($request->validated());

        return redirect()
            ->route('super-admin.universities.index')
            ->with('success', 'University created successfully.');
    }

    public function edit(University $university): Response
    {
        $this->authorize('update', $university);

        return Inertia::render('SuperAdmin/Universities/Edit', [
            'university' => $university,
        ]);
    }

    public function update(UpdateUniversityRequest $request, University $university): RedirectResponse
    {
        $this->authorize('update', $university);

        // Update logic will be added in UniversityService

        return redirect()
            ->route('super-admin.universities.index')
            ->with('success', 'University updated successfully.');
    }

    public function destroy(University $university): RedirectResponse
    {
        $this->authorize('delete', $university);

        $university->delete();

        return back()->with('success', 'University deleted successfully.');
    }
}