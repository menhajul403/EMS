<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventBrowseController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Event::query()
            ->with(['category', 'venue', 'department'])
            ->where('status', 'published');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($builder) use ($search) {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%");
            });
        }

        if ($categoryId = $request->integer('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($departmentId = $request->integer('department_id')) {
            $query->where('department_id', $departmentId);
        }

        if ($date = $request->string('date')->trim()->toString()) {
            $query->whereDate('start_at', $date);
        }

        $events = $query->orderBy('start_at')->paginate(12)->withQueryString();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'categories' => EventCategory::orderBy('name')->get(['id', 'name', 'slug']),
            'departments' => Department::orderBy('name')->get(['id', 'name', 'code']),
            'filters' => $request->only(['search', 'category_id', 'department_id', 'date']),
        ]);
    }
}
